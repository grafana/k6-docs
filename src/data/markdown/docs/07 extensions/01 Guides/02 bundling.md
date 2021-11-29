---
title: 'Build a k6 binary with extensions'
excerpt: 'Performance testing without limits. This tutorial shows how to build a k6 binary that includes one or many extensions using xk6.'
---

You might have found a neat k6 extension on the [Extensions page](/extensions) or on
[GitHub](https://github.com/topics/xk6) and wish to use it in your tests. Great! You only need to use a k6 binary that includes the extension.

The process of building a k6 binary with one or multiple extensions is relatively simple. You'll first need to setup [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/). Make sure that your `$PATH` environment variable is
updated and that `go version` returns the correct version.

Then install [xk6](https://github.com/grafana/xk6) with:


```bash
go install go.k6.io/xk6/cmd/xk6@latest
```


And confirm that `which xk6` on Linux/macOS or `where xk6` on Windows returns a
valid path. Otherwise ensure that `$GOPATH` is correctly defined and that
`$GOPATH/bin` is added to your `$PATH` environment variable. See the
[Go documentation](https://golang.org/cmd/go/#hdr-GOPATH_environment_variable) for details.

Once [xk6](https://github.com/grafana/xk6) is installed, building a k6 binary with one or more extensions can be done
with the `xk6 build` command as follows:


```bash
xk6 build latest \
  --with github.com/grafana/xk6-sql \
  --with github.com/grafana/xk6-output-prometheus-remote
```

This will build a `k6` binary in the current directory based on the most recently
released k6 version including the [`xk6-sql`](https://github.com/grafana/xk6-sql) and [`xk6-output-prometheus-remote`](https://github.com/grafana/xk6-output-prometheus-remote). 

```bash
... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: ./k6
```

Now you can run a script with this binary and use the functionalities of the bundled extensions.

```bash
./k6 my-script.js
```


Note that when running the script we have to **specify the binary just built in the
current directory (`./k6`)**, as otherwise some other `k6` binary found on the system
could be executed which might not have the extensions built-in. This is only the case
on Linux and macOS, as Windows shells will execute the binary in the current
directory first.

> Also note that because of the way xk6 works, vendored dependencies (the `vendor`
directory created by `go mod vendor`) will **not** be taken into account when
building a binary, and you don't need to commit them to the extension repository.

## See also

- [`xk6 build` command options](https://github.com/grafana/xk6#command-usage)
- [Build Bundle](/extensions/bundle-builder/)

