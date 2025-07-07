# md-k6.py
# Description: A script for running k6 scripts within Markdown files.
# Requires: Python 3.11+ (no external dependencies).
# Usage:
#   python3 md-k6.py <file>

import io
import os
import re
import json
import hashlib
import argparse
import subprocess
import tempfile
from typing import TextIO
from unittest import TestCase
from collections import namedtuple

Script = namedtuple("Script", ["text", "options", "env", "text_hash", "args"])

JS = "javascript"
SKIP = "skip"
SKIP_ALL = "skipall"
NO_FAIL = "nofail"
ENV = "env."
FIXED_SCENARIOS = "fixedscenarios"
NO_THRESHOLDS = "nothresholds"
ARG = "arg."


def has_browser_scenario(script: Script) -> bool:
    # HACK: Check for two keywords in the script to determine
    # if there's a scenario that requires a browser.
    return "browser" in script.text and "chromium" in script.text


def print_code(script: Script):
    """Print the script with line numbers for quick debugging."""
    lines = script.text.splitlines()
    for i, line in enumerate(lines):
        line = f"     {i + 1: >3}  {line}"
        print(line)


def run_k6(script: Script, duration: str | None, verbose: bool) -> None:
    script_file = tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".js")
    script_file.write(script.text)
    script_file.close()

    logs_file = tempfile.NamedTemporaryFile(delete=False, suffix=".json")
    logs_file.close()

    k6 = os.getenv("K6_PATH", "k6")
    cmd = [
        k6,
        "run",
        script_file.name,
        "--log-format=json",
        f"--log-output=file={logs_file.name}",
        "-w",  # Promote some warnings to errors.
        *script.args,
    ]
    if (
        duration
        and not has_browser_scenario(script)
        and FIXED_SCENARIOS not in script.options
    ):
        # If we add this option for tests requiring a browser, then
        # the scenario(s) defined in the script will be replaced with
        # one using the specified duration. This new scenario will not
        # have the browser type configured, which will cause the test
        # to break. Therefore, only set duration for tests that do not
        # use the browser.
        # Is is also possible to prevent scenario modification using the
        # `fixedscenarios` option.
        cmd.extend(["-d", duration])

    if NO_THRESHOLDS in script.options:
        cmd.append("--no-thresholds")

    env = {**os.environ, **script.env}

    print("\nExecuting:", " ".join(cmd))
    if script.env:
        print("Env:", script.env)

    try:
        result = subprocess.run(cmd, env=env)
    except KeyboardInterrupt:
        print("Execution cancelled by user.")
        result = subprocess.CompletedProcess(None, returncode=1)

    if result.returncode:
        print("k6 returned non-zero status:", result.returncode)
        try:
            with open(logs_file.name) as f:
                logs = f.read()

            print("Logs:")
            print(logs)
        except Exception:
            # Ignore exceptions if we fail to read the logs
            pass
        exit(1)

    with open(logs_file.name) as f:
        lines = f.readlines()

    # There's no way of running k6 OSS in a way that the process fails
    # immediately after the first exception (unless this specific handling
    # is added to the script explicitly). So here we just read the logs for
    # any errors and fail if at least one was found.
    for line in lines:
        line = line.strip()
        parsed = json.loads(line)
        if parsed["level"] == "error":
            print("Error in k6 script execution:", line)

            if NO_FAIL not in script.options:
                exit(1)
        elif verbose:
            print(line)


