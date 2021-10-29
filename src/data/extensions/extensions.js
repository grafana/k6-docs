/* eslint-disable max-len */

/*
    
    Thank you for your interest in contributing an extension to the k6 ecosystem! (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧

    To make the process of getting your extension accepted as fast as possible, make sure
    you fill out all of the fields in the list below (except logo, which is optional).
    
    The list is currently alphabetized, so it
    doesn't matter where in the list you place your entry.

    For an extension to be merged, we require the following:

    1. The readme contains one or more usage examples, showing the basics of how to use the extension.
    2. The repository has the xk6 label
    3. The readme contains Links to any other relevant documentation a user might need.
    
 */
const extensions = [
  {
    name: 'xk6-kafka',
    description: 'Load test Apache Kafka. With support for Avro messages',
    url: 'https://github.com/mostafa/xk6-kafka',
    logo: 'https://github.com/mostafa/xk6-kafka/blob/1259557afd378a5fe236e19c3d09bda401584ee6/assets/kafka-logo.png?raw=true',
    author: {
      name: 'Mostafa Moradian',
      url: 'https://github.com/mostafa',
    },
    official: false,
    categories: ['Messaging'],
  },
  {
    name: 'xk6-notification',
    description: 'A k6 extension for creating notifications.',
    url: 'https://github.com/dgzlopes/xk6-notification',
    logo: 'https://github.com/dgzlopes/xk6-notification/blob/db5504667ff7530ee619c42e5c1037703f603b30/assets/logo.png?raw=true',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Reporting'],
  },
  {
    name: 'xk6-chaos',
    description: 'xk6 extension for running chaos experiments with k6 💣',
    url: 'https://github.com/simskij/xk6-chaos',
    logo: 'https://github.com/simskij/xk6-chaos/blob/064932e0bae64fe94de2f86bf3c41be18fbab1d6/assets/logo.png?raw=true',
    isLogoLarge: true,
    author: {
      name: 'Simon Aronsson',
      url: 'https://github.com/simskij',
    },
    official: false,
    categories: ['Chaos Engineering', 'Containers'],
  },
  {
    name: 'xk6-sql',
    description:
      'k6 extension to Load Test SQL Servers (PostgreSQL, MySQL and SQLite3 for now).',
    url: 'https://github.com/imiric/xk6-sql',
    logo: '',
    author: {
      name: 'Ivan Mirić',
      url: 'https://github.com/imiric',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-redis',
    description: 'A k6 extension for Redis.',
    url: 'https://github.com/dgzlopes/xk6-redis',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-say',
    description: 'A k6 extension to say hello.',
    url: 'https://github.com/dgzlopes/xk6-say',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-distributed-tracing',
    description: 'A k6 extension for distributed tracing.',
    url: 'https://github.com/k6io/xk6-distributed-tracing',
    logo: '',
    author: {
      name: 'k6',
      url: 'https://github.com/k6io',
    },
    official: true,
    categories: ['Observability'],
  },
  {
    name: 'xk6-zmq',
    description: 'A k6 extension for ZeroMQ.',
    url: 'https://github.com/dgzlopes/xk6-zmq',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Messaging'],
  },
  {
    name: 'xk6-datadog',
    description: 'A k6 extension for querying Datadog metrics.',
    url: 'https://github.com/dgzlopes/xk6-datadog',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-exec',
    description: 'A k6 extension for running external commands.',
    url: 'https://github.com/k6io/xk6-exec',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-interpret',
    description: 'A k6 extension for interpreting Go code.',
    url: 'https://github.com/dgzlopes/xk6-interpret',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-sqs',
    description: 'A k6 extension to produce to an SQS queue.',
    url: 'https://github.com/mridehalgh/xk6-sqs',
    logo: '',
    author: {
      name: 'Matthew Ridehalgh',
      url: 'https://github.com/mridehalgh',
    },
    official: false,
    categories: ['Messaging'],
  },
  {
    name: 'xk6-file',
    description: 'k6 extension for writing files.',
    url: 'https://github.com/avitalique/xk6-file',
    logo: '',
    author: {
      name: 'Vitali Asheichyk',
      url: 'https://github.com/avitalique',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-wamp',
    description: 'A k6 extension that adds support for WAMP protocol.',
    url: 'https://github.com/vvarp/xk6-wamp',
    logo: '',
    author: {
      name: 'Maciek Szczesniak',
      url: 'https://github.com/vvarp',
    },
    official: false,
    categories: ['Protocol'],
  },
  {
    name: 'xk6-mqtt',
    description: 'k6 mqtt extension',
    url: 'https://github.com/pmalhaire/xk6-mqtt',
    logo: '',
    author: {
      name: 'pmalhaire',
      url: 'https://github.com/pmalhaire',
    },
    official: false,
    categories: ['Messaging'],
  },
  {
    name: 'xk6-kv',
    description: 'A k6 extension to share key-value data between VUs.',
    url: 'https://github.com/dgzlopes/xk6-kv',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-url',
    description: 'A k6 extension for URL parsing and normalization.',
    url: 'https://github.com/dgzlopes/xk6-url',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-kubernetes',
    description: 'A k6 extension for interacting with Kubernetes clusters',
    url: 'https://github.com/grafana/xk6-kubernetes',
    logo: '',
    author: {
      name: 'Alexey Kuznetsov',
      url: 'https://github.com/lxkuz',
    },
    official: false,
    categories: ['Containers'],
  },
  {
    name: 'xk6-client-prometheus-remote',
    description:
      'A k6 extension for testing the performance of Prometheus Remote Write.',
    url: 'https://github.com/grafana/xk6-client-prometheus-remote',
    logo: '',
    author: {
      name: 'Daniel González',
      url: 'https://github.com/dgzlopes',
    },
    official: false,
    categories: ['Observability'],
  },
  {
    name: 'xk6-influxdbv2',
    description: 'A k6 extension output to influxdb.',
    url: 'https://github.com/li-zhixin/xk6-influxdbv2',
    logo: '',
    author: {
      name: 'li-zhixin',
      url: 'https://github.com/li-zhixin',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-pubsub',
    description: 'A k6 extension for Google PubSub.',
    url: 'https://github.com/olvod/xk6-pubsub',
    logo: '',
    author: {
      name: 'Oleksii Vodotyiets',
      url: 'https://github.com/olvod',
    },
    official: false,
    categories: ['Messaging'],
  },
  {
    name: 'xk6-mllp',
    description: 'Simple MLLP sender for K6',
    url: 'https://github.com/gjergjsheldija/xk6-mllp',
    logo: '',
    author: {
      name: 'Gjergj Sheldija',
      url: 'https://github.com/gjergjsheldija',
    },
    official: false,
    categories: ['Messaging'],
  },
  {
    name: 'xk6-encoding',
    description: 'Enables k6 tests to comfortably parse CSV values.',
    url: 'https://github.com/mstoykov/xk6-encoding',
    logo: '',
    author: {
      name: 'Mihail Stoykov',
      url: 'https://github.com/MStoykov',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-counter',
    description:
      'Implements a singular local counter that goes up. Returns the current value before increasing it.',
    url: 'https://github.com/mstoykov/xk6-counter',
    logo: '',
    author: {
      name: 'Mihail Stoykov',
      url: 'https://github.com/MStoykov',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-docker',
    description: 'A k6 extension for Docker.',
    url: 'https://github.com/k6io/xk6-docker',
    logo: '',
    author: {
      name: 'Alexey Kuznetsov',
      url: 'https://github.com/lxkuz',
    },
    official: false,
    categories: ['Containers'],
  },
  {
    name: 'xk6-ssh',
    description: 'A k6 extension for SSH.',
    url: 'https://github.com/k6io/xk6-ssh',
    logo: '',
    author: {
      name: 'Alexey Kuznetsov',
      url: 'https://github.com/lxkuz',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-yaml',
    description: 'A k6 extension for encode and decode YAML values.',
    url: 'https://github.com/szkiba/xk6-yaml',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-toml',
    description: 'A k6 extension for encode and decode TOML values.',
    url: 'https://github.com/szkiba/xk6-toml',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-csv',
    description: 'A k6 extension for parse CSV values.',
    url: 'https://github.com/szkiba/xk6-csv',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-ansible-vault',
    description: 'A k6 extension for encrypt and decrypt Ansible Valult.',
    url: 'https://github.com/szkiba/xk6-ansible-vault',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-amqp',
    description: 'AMQP xk6 plugin. Tested with RabbitMQ.',
    url: 'https://github.com/grafana/xk6-amqp',
    logo: '',
    author: {
      name: 'Alexey Kuznetsov',
      url: 'https://github.com/lxkuz',
    },
    official: false,
    categories: ['Messaging'],
  },
  {
    name: 'xk6-crypto',
    description: 'A k6 extension for using extended crypto functions.',
    url: 'https://github.com/szkiba/xk6-crypto',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-jose',
    description:
      'A k6 extension for Javascript Object Signing and Encryption (JOSE) standards.',
    url: 'https://github.com/szkiba/xk6-jose',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-prometheus',
    description: 'A k6 output extension implements Prometheus HTTP exporter.',
    url: 'https://github.com/szkiba/xk6-prometheus',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Reporting', 'Observability'],
  },
  {
    name: 'xk6-cache',
    description:
      'A k6 extension that enables vendoring remote HTTP modules to a single source control friendly file.',
    url: 'https://github.com/szkiba/xk6-cache',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-mock',
    description: 'A k6 extension that enables mocking HTTP(S) servers.',
    url: 'https://github.com/szkiba/xk6-mock',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-dotenv',
    description: 'A k6 extension that loads env vars from a .env file.',
    url: 'https://github.com/szkiba/xk6-dotenv',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Misc'],
  },
  {
    name: 'xk6-faker',
    description: 'A k6 extension for random fake data generation.',
    url: 'https://github.com/szkiba/xk6-faker',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Data'],
  },
  {
    name: 'xk6-dashboard',
    description:
      'A k6 extension that enables creating web based metrics dashboard for k6.',
    url: 'https://github.com/szkiba/xk6-dashboard',
    logo: '',
    author: {
      name: 'Iván Szkiba',
      url: 'https://github.com/szkiba',
    },
    official: false,
    categories: ['Reporting', 'Observability'],
  },
  {
    name: 'xk6-cable',
    description:
      'A k6 extension for testing Action Cable and AnyCable functionality.',
    url: 'https://github.com/anycable/xk6-cable',
    logo: '',
    author: {
      name: 'Evil Martians',
      url: 'https://github.com/evilmartians',
    },
    official: false,
    categories: ['Messaging'],
  },
  {
    name: 'xk6-output-kafka',
    description: 'A k6 output extension to export k6 results in real-time to Kafka.',
    url: 'https://github.com/grafana/xk6-output-kafka',
    logo: '',
    author: {
      name: 'Mihail Stoykov',
      url: 'https://github.com/MStoykov',
    },
    official: false,
    categories: ['Reporting'],
  },
];

export default extensions;
