---
Title: About VU hours
description: Grafana Cloud k6 charges your subscription by VU hours. Here's how it works.
---

# VU hours

Grafana Cloud k6 subscriptions are based on usage in _Virtual-user hours_ (VU hours, or just VUh).
When you run tests, understanding how VUh are calculated might save you from unexpected usage.

**VUh are deducted for both cloud execution (`k6 cloud`) and cloud streaming (`k6 run --out cloud`)**.

## VUh calculation

VUh is calculated by multiplying two variables:
- The maximum number of VUs that the script uses
- The test duration, **rounded up to the next hour**

If your test ramps up to a maximum of 50 VUs and runs for 25 minutes, then a test run for that script will use 50 VUh.
That is, the VUh that the test uses equals 50 VUs multiplied by 1 hour (25 minutes rounded up).
If you change the test to run for 61 minutes with the same VUs, then the test run will use 100 virtual hours.

If the test uses an arrival-rate executor, k6 multiplies by the number that you pre-allocate, or set as `maxVUs`.
To learn how this works, refer to [Arrival rate VU allocation](https://k6.io/docs/using-k6/scenarios/concepts/arrival-rate-vu-allocation).

## Save VUs by starting locally

To save VU hours, prototype and debug scripts on a local machine.
After you have the correct logic, increase the load and duration to the desired levels, then run the script with `k6 cloud` for managed execution, visualization, and storage.