def extract_scripts(
    text: str, lang: str = JS, index_env: dict[str, str] | None = None
) -> list[Script]:
    index_env = index_env or {}

    # A somewhat complicated regex in order to make parsing of the code block
    # easier. Essentially, takes this:
    #
    # <!-- md-k6:opt1,opt2 -->
    # ```javascript
    # (JS code)
    # ```
    #
    # And converts it into:
    #
    # ```javascript$opt1,opt2
    # (JS code)
    # ```
    #
    # This is done for the entire Markdown file.
    # After that's done, we can split the text by "```javascript", and parse
    # each part separately. If a part's first line contains a "$", then we
    # know one or more options were specified by the user (such as "skip").
    #
    # Additionally, we also skip over any unrelated "<!-- ... -->" comments,
    # to allow developers to use both md-k6 *and* e.g. ESLint directives in
    # code blocks. Caveat: the md-k6 comment needs to be the first one, if
    # multiple comments are present before the code block.
    #
    # Some " *" and "\n+" are added in to skip any present whitespace.
    text = re.sub(
        r"<!-- *md-k6:([^ ]+) *-->\n+\s*(<!--.+-->\n+)?\s*```" + lang,
        "```" + lang + "$" + r"\1",
        text,
    )

    scripts = []
    blocks = [block.strip() for block in text.split("```")[1::2]]
    for b in blocks:
        lines = b.splitlines()
        if not lines[0].startswith(lang):
            continue

        if "$" in lines[0]:
            options = [opt.strip() for opt in lines[0].split("$")[-1].split(",")]
        else:
            options = []

        if SKIP in options:
            continue

        env = {}
        for opt in options:
            if not opt.startswith(ENV):
                continue
            if "=" not in opt:
                opt += "="
            key, value = opt.removeprefix(ENV).split("=")
            env[key] = value

        args = []
        for opt in options:
            if not opt.startswith(ARG):
                continue
            if opt == ARG:
                raise Exception("Empty argument specified! (arg.)")
            args.append(opt.removeprefix(ARG))

        script_text = "\n".join(lines[1:])
        for key, value in index_env.items():
            # Replace instances of '{{< param "FOO_BAR" >}}' with '1234', assuming
            # the env value of FOO_BAR=1234.
            script_text = re.sub(
                r"{{ *< *param *\"" + key + '" *> *}}', value, script_text
            )

        scripts.append(
            Script(
                text=script_text,
                options=options,
                env=env,
                text_hash=hashlib.sha256(script_text.encode("utf-8")).hexdigest()[:16],
                args=args,
            )
        )

    return scripts


def read_front_matter_env(f: TextIO) -> dict[str, str]:
    # Read a Front Matter .md file with environment variables.
    # The variables are actually in a YAML dictionary, but since
    # I want to avoid 3rd party library, I will just try to parse
    # them line-by-line.
    result = {}
    for line in f.readlines():
        if ":" not in line:
            continue

        parts = line.strip().split(":")
        key = parts[0].strip()
        value = ":".join(parts[1:]).strip()

        # Look for YAML keys with ALL_CAPS_NAMES
        if re.match(r"^[A-Z0-9_]+$", key) and value:
            result[key] = value

    return result


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Run k6 scripts within Markdown files."
    )
    parser.add_argument("file", help="Path to Markdown file.", type=argparse.FileType())
    parser.add_argument(
        "--blocks",
        default=":",
        help="Python-like range of code blocks to run (0, 1, 2, 0:2, 3:, etc.).",
    )
    parser.add_argument("--lang", default=JS, help="Code block language.")
    parser.add_argument(
        "--duration",
        "-d",
        default=None,
        help="Override script(s) duration. Is not applied to browser tests.",
    )
    parser.add_argument(
        "--index-file",
        type=argparse.FileType(),
        default=None,
        help="Path to Front Matter _index.md file containing environment variables.",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        default=False,
        help="Enable verbose mode. All log output for tests will be printed.",
        action="store_true",
    )
    args = parser.parse_args()
    index_env = read_front_matter_env(args.index_file)

    print("Starting md-k6 script.")
    print("Front Matter variables:")
    for key, value in index_env.items():
        print(f"  {key}={value}")

    print("Reading from file:", args.file.name)

    lang = args.lang
    text: str = args.file.read()

    if re.search(f"<!-- *md-k6:{SKIP_ALL} *-->", text):
        print(f"Skipping entire file ({SKIP_ALL}).")
        return

    scripts = extract_scripts(text, lang, index_env)

    if ":" in args.blocks:
        range_parts = args.blocks.split(":")
        try:
            start = int(range_parts[0]) if range_parts[0] else 0
            end = (
                int(range_parts[1])
                if len(range_parts) > 1 and range_parts[1]
                else len(scripts)
            )
            print(f"Blocks selection range: start = {start}, end = {end}")
        except ValueError:
            print("Invalid range.")
            exit(1)
    else:
        try:
            start = int(args.blocks)
            end = start + 1
            print(f"Block selected: index = {start}")
        except ValueError:
            print("Invalid range.")
            exit(1)

    print("Number of code blocks (scripts) read:", len(scripts))
    to_run = len(scripts[start:end])
    print("Number of code blocks (scripts) to run:", to_run)

    for i, script in enumerate(scripts[start:end]):
        print(
            f"Running script #{i + 1} (of {to_run}) (hash: {script.text_hash}, options: {script.options}):\n"
        )
        print_code(script)
        run_k6(script, args.duration, args.verbose)
        print()


