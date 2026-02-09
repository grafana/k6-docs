---
title: 'Analyze script dependencies'
description: 'Use the k6 deps command to analyze dependencies for your k6 test scripts.'
weight: 95
---

# k6 deps command

The `k6 deps` command analyzes your k6 test script and outputs information about the dependencies your script uses.

## Usage

```bash
k6 deps [options] <script>
```

## Description

When you run `k6 deps`, k6 analyzes your test script and its imports to identify k6 extensions (such as `k6/x/faker`, `k6/x/redis`) and k6 itself that your script uses.

The command outputs dependency information in human-readable format by default, or JSON format with the `--json` flag. You can use this information to:

- Understand what k6 extensions your script uses
- Share dependency information with your team
- Use it to know if you need a custom binary or if the current one can run the script

The command, like [automatic extension resolution](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/#use-automatic-extension-resolution), is only able to find dependencies using import/export syntax and "use" directives in already found files. It doesn't follow potential `require` calls.

The command also takes into account any provided [dependency manifest](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#dependency-manifest) and applies it during `k6 run`.

## Options

| Option | Description |
|--------|-------------|
| `--json` | Output dependency information in JSON format. Without this flag, the output is human-readable. |

## Examples

### Generate dependency information

Analyze your test script and output dependency information:

```bash
k6 deps script.js
```

This outputs dependency information in human-readable format to stdout.

### Generate JSON output

Output the dependency information in JSON format:

```bash
k6 deps --json script.js
```

## Output format

The `k6 deps` command outputs dependency information in human-readable format by default. When using the `--json` flag, the output is a JSON object.

### Human-readable output

The default human-readable output shows:

- **Build Dependencies:** Lists k6 extensions and k6 itself with version constraints (or `(none)` if there are no build dependencies)
- **Imports:** Lists all imports including file paths and module names
- **Custom Build Required:** Indicates `yes` or `no` whether a custom build is needed

Example:

```
Build Dependencies:
  k6: >1.2.0
  k6/x/faker: *

Imports:
  file:///path/to/script.js
  k6/execution
  k6/x/faker

Custom Build Required: yes
```

### JSON output

When using the `--json` flag, the output is a JSON object with three fields:

- `buildDependencies`: An object mapping k6 extension names (or `k6` itself) to version constraints
- `imports`: An array of strings listing all imports
- `customBuildRequired`: A boolean indicating whether a custom build is required

Example:

```json
{
  "buildDependencies": {
    "k6": ">1.2.0",
    "k6/x/faker": "*"
  },
  "imports": [
    "file:///path/to/script.js",
    "k6/execution",
    "k6/x/faker"
  ],
  "customBuildRequired": true
}
```

// (Intentionally left blank as requested. All previous content in this section removed.)
