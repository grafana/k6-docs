'use strict';

const fs = require('fs');
const rawdata = fs.readFileSync('gloss.json');
const words = JSON.parse(rawdata);
const frontmatter = `---
title: Glossary
excerpt: 'Find a list of terms commonly used within the k6 project and what we mean when we use them.'
---\n`;
let list = '';

function makeDoc(words) {
    for (let i = 0; i < words.length; i++) {
        list += `<dt id="${words[i]['term']}"><b> ${words[i]['term']}</b></dt>
    <dd> ${words[i]['definition']} </dd> \n`;
    }
    return `${frontmatter} <dl> ${list} </dl>`;
}

fs.writeFile("glossary.md", makeDoc(words), function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("File saved at glossary.md");
});