class TestMDK6(TestCase):
    """Unit tests for this script.
    Run them with:

    $ python3 -m unittest scripts/md-k6.py

    """

    def testExtractScriptSimple(self):
        text = """
```javascript
hello, world!
```
        """
        scripts = extract_scripts(text)

        self.assertEqual(len(scripts), 1)
        self.assertEqual(scripts[0].text, "hello, world!")

    def testExtractScriptIndexEnv(self):
        text = """
```javascript
{{< param "FOO_BAR" >}} {{  < param    "FOO_BAR"   > }}
```
        """
        scripts = extract_scripts(text, JS, {"FOO_BAR": "testing"})

        self.assertEqual(len(scripts), 1)
        self.assertEqual(scripts[0].text, "testing testing")

    def testReadIndexEnvFile(self):
        text = io.StringIO(
            """
---
title: Testing
FOO_BAR: 1234
   FOO_BAR2:1234
FOO_BAR3: some:value
not_added: foo
not_added2:
NOT_ADDED3:
---
"""
        )
        env = read_front_matter_env(text)

        self.assertEqual(
            env, {"FOO_BAR": "1234", "FOO_BAR2": "1234", "FOO_BAR3": "some:value"}
        )

    def testExtractScriptOptions(self):
        text = """
<!-- md-k6:nofail,env.A=B,env.C=X- -->
```javascript
...
```
        """
        scripts = extract_scripts(text)

        self.assertEqual(
            scripts,
            [
                Script(
                    "...",
                    ["nofail", "env.A=B", "env.C=X-"],
                    {
                        "A": "B",
                        "C": "X-",
                    },
                    "ab5df625bc76dbd4",
                    [],
                )
            ],
        )

    def testExtractScriptArgs(self):
        text = """
<!-- md-k6:arg.--verbose,arg.-h-->
```javascript
...
```

<!-- md-k6:arg.--verbose,arg.-h -->
```javascript
...
```

<!-- md-k6:arg.--verbose,arg.--->
```javascript
...
```
"""
        scripts = extract_scripts(text)

        self.assertEqual(
            scripts[0],
            Script(
                "...",
                ["arg.--verbose", "arg.-h"],
                {},
                "ab5df625bc76dbd4",
                ["--verbose", "-h"],
            ),
        )
        self.assertEqual(
            scripts[1],
            Script(
                "...",
                ["arg.--verbose", "arg.-h"],
                {},
                "ab5df625bc76dbd4",
                ["--verbose", "-h"],
            ),
        )
        self.assertEqual(
            scripts[2],
            Script(
                "...",
                ["arg.--verbose", "arg.-"],
                {},
                "ab5df625bc76dbd4",
                ["--verbose", "-"],
            ),
        )


if __name__ == "__main__":
    main()
