/* eslint-disable max-len */
export const localizedMessages = {
  en: {
    'read-more': 'Read more',
    'suggest-edits': 'suggest edits',
    'welcome.quickstart.title': 'Quickstart',
    'welcome.quickstart.installation.title': 'Installation',
    'welcome.quickstart.installation.text':
      'Get up and running in no-time, using either a package manager, standalone installer or the official docker image.',
    'welcome.quickstart.running-k6.title': 'Running k6',
    'welcome.quickstart.running-k6.text':
      'Write and execute your first load test locally using javascript and the k6 api, adding multiple virtual users, checks and ramping stages',
    'welcome.quickstart.results-output.title': 'Results Output',
    'welcome.quickstart.results-output.text':
      'Learn how to leverage the results output to gain actionable insight about your applications performance.',
    'welcome.what-is.title': 'What is k6?',
    'welcome.what-is.description1': `k6 is a developer-centric, free and open-source load testing tool built
    for making performance testing a productive and enjoyable experience.`,
    'welcome.what-is.description2': `Using k6, you'll be able to catch performance regression and
    problems earlier, allowing you to build resilient systems and robust
    applications.`,
    'welcome.features.title': 'Key features',
    'welcome.features.description':
      'k6 is packed with features, which you can learn all about in the documentation. Key features include:',
    'welcome.features.cli-tool': 'CLI tool with developer-friendly APIs.',
    'welcome.features.scripting':
      'Scripting in JavaScript ES2015/ES6 - with support for',
    'welcome.features.modules': 'local and remote modules',
    'welcome.features.checks': 'Checks',
    'welcome.features.and': 'and',
    'welcome.features.thresholds': 'Thresholds',
    'welcome.features.testing':
      '- for goal-oriented, automation-friendly load testing',
    'welcome.use-cases.title': 'Use cases',
    'welcome.use-cases.description': `k6 users are typically Developers, QA Engineers, and DevOps. They use k6
      for testing the performance of APIs, microservices, and websites. Common
      k6 use cases are:`,
    'welcome.use-cases.load-testing.title': 'Load testing',
    'welcome.use-cases.load-testing.description1':
      'k6 is optimized for minimal consumption of system resources. It’s a high-performance tool designed for running tests with high load',
    'welcome.use-cases.load-testing.description2':
      'in pre-production and QA environments.',
    'welcome.use-cases.performance-monitoring.title': 'Performance monitoring',
    'welcome.use-cases.performance-monitoring.description1':
      'k6 provides great primitives for',
    'welcome.use-cases.performance-monitoring.testing-automation':
      'performance testing automation',
    'welcome.use-cases.performance-monitoring.description2':
      'You could run tests with a small amount of load to continuously monitor the performance of your production environment.',
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
    'welcome.k6-does-not.browser.title': 'Does not run in a browser',
    'welcome.k6-does-not.browser.description': `As a result, k6 does not render webpages the same way a browser
    does. This also means that libraries relying on browser APIs
    won't be compatible. By skipping the browser, the consumption
    of system resources are dramatically decreased, making the tool
    significantly more performant.`,
    'welcome.k6-does-not.browser.testing.text': 'k6 can still be used for',
    'welcome.k6-does-not.browser.testing.link': 'load testing websites',
    'welcome.k6-does-not.browser.recorded-session.text':
      'You can even run a test from a',
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
    'read-more': 'Lee mas',
    'suggest-edits': 'Sugerir ediciones',
    'welcome.quickstart.title': 'Guía rápida ',
    'welcome.quickstart.installation.title': 'Instalación',
    'welcome.quickstart.installation.text':
      'Ponlo en marcha en un abrir y cerrar de ojos, utilizando un gestor de paquetes, un instalador autónomo o con la imagen del docker oficial.',
    'welcome.quickstart.running-k6.title': 'Ejecutando k6',
    'welcome.quickstart.running-k6.text':
      'Escriba y ejecute su primera prueba de carga localmente usando javascript y la api de k6, añadiendo múltiples usuarios virtuales, Checks y tipos de carga.',
    'welcome.quickstart.results-output.title': 'Resultados',
    'welcome.quickstart.results-output.text':
      'Aprende a aprovechar los resultados para obtener información práctica sobre el rendimiento de sus aplicaciones.',
    'welcome.what-is.title': '¿Qué es k6?',
    'welcome.what-is.description1': `k6 es una herramienta de pruebas de carga centrada en el desarrollador, gratuita y de código abierto, creada para hacer de las pruebas de rendimiento una experiencia productiva y agradable.`,
    'welcome.what-is.description2': `Con k6, podrá detectar problemas de rendimiento en una etapa temprana, lo que le permitirá crear sistemas resistentes y aplicaciones robustas.`,
    'welcome.features.title': 'Características principales',
    'welcome.features.description':
      'k6 está compuesto de varias funcionalidades, que puede conocer en la documentación. Las principales características son las siguientes:',
    'welcome.features.cli-tool':
      'Herramienta CLI con APIs amigables para el desarrollador.',
    'welcome.features.scripting':
      'Scripting en JavaScript ES2015/ES6, con soporte para módulos locales y remotos.',
    'welcome.features.modules': 'Modulos locales and remotos',
    'welcome.features.checks': 'Checks',
    'welcome.features.and': 'y',
    'welcome.features.thresholds': 'Thresholds',
    'welcome.features.testing':
      '-  para pruebas de carga orientadas en los objetivos y de fácil automatización.',
    'welcome.use-cases.title': 'Casos de uso',
    'welcome.use-cases.description': `Los usuarios de k6 suelen ser desarrolladores, ingenieros de control de calidad y DevOps. Ellos utilizan k6 para probar el rendimiento de las APIs, los microservicios y los sitios web. Los casos de uso más comunes de k6 son:`,
    'welcome.use-cases.load-testing.title': 'Pruebas de carga',
    'welcome.use-cases.load-testing.description1':
      'k6 está optimizado para un consumo mínimo de recursos del sistema. Es una herramienta de alto rendimiento diseñada para ejecutar pruebas con alta carga (spike, stress, soak tests) en entornos',
    'welcome.use-cases.load-testing.description2':
      'en entornos de preproducción y QA.',
    'welcome.use-cases.performance-monitoring.title':
      'Monitoreo del rendimiento',
    'welcome.use-cases.performance-monitoring.description1':
      'k6 proporciona varios elementos para la',
    'welcome.use-cases.performance-monitoring.testing-automation':
      'automatización de pruebas de rendimiento',
    'welcome.use-cases.performance-monitoring.description2':
      'Puedes ejecutar pruebas con una pequeña cantidad de carga para supervisar continuamente el rendimiento de su entorno de producción.',
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
    'welcome.k6-does-not.browser.title': 'No se ejecuta en un navegador',
    'welcome.k6-does-not.browser.description': `Como resultado, k6 no renderiza las páginas web de la misma manera que lo hace un navegador. Esto también significa que las bibliotecas que dependen de las APIs del navegador no serán compatibles. Al omitir el navegador, el consumo de recursos del sistema se reduce drásticamente, lo que hace que la herramienta tenga un rendimiento significativamente mayor.`,
    'welcome.k6-does-not.browser.testing.text':
      'k6 puede seguir utilizándose para',
    'welcome.k6-does-not.browser.testing.link':
      'realizar pruebas de carga de sitios web',
    'welcome.k6-does-not.browser.recorded-session.text':
      'Incluso puede ejecutar una prueba desde',
    'welcome.k6-does-not.browser.recorded-session.link':
      'una sesión de usuario grabada',
    'welcome.k6-does-not.nodejs.title': 'No se ejecuta en NodeJS',
    'welcome.k6-does-not.nodejs.description': `Por lo general, JavaScript no es adecuado para obtener un alto rendimiento. Para lograr el máximo rendimiento, la herramienta en sí está escrita en Go, incorporando un tiempo de ejecución de JavaScript que permite un fácil scripting de pruebas.`,
    'welcome.k6-does-not.nodejs.import.text1':
      'Si quieres importar módulos npm o librerías usando las APIs de NodeJS, puedes',
    'welcome.k6-does-not.nodejs.import.link':
      'empaquetar módulos npm con webpack',
    'welcome.k6-does-not.nodejs.import.text2': 'e importarlos en tus pruebas.',
  },
};
