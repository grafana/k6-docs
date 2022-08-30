---
title: 'Save, share, and delete tests'
head_title: 'Save, share, delete tests'
excerpt: 'Different ways to manage test data for further analysis'
slug: '/cloud/analyzing-results/test-results-menu'
---

After you analyze your test, you might want to mark it for further analysis.

To do this, you have a few options:
- Save the test, keeping it beyond normal data retention periods.
- Make notes on the test, preserving contextual details.
- Export it to another format, so you can query it with the program of your choice.
- Make a shareable link, so you can show the results to others.
- Delete irrelevant tests, de-cluttering your UI.

To do any of these actions, use the vertical-dots icon to open the *Test Result menu*.

![Test Results Menu](./images/08-Test-Results-Menu/test-results-menu.png)

## Save a test result

Besides [saving a test as a baseline](./test-comparison), you can also save a test to persist its data.


<Blockquote mod="info"
title="Each premium k6 Cloud subscription can save some number of test results indefinitely.">

Your subscription level determines how many tests you can save.

</Blockquote>



To save a test run, follow these steps:
1. Use the three-dot icon in the top-right corner of your test run.
2. Select **Save test result**.

After you save a test, k6 adds the test to one of the available slots.

If you need to open up a slot for a new test to save, you can remove an old test.
To remove a test, follow these steps:

1. On the side menu, head to **Manage > Saved tests**.
2. Select the test to unsave.
3. Select the three-dot icon, then **Remove safe status**.

Unlike setting a baseline, saved tests can have more than one test run.

![Save test result](./images/08-Test-Results-Menu/k6-save-test-result.png)

## Create a note

The **Create Note** option launches a modal window with a text box.

You can write comments about the test, mark changes, or add any context worth noting.

![Test Note](./images/08-Test-Results-Menu/test-note.png)

## Generate a PDF summary

Generates an executive summary of the test's most relevant metrics and performance data.

Refer to [Export Results](/cloud/analyzing-results/result-export#generate-pdf-report).

## Export data

Starts a data export.

Refer to [Export results](/cloud/analyzing-results/result-export#export-as-csv).

## Share test results

Generates a URL that you can use to share test results.

**Users don't need to authenticate to view a shared test URL**.
If you want to share sensitive results, consider adding users as
[Members](/cloud/project-and-team-management/members) instead.

![Test Sharing](./images/08-Test-Results-Menu/test-share.png)

## Delete test results

<Blockquote mod="warning">

Test deletion is **irreversible**.

</Blockquote>

Deletes the current test result.

