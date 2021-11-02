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
    description: 'Load-test Apache Kafka. Includes support for Avro messages',
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
    description: 'Create notifications',
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
    description: 'Run chaos experiments 💣',
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
      'Load-test SQL Servers (PostgreSQL, MySQL and SQLite3 for now)',
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
    description: 'Redis',
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
    description: 'Say hello',
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
    description: 'Distributed tracing',
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
    description: 'ZeroMQ',
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
    description: 'Query Datadog metrics',
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
    description: 'Run external commands',
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
    description: 'Interpret Go code',
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
    description: 'Produce to an SQS queue',
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
    description: 'Write files',
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
    description: 'Add support for WAMP protocol',
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
    description: 'mqtt extension',
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
    description: 'Share key-value data between VUs',
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
    description: 'Parse and normalize URLs',
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
    description: 'Interact with Kubernetes clusters',
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
    description: 'Test Prometheus Remote Write performance',
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
    description: 'A k6 extension output to influxdb',
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
    description: 'Google PubSub',
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
    description: 'Comfortably parse CSV values in tests',
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
    description: 'Share and increment a counter between VUs',
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
    description: 'Docker',
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
    description: 'SSH',
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
    description: 'Encode and decode YAML values',
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
    description: 'Encode and decode TOML values',
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
    description: 'Parse CSV values',
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
    description: 'Encrypt and decrypt Ansible Vault',
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
    description: 'AMQP plugin, tested with RabbitMQ',
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
    description: 'Use extended crypto functions',
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
    description: 'Javascript Object Signing and Encryption (JOSE) standards',
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
    description: 'Prometheus HTTP exporter',
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
      'Enable vendoring remote HTTP modules to a single source-control-friendly file',
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
    description: 'Mock HTTP(S) servers',
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
    description: 'Load env vars from a .env file',
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
    description: 'Generate random fake data',
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
    description: 'Create a web-based metrics dashboard',
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
    description: 'Test Action Cable and AnyCable functionality',
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
    description: 'Export k6 results in real-time to Kafka',
    url: 'https://github.com/grafana/xk6-output-kafka',
    logo: '',
    author: {
      name: 'Mihail Stoykov',
      url: 'https://github.com/MStoykov',
    },
    official: false,
    categories: ['Reporting'],
  },
  {
    name: 'xk6-output-timescaledb',
    description: 'Export k6 results to TimescaleDB',
    url: 'https://github.com/grafana/xk6-output-timescaledb',
    logo: '',
    author: {
      name: '',
      url: '',
    },
    official: false,
    categories: ['Reporting'],
  },
];

export default extensions;
