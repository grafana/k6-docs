/* eslint-disable max-len */
const defaultDescription =
  'k6 is an open-source load testing tool and cloud service providing the best developer experience for API performance testing.';

export default {
  404: {
    data: {
      title: '404 | k6 Documentation',
      description: defaultDescription,
    },
  },
  'javascript-api': {
    data: {
      title: 'k6 JavaScript API',
      canonicalUrl: 'https://grafana.com/docs/k6/latest/javascript-api/',
      slug: '/javascript-api/',
      description:
        'This page provides the documentation of the k6 JavaScript API.',
    },
  },
  extensions: {
    data: {
      title: 'k6 Extensions',
      canonicalUrl: 'https://grafana.com/docs/k6/latest/extensions/',
      description:
        'The extension ecosystem enables developers and testers to extend k6 to cover use cases not supported natively in the core. Explore the endless possibilities of k6 and xk6.',
    },
  },
  'explore-extensions': {
    data: {
      title: 'k6 Extensions',
      canonicalUrl: 'https://grafana.com/docs/k6/latest/extensions/explore/',
      description:
        'Discover the k6 extensions available to meet your specific needs..',
    },
  },
  'bundle-builder': {
    data: {
      title: 'k6 Bundle Builder',
      canonicalUrl: 'https://grafana.com/docs/k6/latest/extensions/explore/',
      description:
        'Easily create your own bespoke k6 binary with all the extensions you want to run using the bundle builder and xk6.',
    },
  },
  examples: {
    data: {
      title: 'k6 Examples & Tutorials',
      canonicalUrl: 'https://grafana.com/docs/k6/latest/examples/',
      description:
        'The k6 Examples & Tutorials is a directory with common k6 examples and the most popular tutorials using k6.',
    },
  },
  cloud: {
    data: {
      title: 'k6 Cloud Documentation',
      canonicalUrl: 'https://grafana.com/docs/grafana-cloud/k6/',
      description:
        'The k6 Cloud documentation helps you in your usage of the k6 Cloud. The k6 Cloud is the perfect companion to k6 with an aim to bring ease-of-use and convenience to scale your performance testing efforts.',
    },
  },
  guides: {
    data: {
      title: 'k6 Documentation',
      canonicalUrl: 'https://grafana.com/docs/k6/latest/',
      description:
        'The k6 Documentation helps you to use k6 to get your performance testing on the right track. Learn more about load and performance testing. Get started in minutes.',
    },
  },
  guidesES: {
    data: {
      title:
        'Documentación de k6 - Herramienta Open Source de Pruebas de Carga',
      canonicalUrl: 'https://grafana.com/docs/k6/latest/',
      description:
        'La documentación de k6 le ayudará a ejecutar sus pruebas de rendimiento correctamente. Aprenda y comience rápidamente a efectuar sus tests de carga y rendimiento',
    },
  },
  integrations: {
    data: {
      title: 'k6 Integrations',
      canonicalUrl: 'https://grafana.com/docs/k6/latest/misc/integrations/',
      description:
        'The k6 Integrations page lists the most popular k6 integrations. Integrate k6 with CI tools, store results in different services, select different Grafana dashboards, or use converters for the auto-generation of your load test.',
    },
  },
};
