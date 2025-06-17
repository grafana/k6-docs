---
title: 'Create an extension with a template'
menuTitle: 'Create an extension with a template'
description: 'Learn how to to create a k6 extension that handles ascii85 encoding using the xk6-example GitHub repository and GitHub Codespaces, along with best practices.'
weight: 200
---

# Create an extension with a template

This guide explains a step-by-step process for creating a k6 extension using the GitHub k6 extension template repository.

In this guide, you’ll learn how to:

- Create a GitHub repository using the k6 extension template repository.
- Create a TypeScript declaration file to document your API.
- Create [ascii85](https://en.wikipedia.org/wiki/Ascii85) encoding and decoding implementation.
- Build a k6 binary with the extension.
- Use the custom k6 binary to run a test.
- Best practices for creating tests, checking for security vulnerabilities, and static analysis for your extension.

For this guide, you’ll implement two functions that handle ascii85 encoding, which is a feature that’s not natively supported by k6. This will be implemented using Go.

## Before you begin

To follow along, you’ll need:

- A [GitHub account](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github).

Having a GitHub account simplifies the process of developing k6 extensions, which the guide will cover. [GitHub Codespaces](https://github.com/features/codespaces) provides a streamlined development experience for k6 extensions, reducing the need for local setup.

## Create a GitHub repository

The first step is to create a GitHub repository using the [grafana/xk6-example](https://github.com/grafana/xk6-example) template repository. This can be done interactively in a browser by clicking [here](https://github.com/new?template_name=xk6-example&template_owner=grafana). Name the repository "xk6-example-ascii85", and set the visibility to **Public**.

Alternatively, use the [GitHub CLI](https://cli.github.com/) to create the repository.

```bash
gh repo create -p grafana/xk6-example -d "Experimental k6 extension" --public xk6-example-ascii85
```

## Create a codespace

GitHub Codespaces is a GitHub feature that lets you create and use a fully configured development environment in the cloud.

To create a GitHub codespace:

- Go to the xk6-example-ascii85 repository you created in the previous step.
- On the repository page, click the green **Code** button and then select **Codespaces** from the dropdown menu.
- Click **Create new codespace**.

Once the codespace is ready, it will open in your browser as a Visual Studio Code-like environment, letting you begin working on your project with the repository code already checked out.

Alternatively, use the [GitHub CLI](https://cli.github.com/) to create the codespace, replacing `USER` with your GitHub username:

```bash
gh codespace create --repo USER/xk6-example-ascii85 --web
```

## Remove example code

The xk6-example-ascii85 repository includes integration examples between Go and the k6 JavaScript runtime. These files can be useful as learning resources, but they’re not required for this extension.

You can use the `.starter.patch` file with the `git apply` command to delete these files.

```bash
git apply .starter.patch
rm .starter.patch
```

## API declaration

This step is optional but recommended. It is a good practice to document the API of the k6 extension before implementing it.

Create a TypeScript declaration file named `index.d.ts` and add the following code:

```typescript
/**
 * **Example ascii85 encoding for k6**
 *
 * @module example_ascii85
 */

export as namespace example_ascii85;

/**
 * ascii85encode returns the ASCII85 encoding of src.
 *
 * @param src The input to encode.
 */
export declare function encode(src: ArrayBuffer): string;

/**
 * ascii85decode returns the decoded bytes represented by the string str.
 *
 * @param str The string to decode.
 */
export declare function decode(str: string): ArrayBuffer;
```

## Add encoding and decoding functions

The `encode()` function's implementation is straightforward, as the k6 runtime handles all type conversions. The Go standard `ascii85` package provides the ASCII85 encoding implementation, requiring only a parameter for its use.

Add the following function to the `module.go` file. The `ascii85` package import will be added automatically by the IDE.

```go
func (*module) encode(data []byte) string {
    dst := make([]byte, ascii85.MaxEncodedLen(len(data)))
    n := ascii85.Encode(dst, data)

    return string(dst[:n])
}
```

The `decode()` function should return an `ArrayBuffer`, which requires type conversion by the JavaScript runtime. The `sobek.ArrayBuffer` go struct corresponds to the JavaScript `ArrayBuffer`, so an instance of it must be returned. Refer to the [sobek.Runtime#ExportTo()](https://pkg.go.dev/github.com/grafana/sobek#Runtime.ExportTo) documentation for mapping details.

Add the following function to the `module.go` file:

```go
func (m *module) decode(str string) (sobek.ArrayBuffer, error) {
    dst := make([]byte, len(str))

    n, _, err := ascii85.Decode(dst, []byte(str), true)
    if err != nil {
        return sobek.ArrayBuffer{}, err
    }

    return m.vu.Runtime().NewArrayBuffer(dst[:n]), nil
}
```

To make the `encode()` and `decode()` functions usable within the JavaScript runtime, you have to export them. Add them to the exported symbols in the `module.go` file.

```go
func (m *module) Exports() modules.Exports {
    return modules.Exports{
        Named: map[string]any{
            "encode": m.encode,
            "decode": m.decode,
        },
    }
}
```

The Go implementation of the extension is complete.

## Build a custom k6 binary

To use the `xk6-example-ascii85` extension, a custom k6 build must be created using the `xk6 build` subcommand.

```bash
xk6 build --with github.com/USER/xk6-example-ascii85=.
```

Replace `USER` with your GitHub username.

This command creates a custom k6 executable in the current folder.

## Run a test with the custom k6 binary

To showcase the extension's functionality, create a JavaScript file named `script.js` and add the following code to it:

```js
import { encode } from 'k6/x/example_ascii85';

export default function () {
  console.log(encode(new Uint8Array([72, 101, 108, 108, 111, 33]).buffer)); // 87cURD]o
}
```

And then run the script using the custom k6 binary:

```bash
./k6 run script.js
```

The script outputs `87cURD]o` to the console. This string is the ascii85 encoded representation of `Hello!`.

## Best practices

### Create a smoke test

For initial verification before writing comprehensive integration tests, you can create a basic smoke test in `test/smoke.test.js`.

```js
import { encode, decode } from 'k6/x/example_ascii85';
import { check } from 'k6';

export const options = {
  thresholds: {
    checks: ['rate==1'],
  },
};

export default function () {
  const bytes = new Uint8Array([72, 101, 108, 108, 111, 33]).buffer;

  check(encode(bytes), {
    encoded: (str) => str == '87cURD]o',
    reverse: (str) => equal(bytes, decode(str)),
  });
}

const equal = (a, b) => new Uint8Array(a).toString() === new Uint8Array(b).toString();
```

This test ensures the correctness of ascii85 encoding and decoding. It uses a fixed `Hello!` string as a test case for both encoding and decoding processes.

### Create Go module tests

Go tests offer the quickest method for verifying extension implementations. Standard unit testing practices apply. For a module-level integration test example, refer to the module_test.go file. This setup facilitates comprehensive integration testing between the Go implementation and the JavaScript runtime.

```go
package example_ascii85

import (
    _ "embed"
    "testing"

    "github.com/stretchr/testify/require"
    "go.k6.io/k6/js/modulestest"
)

func Test_module(t *testing.T) { //nolint:tparallel
    t.Parallel()

    runtime := modulestest.NewRuntime(t)
    err := runtime.SetupModuleSystem(map[string]any{importPath: new(rootModule)}, nil, nil)
    require.NoError(t, err)

    _, err = runtime.RunOnEventLoop(`let mod = require("` + importPath + `")`)
    require.NoError(t, err)

    tests := []struct {
        name  string
        check string
    }{
        // Add your test cases here
        // Example: {name: "myFunc()", check: `mod.myFunc() == expectedValue`},
        {
            name:  "encode()",
            check: `mod.encode(new Uint8Array([72, 101, 108, 108, 111, 33]).buffer) == "87cURD]o"`,
        },
    }
    for _, tt := range tests { //nolint:paralleltest
        t.Run(tt.name, func(t *testing.T) {
            got, err := runtime.RunOnEventLoop(tt.check)

            require.NoError(t, err)
            require.True(t, got.ToBoolean())
        })
    }
}
```

The provided test code creates an extension instance and integrates it into the JavaScript runtime, accessible as `mod`. The JavaScript code defining the test is then executed within the JavaScript runtime's event loop.

### Generate API documentation

You can generate HTML API documentation from the `index.d.ts` API declaration file using [TypeDoc](https://typedoc.org/). To do this, run the following command that creates the extension API documentation from the `index.d.ts` file and saves it in the `build/docs` directory.

```bash
bun x typedoc --out build/docs
```

### Security and vulnerability

Ensure the Go source code of your k6 extension is checked for security vulnerabilities using the [gosec](https://github.com/securego/gosec) tool. Like any Go project, security scanning is crucial for your extension's codebase.

```bash
gosec -quiet ./...
```

Generally, extensions rely on external Go module dependencies. It is advisable to use the [govulncheck](https://github.com/golang/vuln) tool to identify potential vulnerabilities within these dependencies.

```bash
govulncheck ./...
```

Security and vulnerability checks are a requirement for registering the extension in the [k6 Extension Registry](https://registry.k6.io).

### Static analysis

Analyzing the Go source code of your k6 extension statically can proactively identify subtle bugs. [golangci-lint](https://golangci-lint.run/) is a popular static code analysis tool that even can be used without configuration.

```bash
golangci-lint run ./...
```

## Reference

The complete Go source code (`module.go`) for the extension implementation is provided for reference.

```go
// Package example_ascii85 contains the xk6-example-ascii85 extension.
package example_ascii85

import (
    "encoding/ascii85"

    "github.com/grafana/sobek"
    "go.k6.io/k6/js/modules"
)

type rootModule struct{}

func (*rootModule) NewModuleInstance(vu modules.VU) modules.Instance {
    return &module{vu}
}

type module struct {
    vu modules.VU
}

func (m *module) Exports() modules.Exports {
    return modules.Exports{
        Named: map[string]any{
            "encode": m.encode,
            "decode": m.decode,
        },
    }
}

func (*module) encode(data []byte) string {
    dst := make([]byte, ascii85.MaxEncodedLen(len(data)))
    n := ascii85.Encode(dst, data)

    return string(dst[:n])
}

func (m *module) decode(str string) (sobek.ArrayBuffer, error) {
    dst := make([]byte, len(str))

    n, _, err := ascii85.Decode(dst, []byte(str), true)
    if err != nil {
        return sobek.ArrayBuffer{}, err
    }

    return m.vu.Runtime().NewArrayBuffer(dst[:n]), nil
}

var _ modules.Module = (*rootModule)(nil)
```

In addition, `register.go` contains the registration of the extension with the k6 runtime.

```go
package example_ascii85

import "go.k6.io/k6/js/modules"

const importPath = "k6/x/example_ascii85"

func init() {
    modules.Register(importPath, new(rootModule))
}
```

### Reference to the JavaScript runtime

In the k6 runtime, each VU (data structure representing a virtual user) has a dedicated JavaScript runtime instance, which can be accessed with the `Runtime()` function.

```go
m.vu.Runtime()
```

## Additional resources

- [k6 go API documentation](https://pkg.go.dev/go.k6.io/k6)
- [k6 JavaScript engine documentation](https://pkg.go.dev/github.com/grafana/sobek)
- [xk6 - k6 extension development toolbox](https://github.com/grafana/xk6)
