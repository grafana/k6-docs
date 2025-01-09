# md-k6.py
# Description: A script for running k6 scripts within Markdown files.
# Requires: Python 3.11+ (no external dependencies).
# Usage:
#   python3 md-k6.py <file>

import os
import re
import json
import hashlib
import argparse
import subprocess
import textwrap
import tempfile
from collections import namedtuple

Script = namedtuple("Script", ["text", "options", "env"])


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
    ]
    if duration:
        cmd.extend(["-d", duration])

    env = {**os.environ, **script.env}
    result = subprocess.run(cmd, env=env)

    if result.returncode:
        print("k6 returned non-zero status:", result.returncode)
        try:
            with open(logs_file.name) as f:
                logs = f.read()

            print("logs:")
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
        if verbose:
            print(line)
        parsed = json.loads(line)
        if parsed["level"] == "error":
            print("error in k6 script execution:", line)
            exit(1)


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
    parser.add_argument("--lang", default="javascript", help="Code block language.")
    parser.add_argument(
        "--duration", "-d", default=None, help="Override script(s) duration."
    )
    parser.add_argument(
        "--verbose",
        "-v",
        default=False,
        help="Enable verbose mode. All log output for tests will be printed.",
        action="store_true",
    )
    args = parser.parse_args()

    print("Starting md-k6 script.")
    print("Reading from file:", args.file.name)

    lang = args.lang
    text = args.file.read()

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
    # each part separately. If a part's first line starts with "$", then we
    # know one or more options were specified by the user (such as "skip").
    #
    # Additionally, we also skip over any "<!-- eslint-skip -->" comments, to
    # allow developers to use both md-k6 *and* ESLint skip directives in code
    # blocks.

    text = re.sub(
        r"<!-- *md-k6:([^ -]+) *-->\n+(<!-- eslint-skip -->\n+)?\s*```" + lang,
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

        if "skip" in options:
            continue

        env = {}
        for opt in options:
            if not opt.startswith("env."):
                continue
            if "=" not in opt:
                opt += "="
            key, value = opt.removeprefix("env.").split("=")
            env[key] = value

        scripts.append(Script(text="\n".join(lines[1:]), options=options, env=env))

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
    print("Number of code blocks (scripts) to run:", len(scripts[start:end]))

    for i, script in enumerate(scripts[start:end]):
        script_hash = hashlib.sha256(script.text.encode("utf-8")).hexdigest()[:16]
        print(
            f"Running script #{i} (hash: {script_hash}, options: {script.options}):\n"
        )
        print(textwrap.indent(script.text, "     "))
        run_k6(script, args.duration, args.verbose)
        print()


if __name__ == "__main__":
    main()
