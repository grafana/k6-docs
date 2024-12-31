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

Script = namedtuple("Script", ["text", "options"])


def run_k6(script: Script) -> None:
    script_file = tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".js")
    script_file.write(script.text)
    script_file.close()

    logs_file = tempfile.NamedTemporaryFile(delete=False, suffix=".json")
    logs_file.close()

    k6 = os.getenv("K6_PATH", "k6")

    result = subprocess.run(
        [
            k6,
            "run",
            script_file.name,
            "--log-format=json",
            f"--log-output=file={logs_file.name}",
            "-w",
        ],
    )

    if result.returncode:
        print("k6 returned non-zero status:", result.returncode)
        exit(1)

    with open(logs_file.name) as f:
        lines = f.readlines()

    for line in lines:
        line = line.strip()
        parsed = json.loads(line)
        if parsed["level"] == "error":
            print("error in k6 script execution:", line)
            exit(1)


def main() -> None:
    print("Starting md-k6 script.")

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
    args = parser.parse_args()

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
        "<!-- *md-k6:([^ -]+) *-->\n+(<!-- eslint-skip -->\n+)?```" + lang,
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

        scripts.append(Script(text="\n".join(lines[1:]), options=options))

    range_parts = args.blocks.split(":")
    try:
        start = int(range_parts[0]) if range_parts[0] else 0
        end = (
            int(range_parts[1])
            if len(range_parts) > 1 and range_parts[1]
            else len(scripts)
        )
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
        run_k6(script)
        print()


if __name__ == "__main__":
    main()
