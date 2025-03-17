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

## Application logs

The application logs are saved in the following directory:

- On macOS: `~/Library/Logs/k6 Studio/k6-studio.log`.
- On Windows: `%USERPROFILE%\AppData\Roaming\k6 Studio\logs\k6-studio.log`.
- On Linux: `~/.config/k6 Studio/logs/k6-studio.log`.

If have any issues with k6 Studio, include a tail of your log file when [opening an issue on GitHub](https://github.com/grafana/k6-studio).
