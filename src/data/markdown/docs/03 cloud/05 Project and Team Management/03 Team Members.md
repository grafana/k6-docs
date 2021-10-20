---
title: 'Team Members'
excerpt: 'Guide on inviting Team Members to your k6 account for collaboration'
---


> <b>Team Members must specify a `projectID`</b>
> 
> Invited Team Members must specify a `projectID` in `options.ext.loadimpact.projectID` in their test in order to use the subscription of the Organization they have been invited to.

## Background

The Team Member functionality allows you to invite others users to gain access to your Organization and subscription within the k6 web app. This makes it easy to collaborate and share results between key stakeholders across your company.

---

## Adding Team Members

To add Team Members, click "Members" under "Organization Settings" in the drop down menu in the top left corner.

![User Drop Down Menu](images/03-Team-Members/drop-down-menu.png)

---

Next, click "Invite New Members"

![Invite Team Members](images/03-Team-Members/invite-new-members.png)

---

Then, within the modal window, enter their email address and select a role for the user. For the Project Member permission role, users can be specifically assigned to projects. Admins are able to see all projects.

![Invite Modal](images/03-Team-Members/invite-modal.png)

---

## Specify a projectID

<CodeGroup labels={[]}>

```javascript
export const options = {
  // Truncated for brevity
  ext: {
    loadimpact: {
      name: 'My Test Name',
      projectID: 1234567, // Replace with your projectID
      distribution: {
        scenarioLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
        scenarioLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
};
```

</CodeGroup>
