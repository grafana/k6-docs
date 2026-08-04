# Text encoding example verification

This bundle contains a standalone k6 script for every runnable documentation example changed while documenting `TextEncoder` and `TextDecoder`.
Each script starts with a comment that identifies its source Markdown file and code-block number.

The bundle contains 32 scripts:

| Category      | Scripts | Requirements                                                                   |
| :------------ | ------: | :----------------------------------------------------------------------------- |
| Text encoding |       3 | k6 built from a revision that includes `TextEncoder` and `TextDecoder`         |
| Web Crypto    |      17 | The same k6 build                                                              |
| Streams       |       3 | The same k6 build; CSV fixtures are included next to the scripts               |
| Browser       |       1 | The same k6 build and Chromium                                                 |
| MQTT          |       3 | A compatible custom k6 binary and an MQTT broker                               |
| TCP           |       5 | A compatible custom k6 binary; four examples use the included local TCP server |

The two short constructor snippets from the API reference aren't copied because they are signatures, not complete examples.

Run the commands in this guide from the repository root.

## Build a compatible k6 binary

Until the change is part of a k6 release, build k6 from `master`:

```sh
mkdir -p /tmp/k6-text-encoding-bin
GOBIN=/tmp/k6-text-encoding-bin go install go.k6.io/k6/v2@master
export K6_BIN=/tmp/k6-text-encoding-bin/k6
```

### Build a compatible binary for the extension examples

Automatic extension resolution currently selects a released k6 version that predates `TextEncoder` and `TextDecoder`.
Build k6 from the v2 `master` branch with the MQTT and TCP extensions instead:

```sh
GOBIN=/tmp/k6-text-encoding-bin go install go.k6.io/xk6/cmd/xk6@latest

/tmp/k6-text-encoding-bin/xk6 build master \
  --k6-repo go.k6.io/k6/v2 \
  --output /tmp/k6-text-encoding-bin/k6-extensions \
  --with github.com/grafana/xk6-mqtt@v0.3.0 \
  --with github.com/grafana/xk6-tcp@v0.3.0

export K6_EXT_BIN=/tmp/k6-text-encoding-bin/k6-extensions
```

The explicit `--k6-repo` flag selects the v2 module that contains the unreleased encoding support and matches the current extensions.

## Run the text encoding and Web Crypto examples

Run all 20 examples that don't need files, a browser, an extension, or an external service:

```sh
sh verification/k6-text-encoding-examples/run-core.sh
```

You can also run any script individually:

```sh
$K6_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/text-encoding/index-example-3.js
```

## Run the stream examples

Each stream script has a `data.csv` fixture in the same directory:

```sh
$K6_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-experimental/streams/index-example-1.js

$K6_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-experimental/streams/readablestream/index-example-3.js

$K6_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller/enqueue-example-1.js
```

## Run the browser example

With Chromium installed:

```sh
K6_BROWSER_HEADLESS=true $K6_BIN run \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-browser/response/body-example-1.js
```

The example requests `https://test.k6.io/`, so it also requires network access.

## Run the MQTT examples

Use the custom extension binary from the previous build step.
The scripts default to the public `broker.emqx.io:1883` broker, or you can set `MQTT_BROKER_ADDRESS`:

```sh
MQTT_BROKER_ADDRESS=mqtt://localhost:1883 K6_AUTO_EXTENSION_RESOLUTION=false \
  $K6_EXT_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-x-mqtt/index-example-1.js

MQTT_BROKER_ADDRESS=mqtt://localhost:1883 K6_AUTO_EXTENSION_RESOLUTION=false \
  $K6_EXT_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-x-mqtt/index-example-2.js

MQTT_BROKER_ADDRESS=mqtt://localhost:1883 K6_AUTO_EXTENSION_RESOLUTION=false \
  $K6_EXT_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-x-mqtt/client/index-example-2.js
```

## Run the TCP examples

Start the included echo/idle server in one terminal:

```sh
go run ./verification/k6-text-encoding-examples/support/tcp-server.go
```

Then run the four local examples in another terminal:

```sh
TCP_HOST=localhost TCP_PORT=8080 K6_AUTO_EXTENSION_RESOLUTION=false \
  $K6_EXT_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-x-tcp/socket/index-example-2.js

TCP_HOST=localhost TCP_PORT=8080 K6_AUTO_EXTENSION_RESOLUTION=false \
  $K6_EXT_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-x-tcp/socket/destroy-example-2.js

TCP_HOST=localhost TCP_PORT=8080 K6_AUTO_EXTENSION_RESOLUTION=false \
  $K6_EXT_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-x-tcp/socket/on-example-7.js

TCP_HOST=localhost TCP_PORT=8080 K6_AUTO_EXTENSION_RESOLUTION=false \
  $K6_EXT_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-x-tcp/socket/set-timeout-example-2.js
```

The remaining TCP example makes an HTTPS request over a TLS socket and requires network access:

```sh
TLS_HOST=example.com K6_AUTO_EXTENSION_RESOLUTION=false \
  $K6_EXT_BIN run --iterations 1 \
  verification/k6-text-encoding-examples/examples/javascript-api/k6-x-tcp/index-example-2.js
```
