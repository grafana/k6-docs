---
title: 'Page object model'
heading: 'Page object model with k6 browser'
head_title: 'Page object model with k6 browser'
description: 'An example on how to implement page object model design pattern with k6 browser'
weight: 02
---

# Page object model

When working with large test suites, a popular design pattern to improve your code’s maintainability and readability is the [page object model](https://martinfowler.com/bliki/PageObject.html).

A page object commonly represents an HTML page or significant elements/components within a page, such as a header or a footer. It is a form of encapsulation that hides the details of the UI structure from other places, such as your test files. Through page object models, any changes you need to make on a specific page or element within a page are constrained into a single place, resulting in ease of maintenance and avoiding code duplication.

Since k6 browser aims to provide rough compatibility with the Playwright API, you can leverage any existing page objects you have and easily re-use them with your k6 browser tests.

## Implementation

Let's take an example of a website with a booking form added to the homepage. Imagine you want to write a test that checks that a user can fill out the booking form successfully.

To model a page object for the homepage, we've created a page object class called `homepage.js`. Different locators are created inside the constructor so that when the homepage class is instantiated, the page locator elements are ready to be used.

The `homepage.js` class also contains different methods for:

- Navigating to the homepage
- Submitting the form
- Getting the verification message

When locators need to be updated or other specific changes related to the homepage are made, you only need to update the `homepage.js` class.

{{< code >}}

```javascript
import { bookingData } from '../data/booking-data.js';

export class Homepage {
  constructor(page) {
    this.page = page;
    this.nameField = page.locator('[data-testid="ContactName"]');
    this.emailField = page.locator('[data-testid="ContactEmail"]');
    this.phoneField = page.locator('[data-testid="ContactPhone"]');
    this.subjectField = page.locator('[data-testid="ContactSubject"]');
    this.descField = page.locator('[data-testid="ContactDescription"]');
    this.submitButton = page.locator('#submitContact');
    this.verificationMessage = page.locator('.row.contact h2');
  }

  async goto() {
    await this.page.goto('https://myexamplewebsite/');
  }

  async submitForm() {
    const { name, email, phone, subject, description } = bookingData;

    this.nameField.type(name);
    this.emailField.type(email);
    this.phoneField.type(phone);
    this.subjectField.type(subject);
    this.descField.type(description);
    await this.submitButton.click();
  }

  getVerificationMessage() {
    return this.verificationMessage.innerText();
  }
}
```

{{< /code >}}

You can import the `Homepage` class within your test class and invoke the methods you need. This makes the code easier to understand and enforces the separation between your test and business logic.

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';

import { Homepage } from '../pages/homepage.js';
import { bookingData } from '../data/booking-data.js';

export default async function () {
  const page = browser.newPage();

  const { name } = bookingData;

  const homepage = new Homepage(page);
  await homepage.goto();
  await homepage.submitForm();

  expect(homepage.getVerificationMessage()).to.contain(name);

  page.close();
}
```

{{< /code >}}
