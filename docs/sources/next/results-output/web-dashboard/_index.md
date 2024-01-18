---
title: Web Dashboard
excerpt: With the web-dashboard, you can track test results in real-time, and generate HTML test reports directly from your web browser.
weight: 200
---

# Web dashboard

k6 provides a built-in web dashboard running on the user's machine and enabling them to monitor their test results in real-time.

## Real-time test results

![Web dashboard screenshot](/media/docs/k6-oss/web-dashboard-overview.png)

The dashboard provides a real-time overview of the performance observed by k6 while a test is running, and helps to identify potential reliability issues as they occur.

## HTML test reports

The dashboard enables to generate detailed, downloadable HTML reports directly from the dashboard. These reports are self-contained, making them ideal for sharing with your team.

![HTML test report screenshot](/media/docs/k6-oss/web-dashboard-report.png)

The HTML test report can be accessed from the dashboard's menu, by clicking on the "Report" button.

![HTML test report generation button](/media/docs/k6-oss/web-dashboard-report-button.png)

## How to use

The web dashboard is a built-in feature of k6, and can be enabled by setting the `K6_WEB_DASHBOARD` environement variable to `true`. When used, the k6 run command will provide a link to the web dashboard in the terminal output:

```shell
K6_WEB_DASHBOARD=true ./k6 run ../extensions/xk6-dashboard/script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: ../extensions/xk6-dashboard/script.js
 web dashboard: http://127.0.0.1:5665
        output: -
```

By default, when active, the web dashboard is exposed on localhost port `5665`. You can however configure.

## Dashboard options

The web dashboard can be configured using environment variables:

| Environment variable               | Description                                   | Default value |
| ---------------------------------- | --------------------------------------------- | ------------- |
| `K6_WEB_DASHBOARD`                 | Enable the web dashboard                      | `false`       |
| `K6_WEB_DASHBOARD_HOST`            | Host to bind the web dashboard to             | `localhost`   |
| `K6_WEB_DASHBOARD_PORT`            | Port to bind the web dashboard to             | `5665`        |
| `K6_WEB_DASHBOARD_PERIOD`          | Period in seconds to update the web dashboard | `10s`         |
| `K6_WEB_DASHBOARD_OPEN`            | Open the web dashboard in the default browser | `false`       |
| `K6_WEB_DASHBOARD_REPORT_FILENAME` | Filename to export the HTML test report to    | `report.html` |
