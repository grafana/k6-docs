---
title: 'Secret source Extensions'
description: 'Follow these steps to build an secret source extension for k6.'
weight: 03
---

# Secret Source Extensions

Secret source extension allow users to write or use written by other users extensions in order to get secrets to be used within k6 tests.

Like [JavaScript extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/create/javascript-extensions),
secret source extensions rely on the extension author to implement specific APIs.

## Before you start:

To run this tutorial, you'll need the following applications installed:

- Go
- Git

You also need to install xk6:

```bash
$ go install go.k6.io/xk6/cmd/xk6@latest
```

## Write a simple extension

1. Set up a directory to work in.

```bash
$ mkdir xk6-secret-source-cli; cd xk6-secret-source-cli; go mod init xk6-secret-source-cli
```

1. The core of an Output extension is a struct that implements the [`secrets.Source`](https://pkg.go.dev/go.k6.io/k6/secretsource#Source)
   interface.

Create a simple example secret source that just reads the secrets from the cli flag - similar to the in built `mock` one.

```go
package cli

import (
	"errors"
	"fmt"
	"strings"

	"go.k6.io/k6/secretsource"
)

func newCLISecretSourceFromParams(params secretsource.Params) (secretsource.Source, error) {
	list := strings.Split(params.ConfigArgument, ",")
	secrets := make(map[string]string, len(list))
	for _, kv := range list {
		k, v, ok := strings.Cut(kv, "=")
		if !ok {
			return nil, fmt.Errorf("parsing %q, needs =", kv)
		}

		secrets[k] = v
	}
	return &cliSecretSource{internal: secrets}
}

type cliSecretSource struct {
	internal map[string]string
}

func (*cliSecretSource) Description() string {
	return "this is an example secret source"
}

func (css *cliSecretSource) Get(key string) (string, error) {
	v, ok := css.internal[key]
	if !ok {
		return "", errors.New("no value")
	}
	return v, nil
}
```

1. Register the module to use these from k6 test scripts.

```go
package cli

import "go.k6.io/k6/secretsource"

// init is called by the Go runtime at application startup.
func init() {
	secretsource.RegisterExtension("cli", newCLISecretSourceFromParams)
}
```

{{< admonition type="note" >}}

You must use the registered with the `--secret-source` flag when running k6!

{{< /admonition >}}

The final extension code looks like this:

{{< code >}}

```go
package cli

import (
	"errors"
	"fmt"
	"strings"

	"go.k6.io/k6/secretsource"
)

// init is called by the Go runtime at application startup.
func init() {
	secretsource.RegisterExtension("cli", newCLISecretSourceFromParams)
}

func newCLISecretSourceFromParams(params secretsource.Params) (secretsource.Source, error) {
	list := strings.Split(params.ConfigArgument, ",")
	secrets := make(map[string]string, len(list))
	for _, kv := range list {
		k, v, ok := strings.Cut(kv, "=")
		if !ok {
			return nil, fmt.Errorf("parsing %q, needs =", kv)
		}

		secrets[k] = v
	}
	return &cliSecretSource{internal: secrets}, nil
}

type cliSecretSource struct {
	internal map[string]string
}

func (*cliSecretSource) Description() string {
	return "this is an example secret source"
}

func (css *cliSecretSource) Get(key string) (string, error) {
	v, ok := css.internal[key]
	if !ok {
		return "", errors.New("no value")
	}
	return v, nil
}
```

{{< /code >}}

Notice a couple of things:

- The module initializer `newCLISecretSourceFromParams()` receives an instance of
  [`secretsource.Params`](https://pkg.go.dev/go.k6.io/k6/secretsource#Params).
  With this object, the extension can access the secret source specific configuration,
  interfaces to the filesystem, it cli args, logger, etc.

- `Get` in this example just returns from an internal array, but it also can do network requests or anything else it needs to get secrets.

## Compile your extended k6

To build a k6 binary with this extension, run:

```bash
$ go mod tidy # this is needed by the go toolchain
$ xk6 build --with xk6-secret-source-cli=.
```

{{< admonition type="note" >}}

`xk6-secret-source-cli` is the Go module name passed to `go mod init`

Usually, this would be a URL similar to `github.com/grafana/xk6-secret-source-cli`.

{{< /admonition >}}

## Use your extension

Now we can use the extension with a test script.

1. In new JavaScript file, make some simple test logic.

{{< code >}}

<!-- md-k6:skip -->

```javascript
import secrets from 'k6/secrets';

export default async () => {
  const my_secret = await secrets.get('cool'); // get secret from a source with the provided identifier
  console.log(my_secret);
  await secrets.get('else'); // get secret from a source with the provided identifier
  console.log(my_secret); // print the same old secret to see that the secret from above will also be redacted
  console.log('some'); // log the original secret but using its constant value
};
```

{{< /code >}}

1. Now, run the test.

```bash
./k6 run test.js --secret-source=cli=cool=some,else=console --quiet --no-summary
```

{{< admonition type="note" >}}

The `--secret-source=cli=cool=some,else=console` argument tells k6 to use your custom secret source and gives its configuration.
The flag `--quiet --no-summary` configures k6 to show only custom output.

{{< /admonition >}}

Your output should look something like this:

```shell
INFO[0000] ***SECRET_REDACTED***                         source=console
INFO[0000] ***SECRET_REDACTED***                         source="***SECRET_REDACTED***"
INFO[0000] ***SECRET_REDACTED***                         source="***SECRET_REDACTED***"
```

As you can see there is quite a lot of redacted secrets. And also that `console` is only redacted after it is accessed as before that k6 can not know it is actually a secret.

{{< admonition type="note" >}}

Real world secrets are not expected to be common strings that will be found naturally in the k6 output as is in this example.

{{< /admonition >}}

## Things to keep in mind

> Questions? Feel free to join the discussion on extensions in the [k6 Community Forum](https://community.grafana.com/c/grafana-k6/extensions/82).
