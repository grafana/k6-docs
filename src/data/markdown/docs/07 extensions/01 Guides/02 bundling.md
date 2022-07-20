---
title: 'Build a k6 binary with extensions'
excerpt: 'Guide to build a k6 binary that includes one or many extensions using xk6.'
---

To use an extension that you found on the [Extension page](/extensions/getting-started/explore/) or the [xk6 GitHub topic](https://github.com/topics/xk6),
you need to build a binary.


## Before you start

- Set up [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/).
- Make sure that your `$PATH` environment variable is updated so that `go version` returns the correct version.

## Installing xk6

Given the prerequisite Go setup, installing [xk6](https://github.com/grafana/xk6) itself requires only the following command:

```bash
$ go install go.k6.io/xk6/cmd/xk6@latest
```

To confirm your installation, run `which xk6` on Linux and Mac, or `where xk6` on Windows.
Make sure the command returns a valid path.

If not, check that you've correctly defined the`$GOPATH` environment variable and that `$GOPATH/bin`
is in your `$PATH`. See the [Go documentation](https://golang.org/cmd/go/#hdr-GOPATH_environment_variable)
for details.

## Building your first extension

Once installed, building a k6 binary with one or more extensions can be done with the `xk6 build`
command as follows:

```bash
$ xk6 build latest \
  --with github.com/grafana/xk6-sql@v0.0.1 \
  --with github.com/grafana/xk6-output-prometheus-remote
```

> When creating your bundles, use the [interactive builder](/extensions/getting-started/bundle/) to avoid typing mistakes!

Once completed, the **current directory** contains your newly built `k6` binary with
the [`xk6-sql`](https://github.com/grafana/xk6-sql) and [`xk6-output-prometheus-remote`](https://github.com/grafana/xk6-output-prometheus-remote)
extensions.

```bash
... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: ./k6

xk6 has now produced a new k6 binary which may be different than the command on your system path!
Be sure to run './k6 run <SCRIPT_NAME>' from the '...' directory.
```

## Breaking down the xk6 command

From the [xk6 documentation](https://github.com/grafana/xk6/#command-usage), the command-line usage is as follows:

```plain
xk6 build [<k6_version>]
    [--output <file>]
    [--with <module[@version][=replacement]>...]
    [--replace <module=replacement>...]

Flags:
  --output   specifies the new binary name [default: 'k6']
  --replace  enables override of dependencies for k6 and extensions [default: none]
  --with     the extension module to be included in the binary [default: none]
```

> The use of `--replace` should be considered an advanced feature to be avoided unless required.

Referring back to our executed command, note that:
- We specify the version as `latest`, which is also the default if we hadn't supplied
  a version. `latest` means that we'll build using the _latest_ source code for k6. Consider using
  a stable [release version](https://github.com/grafana/k6/releases) as a best practice unless
  you genuinely want the _bleeding edge_.
- With each `--with`, we specified a full GitHub URI for the extension repository. If not specifying
  a version, the default is `latest` once again. Check your extension repository for stable
  release versions, if available, to lock in your version as we've done with `xk6-sql@v0.0.1`.
- We did not use the `--output` option; therefore, our new binary is `k6` within the current directory.
  Had we used `--output k6-extended`, our binary would be named `k6-extended` within the current
  directory. If a directory is specified, then the new binary would be `k6` within
  _that_ directory. If a path to a non-existent file, e.g. `/tmp/k6-extended`, this will be the
  path and filename for the binary.

Running `./k6 version` should show your build is based upon the appropriate version.

## Building from a local repository

Suppose now you've cloned the `xk6-sql` repository and want the local version included in your
custom binary? From the cloned directory, we would then use:
```bash
--with github.com/grafana/xk6-sql=.
```
Based upon the command usage described in the previous section, this tells xk6 to use
the _current directory_ as the _replacement_ for the _module_.

## Running your extended binary

Now that we have our newly built k6 binary, we can run scripts using the functionalities
of the bundled extensions.

```bash
$ ./k6 run my-script.js
```

> Be sure to specify the binary just built in the current directory as `./k6`, or else
> Linux/Mac could execute another k6 binary on your system path. Windows shells will
> first search for the binary in the current directory by default.


<!-- TODO: Is this really necessary here? Preserving for the time being.
> Also note that because of the way xk6 works, vendored dependencies (the `vendor`
directory created by `go mod vendor`) will **not** be taken into account when
building a binary, and you don't need to commit them to the extension repository.
-->
