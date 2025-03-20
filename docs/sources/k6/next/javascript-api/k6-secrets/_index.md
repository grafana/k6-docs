---
title: 'k6/secrest'
description: 'k6 secrest API'
weight: 04
---

# k6/secrets

| Property         | Description                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| get([String])    | asynchrounsly get a secret from the default secret source                                           |
| source([String]) | returns a source for the provided name that can than be used to get a secret from a concrete source |

## Example

A simple example where we get a secret by it's name from the default source (if defined).

{{< code >}}

```javascript
import secrets from 'k6/secrets';

export default async () => {
  const my_secret = await secrets.get('my_secret'); // get from 1 secret source if only 1, exception if more than 1 secret source or if no secret sources
  console.log(my_secret);
};
```

{{< /code >}}

We can also get a secret source by its name then get a secret specifically from it.

{{< code >}}

```javascript
import secrets from 'k6/secrets';

export default async () => {
  const my_secret = await secrets.source('identifier').get('my_secret'); // get secret from a source with the provided identifier
  console.log(my_secret);
};
```

{{< /code >}}

In both of those cases the end logs will have `***SECRET_REDACTED***` in place of any secret that has been outputed.

### A full example with multiple secret sources and names

{{< code >}}

```javascript
import secrets from 'k6/secrets';

export default async () => {
  const my_secret = await secrets.get('cool'); // get secret from a source with the provided identifier
  console.log(my_secret == 'cool secret');
  const anothersource = await secrets.source('another');
  console.log((await anothersource.get('cool')) == 'cool secret');
  console.log((await anothersource.get('cool')) == 'not cool secret');
};
```

{{< /code >}}

And if we ran we will see that when we get from the default secret source we get one secret and we get a different one from the not default one. This also shows that the internal parts of the scripts can use the actual value of the script even if it is redacted in the logs.

{{< code >}}

```bash
$ k6 run --secret-source=mock=default,cool="cool secret" --secret-source=mock=name=another,cool="not cool secret" multi-source.test.js
...
INFO[0000] true                                          source=console
INFO[0000] false                                         source=console
INFO[0000] true                                          source=console
```

{{< /code >}}
