/* eslint-disable max-len */
export const localizedMessages = {
  en: {
    'read-more': 'Read more',
    'suggest-edits': 'suggest edits',
    'welcome.quickstart.title': 'Get started',
    'welcome.quickstart.installation.title': 'Installation',
    'welcome.quickstart.installation.text':
      'Get up and running in no-time, using either a package manager, standalone installer or the official Docker image.',
    'welcome.quickstart.running-k6.title': 'Running k6',
    'welcome.quickstart.running-k6.text':
      'Write and execute your first load test locally using JavaScript and the k6 API, adding multiple virtual users, checks and ramping stages.',
    'welcome.quickstart.results-output.title': 'Results Output',
    'welcome.quickstart.results-output.text':
      "Learn how to leverage the results output to gain actionable insight about your application's performance.",
    'welcome.what-is.title': 'What is k6?',
    'welcome.what-is.description1': `Grafana k6 is an open-source load testing tool that makes performance testing easy and productive for engineering teams. k6 is free, developer-centric, and extensible.`,
    'welcome.what-is.description2': `Using k6, you can test the reliability and performance of your systems and catch performance regressions and problems earlier. k6 will help you to build resilient and performant applications that scale.`,
    'welcome.what-is.description3': `k6 is developed by `,
    'welcome.what-is.description4': `Grafana Labs`,
    'welcome.what-is.description5': ` and the community.`,
    'welcome.features.title': 'Key features',
    'welcome.features.description':
      'k6 is packed with features, which you can learn all about in the documentation. Key features include:',
    'welcome.features.cli-tool': 'CLI tool',
    'welcome.features.cli-tool.dev-friendly-apis':
      'with developer-friendly APIs.',
    'welcome.features.scripting':
      'Scripting in JavaScript ES2015/ES6 - with support for',
    'welcome.features.modules': 'local and remote modules',
    'welcome.features.checks': 'Checks',
    'welcome.features.and': 'and',
    'welcome.features.thresholds': 'Thresholds',
    'welcome.features.testing':
      '- for goal-oriented, automation-friendly load testing',
    'welcome.use-cases.title': 'Use cases',
    'welcome.use-cases.description': `k6 users are typically Developers, QA Engineers, SDETs, and SREs. They use k6
      for testing the performance and reliability of APIs, microservices, and websites. Common
      k6 use cases are:`,
    'welcome.use-cases.load-testing.title': 'Load testing',
    'welcome.use-cases.load-testing.description1':
      'k6 is optimized for minimal resource consumption and designed for running high load tests',
    'welcome.use-cases.load-testing.description2': '.',
    'welcome.use-cases.performance-monitoring.title':
      'Performance and synthetic monitoring',
    'welcome.use-cases.performance-monitoring.description':
      'With k6, you can automate and schedule to trigger tests very frequently with a small load to continuously validate the performance and availability of your production environment.',
    'welcome.use-cases.chaos-testing.title': 'Chaos and resilience testing',
    'welcome.use-cases.chaos-testing.description':
      'You can use k6 to simulate traffic as part of your chaos experiments, trigger them from your k6 tests or inject different types of faults in Kubernetes with ',
    'welcome.use-cases.browser-testing.title': 'Browser testing',
    'welcome.use-cases.browser-testing.pre-description': 'Through ',
    'welcome.use-cases.browser-testing.description':
      ', you can run browser-based performance testing and catch issues related to browsers only which can be skipped entirely from the protocol level.',
    'welcome.manifesto.title': 'Load Testing Manifesto',
    'welcome.manifesto.description': `Our load testing manifesto is the result of having spent years hip deep in
    the trenches, doing performance- and load testing. We’ve created it to be
    used as guidance, helping you in getting your performance testing on the
    right track!`,
    'welcome.manifesto.bullet1': 'Simple testing is better than no testing',
    'welcome.manifesto.bullet2': 'Load testing should be goal oriented',
    'welcome.manifesto.bullet3': 'Load testing by developers',
    'welcome.manifesto.bullet4': 'Developer experience is super important',
    'welcome.manifesto.bullet5': 'Load test in a pre-production environment',
    'welcome.k6-does-not.title': 'What k6 does not',
    'welcome.k6-does-not.description': `k6 is a high-performing load testing tool, scriptable in JavaScript. The
    architectural design to have these capabilities brings some trade-offs:`,
    'welcome.k6-does-not.browser.title': 'Does not run natively in a browser',
    'welcome.k6-does-not.browser.description': `By default, k6 does not render web pages the same way a browser does. Browsers can consume significant system resources. Skipping the browser allows running more load within a single machine.`,
    'welcome.k6-does-not.browser.testing.text': 'However, with',
    'welcome.k6-does-not.browser.testing.link': 'k6 browser',
    'welcome.k6-does-not.browser.testing.text2':
      'you can interact with real browsers and collect frontend metrics as part of your k6 tests',
    'welcome.k6-does-not.browser.recorded-session.link':
      'recorded user session',
    'welcome.k6-does-not.nodejs.title': 'Does not run in NodeJS',
    'welcome.k6-does-not.nodejs.description': `JavaScript is not generally well suited for high performance. To
    achieve maximum performance, the tool itself is written in Go,
    embedding a JavaScript runtime allowing for easy test scripting.`,
    'welcome.k6-does-not.nodejs.import.text1':
      'If you want to import npm modules or libraries using NodeJS APIs, you can',
    'welcome.k6-does-not.nodejs.import.link': 'bundle npm modules with webpack',
    'welcome.k6-does-not.nodejs.import.text2': 'and import them in your tests.',
  },
  es: {
    'read-more': 'Leer más',
    'suggest-edits': 'Sugerir ediciones',
    'welcome.quickstart.title': 'Empezar',
    'welcome.quickstart.installation.title': 'Instalación',
    'welcome.quickstart.installation.text':
      'Pónlo en marcha en un abrir y cerrar de ojos, utilizando un gestor de paquetes, un instalador autónomo o con la imagen oficial de Docker.',
    'welcome.quickstart.running-k6.title': 'Ejecutando k6',
    'welcome.quickstart.running-k6.text':
      'Escriba y ejecute su primera prueba de carga localmente usando JavaScript y la API de k6, añadiendo múltiples usuarios virtuales, checks y tipos de carga.',
    'welcome.quickstart.results-output.title': 'Resultados',
    'welcome.quickstart.results-output.text':
      'Aprende a utilizar los resultados para obtener información práctica sobre el rendimiento de sus aplicaciones.',
    'welcome.what-is.title': '¿Qué es k6?',
    'welcome.what-is.description1': `Grafana k6 es una herramienta de pruebas de carga de código libre que hace fácil a equipos de software testear el rendimiento de sus aplicaciones.`,
    'welcome.what-is.description2': `Con k6, puedes testear la fiabilidad y rendimiento de aplicaciones e identificar regresiones y errores más tempranamente. k6 te ayudará a construir aplicaciones rápidas y robustas que puedan escalar.`,
    'welcome.what-is.description3': `k6 es desarrollado por `,
    'welcome.what-is.description4': `Grafana Labs`,
    'welcome.what-is.description5': ` y la comunidad.`,
    'welcome.features.title': 'Características principales',
    'welcome.features.description':
      'k6 está compuesto de varias funcionalidades, que puede conocer en la documentación. Las principales características son las siguientes:',
    'welcome.features.cli-tool': 'Herramienta CLI',
    'welcome.features.cli-tool.dev-friendly-apis':
      'con APIs amigables para el desarrollador.',
    'welcome.features.scripting':
      'Scripting en JavaScript ES2015/ES6, con soporte para módulos locales y remotos.',
    'welcome.features.modules': 'Módulos locales and remotos',
    'welcome.features.checks': 'Checks',
    'welcome.features.and': 'y',
    'welcome.features.thresholds': 'Thresholds',
    'welcome.features.testing':
      '-  para pruebas de carga orientadas a objetivos y de fácil automatización.',
    'welcome.use-cases.title': 'Casos de uso',
    'welcome.use-cases.description': `Los usuarios de k6 suelen ser desarrolladores, ingenieros de control de calidad y DevOps. Ellos utilizan k6 para probar el rendimiento de las APIs, los microservicios y los sitios web. Los casos de uso más comunes de k6 son:`,
    'welcome.use-cases.load-testing.title': 'Pruebas de carga',
    'welcome.use-cases.load-testing.description1':
      'k6 está optimizado para un consumo mínimo de recursos del sistema y diseñado para ejecutar pruebas con alta carga',
    'welcome.use-cases.load-testing.description2': '.',
    'welcome.use-cases.performance-monitoring.title':
      'Monitoreo del rendimiento',
    'welcome.use-cases.performance-monitoring.description':
      'Con k6, puede automatizar la ejecución de tests frequentemente con una pequeña cantidad de carga para supervisar continuamente el rendimiento y disponibilidad de su entorno de producción.',
    'welcome.use-cases.chaos-testing.title': 'Pruebas de chaos',
    'welcome.use-cases.chaos-testing.description':
      'Puede utilizar k6 para simular tráfico como parte de sus experimentos de chaos, lanzarlos desde el script de k6 o injectar fallos en Kubernetes con ',
    'welcome.use-cases.browser-testing.title': 'Browser testing',
    'welcome.use-cases.browser-testing.pre-description': 'Con ',
    'welcome.use-cases.browser-testing.description':
      ', puedes interactuar con el navegador para validar la interfaz web o rendimiento. Ejecuta browser tests juntos o separados de otros tests de carga.',
    'welcome.manifesto.title': 'Manifiesto',

    'welcome.manifesto.description': `Nuestro manifiesto es el resultado de muchos años de trabajo haciendo pruebas de rendimiento y de carga. Lo hemos creado para ser usado como una guía de cómo hacer pruebas de rendimiento.`,
    'welcome.manifesto.bullet1': 'Una prueba sencilla es mejor que no hacerla',
    'welcome.manifesto.bullet2':
      'Las pruebas de carga deben estar orientadas a los objetivos',
    'welcome.manifesto.bullet3':
      'Pruebas de carga realizadas por los desarrolladores',
    'welcome.manifesto.bullet4':
      'La experiencia de los desarrolladores es muy importante',
    'welcome.manifesto.bullet5':
      'Pruebas de carga en un entorno de pre-producción',
    'welcome.k6-does-not.title': '¿Qué no hace k6?',
    'welcome.k6-does-not.description':
      'k6 es una herramienta de pruebas de carga de alto rendimiento, que se puede programar en JavaScript. El diseño de la arquitectura para tener estas capacidades trae algunas compensaciones:',
    'welcome.k6-does-not.browser.title':
      'No ejecuta nativamente en un navegador',
    'welcome.k6-does-not.browser.description': `Por defecto, k6 no renderiza las páginas web de la misma manera que lo hace un navegado. Los navegadores pueden consumir muchos recursos del sistema. No usando el navegador, nos permite ejecutar tests de más carga en una misma máquina.`,
    'welcome.k6-does-not.browser.testing.text': 'Sin embargo, con',
    'welcome.k6-does-not.browser.testing.link': 'k6 browser',
    'welcome.k6-does-not.browser.testing.text2':
      'puedes interactuar con navegadores reales y monitorizar métricas del frontend en tus tests de k6',
    'welcome.k6-does-not.nodejs.title': 'No se ejecuta en NodeJS',
    'welcome.k6-does-not.nodejs.description': `Por lo general, JavaScript no es adecuado para obtener un alto rendimiento. Para lograr el máximo rendimiento, la herramienta en sí está escrita en Go, incorporando un tiempo de ejecución de JavaScript que permite un fácil scripting de pruebas.`,
    'welcome.k6-does-not.nodejs.import.text1':
      'Si quieres importar módulos npm o librerías usando las APIs de NodeJS, puedes',
    'welcome.k6-does-not.nodejs.import.link':
      'empaquetar módulos npm con webpack',
    'welcome.k6-does-not.nodejs.import.text2': 'e importarlos en tus pruebas.',
  },
};
