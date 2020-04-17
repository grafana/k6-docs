---
title: 'Converters'
redirect: 'https://k6.io/docs/integrations#converters'
---
<!---
---
title: 'Converters'
excerpt: 'Use the k6 converters to turn your existing Postman collection, swagger file, or jmx files into the foundation of your next test'
---

## Background

As a company, k6 maintains a variety of tools to convert what you already have into a working test script.

## HAR to k6

The har-to-k6 converter allows you to take an existing HAR file and convert it to a working script.
For more information and instructions, please visit our [har-to-k6 repository](https://github.com/loadimpact/har-to-k6)

## Postman to k6

The postman-to-k6 converter allows you to convert an existing Postman collection to a k6 script with some exceptions.
Currently supported features include:

- Prerequest scripts
- Test scripts
- Variables (at all scopes + dynamic)
- Data files
- Authentication methods (except Hawk)
- File uploads
- and more

For more information and instructions, please visit our [postman-to-k6 repository](https://github.com/loadimpact/postman-to-k6)

## Jmeter/JMX to k6

The jmeter-to-k6 converter allows you to convert `.jmx` files into a k6 script. Note that not all `.jmx` files are supported. Most major components that have equivalents in k6 are supported. _Some_ examples include:

- Stepping Group Thread and Thread Group: convert into `options.stages`
- setUp thread Group: converts into an `export function setup()`
- tearDown Thread Group: converts to an `export function teardown()`
- CSV Data Set: converts into an `open()` statement
- ForEach Controller: converts to a JS for-loop in k6
- Random Controller: converts to a JS switch statement selecting a case at random
- Constant Timer: converts into a sleep(timeInSecs) statement
- and more

For more information, please visit our [jmeter-to-k6 repository](https://github.com/loadimpact/jmeter-to-k6)

## Swagger file to k6

Coming soon.
-->
