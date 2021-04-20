import { Code } from 'components/shared/code';
import { ExtensionCard } from 'components/shared/extension-card';
import React, { useState } from 'react';

import styles from './extension-selection.module.scss';

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

export const ExtensionSelection = () => {
  const { extensions } = data;
  const [selected, setSelected] = useState(
    Array(extensions.length).fill(false),
  );

  const handleCheckboxClick = (index) => {
    const newSelected = [...selected];
    newSelected[index] = !selected[index];
    setSelected(newSelected);
  };

  // TODO: always use most recent k6 version
  let code = '$ xk6 build v0.31.0';
  extensions.forEach((extension, index) => {
    if (selected[index]) {
      code += ` --with ${extension.url.replace('https://', '')}`;
    }
  });

  return (
    <section className={`container ${styles.container}`}>
      <div className={styles.code}>
        <Code>
          <span>{code}</span>
        </Code>
      </div>
      <div className={styles.list}>
        {extensions.map((extension, index) => (
          <ExtensionCard
            key={extension.name}
            extension={extension}
            isChecked={selected[index]}
            onCheckboxClick={() => handleCheckboxClick(index)}
            hasCheckbox
          />
        ))}
      </div>
    </section>
  );
};
