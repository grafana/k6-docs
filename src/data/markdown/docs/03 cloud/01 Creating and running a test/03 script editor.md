---
title: 'Script editor'
excerpt: 'How to use the script editor in k6 Cloud'
---

With the *script editor*, you can quickly write test scripts from within the web app.

While most users run [k6 Cloud on the CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/)
with their IDE of choice, organizational security rules vary from organization to organization.
Some users can't install applications without a review from their security team.

Fortunately, the script editor supports almost all features of k6, no local machine required.


<Blockquote mod="warning">

#### Limitations of the script editor

The script editor can access all built-in k6 modules and remote modules available via the web.
However, If you need to import a custom library or file for parameterization, you
must trigger your test using the CLI instead.

</Blockquote>

![k6 Cloud web script editor](./images/script-editor.png)

## A code-aware text editor

The script editor has some built-in features to make it easier to write scripts.


* Built-in examples

  You can use test-script examples to guide and adapt your script.
  To launch a side-by-side window, select any example from the dropdown.
- Validation/error checking

  If you have a syntax error, the editor alerts you and prevents the script from running. Such errors appear in the UI as:

  > `There are validation errors, please fix them in order to run the test`

- Code Folding

  For easier reading, you can fold blocks of code.

  To fold, use the down arrow next to the line numbers.
- Variable highlighting

  When you select a variable, the editor highlights other references to that variable in the script.
 
