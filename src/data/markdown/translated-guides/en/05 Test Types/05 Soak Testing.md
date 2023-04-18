---
title: 'Soak testing'
head_title: 'What is Soak Testing? How to create a Soak Test in k6'
excerpt: 'A Soak Test is a type of Performance Test that tells you about the reliability and performance of your system over an extended period of time. Let’s see an example.'
---

Soak testing is another variation of the Average-Load test. It focuses on extended periods, analyzing the following: 

* The system's degradation of performance and resource consumption over extended periods.
* The system's availability and stability during extended periods.

In some testing conversation, a soak test might be called Endurance testing, Constant High load, Stamina tests, etc.

The soak test differs from an average load test in the load duration. In a soak test, the peak load duration (usually an average amount) extends several hours and even days.
Though duration is considerably longer, the ramp-up and ramp-down periods of a soak test are the same as an average-load test.

![Overview of a soak test](images/chart-soak-test-overview.png)

## When to perform a Soak test

Most systems must stay turned on and keep working for days, weeks, and months without intervention. This test verifies the system stability and reliability over extended periods of use. 

This test type checks for common performance defects that show only after extended use.. Those problems include response time degradation, memory/resource leaks, data saturation, storage depletion, etc.


## Considerations

* Configure the duration of a Soak test to be considerably longer than any other test. Some typical values are 3, 4, 8, 12, 24, and 48 to 72 hours.
* Often you can reuse the Average-Load test, changing only the peak duration to the abovementioned values.
* Do not try a soak test before running Smoke and Average-Load tests, as each uncovers different types of problems. Running this first may cause confusion and resource waste.
* Since we are checking for system degradation in this test type, monitoring the backend's resources and code efficiency is highly recommended. Other tests may be able to get away without, but this one is crucial.


## Soak testing in k6

The Soak test is almost the same as the Average-Load test. It only increases the duration of the load plateau. 

It gradually increases the load until it reaches an average number of users or throughput. Then it keeps that load for a considerably longer time. Finally, depending on the test case, it is stopped or ramped down gradually.

Check the key configurations in the options section:

Notice that as in an average-load test, peak load plateaus at 100. VUs. But in this test, the peak amount is kept for 8 hours instead of just a few minutes like the previous tests.

![The shape of the soak test as configured in the preceding script](images/chart-soak-test-k6-script-example.png)

## Results analysis

If we execute this test after the previous types, we should have a system performing well under previous scenarios. In this test, monitor forr changes in any performance metric as time passes. Try to correlate any impact with backend measurement changes that indicate degradation over time. Such changes can be gradual degradations, as mentioned, and sudden changes (improvements too) in response time and backend hardware resources. Backend resources to check are RAM consumed, CPU, Network, and growth of cloud resources, among others.

The expected outcome is that the performance and resource utilization of the backend stays stable or within expected variations.

After you run all the previous test types, you know your system performs well at tiny loads, average usage, higher usage, and being used for extended periods.

