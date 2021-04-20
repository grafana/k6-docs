import React from 'react';

import { ExtensionCard } from './extension-card';
import styles from './extensions-list.module.scss';

const data = {
  extensions: [
    {
      name: 'Kafka',
      description: 'Load test Apache Kafka. With support for Avro messages',
      url: 'https://github.com/mostafa/xk6-kafka',
      docs: 'https://xk6kafka.example.org',
      issues: 'https://github.com/mostafa/xk6-kafka/issues',
      logo: 'https://url.for.some/image.jpg',
      author: {
        name: 'Mostafa Moradian',
        url: 'https://github.com/mostafa',
      },
      official: false,
      categories: ['Clients', 'Protocols'],
    },
    {
      name: 'Kafka2',
      description: 'Load test Apache Kafka. With support for Avro messages',
      url: 'https://github.com/mostafa/xk6-kafka',
      docs: 'https://xk6kafka.example.org',
      issues: 'https://github.com/mostafa/xk6-kafka/issues',
      logo: 'https://url.for.some/image.jpg',
      author: {
        name: 'Mostafa Moradian',
        url: 'https://github.com/mostafa',
      },
      official: false,
      categories: ['Clients', 'Protocols'],
    },
    {
      name: 'Kafka3',
      description: 'Load test Apache Kafka. With support for Avro messages',
      url: 'https://github.com/mostafa/xk6-kafka',
      docs: 'https://xk6kafka.example.org',
      issues: 'https://github.com/mostafa/xk6-kafka/issues',
      logo: 'https://url.for.some/image.jpg',
      author: {
        name: 'Mostafa Moradian',
        url: 'https://github.com/mostafa',
      },
      official: false,
      categories: ['Clients', 'Protocols'],
    },
    {
      name: 'Kafka4',
      description: 'Load test Apache Kafka. With support for Avro messages',
      url: 'https://github.com/mostafa/xk6-kafka',
      docs: 'https://xk6kafka.example.org',
      issues: 'https://github.com/mostafa/xk6-kafka/issues',
      logo: 'https://url.for.some/image.jpg',
      author: {
        name: 'Mostafa Moradian',
        url: 'https://github.com/mostafa',
      },
      official: false,
      categories: ['Clients', 'Protocols'],
    },
    {
      name: 'Kafka5',
      description: 'Load test Apache Kafka. With support for Avro messages',
      url: 'https://github.com/mostafa/xk6-kafka',
      docs: 'https://xk6kafka.example.org',
      issues: 'https://github.com/mostafa/xk6-kafka/issues',
      logo: 'https://url.for.some/image.jpg',
      author: {
        name: 'Mostafa Moradian',
        url: 'https://github.com/mostafa',
      },
      official: false,
      categories: ['Clients', 'Protocols'],
    },
    {
      name: 'Kafka6',
      description: 'Load test Apache Kafka. With support for Avro messages',
      url: 'https://github.com/mostafa/xk6-kafka',
      docs: 'https://xk6kafka.example.org',
      issues: 'https://github.com/mostafa/xk6-kafka/issues',
      logo: 'https://url.for.some/image.jpg',
      author: {
        name: 'Mostafa Moradian',
        url: 'https://github.com/mostafa',
      },
      official: false,
      categories: ['Clients', 'Protocols'],
    },
  ],
};

export const ExtensionsList = () => {
  const { extensions } = data;
  return (
    <section className={`container ${styles.container}`}>
      {extensions.map((extension) => (
        <ExtensionCard key={extension.name} extension={extension} />
      ))}
    </section>
  );
};
