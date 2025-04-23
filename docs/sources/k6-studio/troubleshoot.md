---
title: 'Troubleshoot'
description: 'Common issues with k6 Studio and how to fix them'
weight: 600
---

# Troubleshoot

This section details common issues with k6 Studio and how to fix them.

## `localhost` requests are not being recorded

The proxy doesn't capture traffic when sent directly to `localhost`. To fix that, you can assign a hostname to it and make requests through that name. To do that, modify the hosts file on your system. For example, you can add the following line to your hosts file:

```
127.0.0.1 myapp
```

After, if you have an application running on port 8000, you can make requests in your browser at `myapp:8000`, and they'll show up in k6 Studio.

## "Proxy failed to start" error

If you're on a Mac, make sure you're not running the k6 Studio application from the Downloads folder. If that's the case, close the app, move the application file to the Applications folder, and start the app again.

## "502 Bad Gateway" error

k6 Studio is unable to establish a connection with your network if your operating system is configured to use a proxy. In this case, additional configuration is needed.

### 1. Check if your network is using a proxy

#### Windows

- Open Settings > Network & Internet > Proxy
- Check if "Automatic proxy setup" or "Manual proxy setup" are enabled

#### macOS

- Open System Settings > Network
- Select your active network interface (e.g., Wi-Fi), then click Details
- Go to the Proxies tab
- Check if any proxies are enabled (HTTP, HTTPS, etc.)

#### Linux

- Open Settings > Network > Network Proxy
- Check if the proxy is set to "Manual"

### 2. Configure k6 Studio to connect to your proxy

Once you've confirmed that your system is configured to use a proxy, configure k6 Studio:

- Open Settings > Proxy
- Change "Proxy mode" to "upstream"
- In "Server URL", use the same proxy and port being used by your system

Some proxies or HTTPS sites may require a certificate to establish a trusted connection. In this case, specify the certificate in the "Certificate path" field.

## Application logs

The application logs are saved in the following directory:

- On macOS: `~/Library/Logs/k6 Studio/k6-studio.log`.
- On Windows: `%USERPROFILE%\AppData\Roaming\k6 Studio\logs\k6-studio.log`.
- On Linux: `~/.config/k6 Studio/logs/k6-studio.log`.

If have any issues with k6 Studio, include a tail of your log file when [opening an issue on GitHub](https://github.com/grafana/k6-studio).
