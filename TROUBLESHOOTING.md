# Gatsby troubleshooting

![Leonardo DiCaprio as the great Gatsby](https://memegenerator.net/img/images/12595641.jpg)

Gatsby errors can leave something to be desired.
That's the bad news.

The good news is that majority of all local Gatsby issues have the same handful of root causes.
If you can't make Gatsby work on your site, check that your environment and local docs don't any of these conditions.
If there's still an issue, ask for help!
Hopefully, we can find the solution and add it to this list.

## Can't serve the site locally

The site dependencies are usually a little behind the latest versions of node and npm.
If you are using the latest version of node, trying to deploy with this command:

```sh
npm install
```

Can lead to something like this:

```txt
/k6-docs/node_modules/node-gyp-build/index.js:60
  throw new Error('No native build was found for ' + target + '\n    loaded from: ' + dir + '\n')
```

To figure out what versions of node and npm you need, check in `package.json`.
For example:

```sh
head package.json
```

Gives:

```json
{
"name": "k6-docs",
"engines": {
  "node": ">=16.0.0",
  "npm": ">=7.0.0"
},
...
}
```

In this case, you need to use a 16.x version of node.
You can change versions with nvm.

1. Use `nvm ls` to see what versions are available.
1. Install and use what you need:
```sh
nvm ls ## see what versions are available
nvm install 16.16
nvm use 16.16
```
1. Install dependencies and run:
```sh
npm  install && npm start
```


## Serving suddenly broke

Great! You figured out versions and got Gatsby serving on your `localhost`.
Your saving changes, and previewing it live.

What the deuce! The site just stopped serving! Gatsby is talking about some react components and you don't know what it means.
Don't get angry! Try these things:

1. Scroll up in terminal that has your Gatsby server process. Usually Gatsby will print text the offending line.

  If you can't find anything strange, save a file and monitor what prints.
1. Check the front matter.
1. Check for broken unclosed components and HTML elements.
1. Check for other text in angle brackets.

### Check the frontmatter

_Frontmatter_ is the YAML metadata at the top of each page.
Broken frontmatter breaks a site.

- [ ] Do you have triple dashes?
- [ ] Is the YAML valid? Do you need to quote or escape a character?

```diff
- ---
- title: Gatsby: what you need to know ## NO! Colons break will break things
- excerpt:                             ## NO! You need characters to introduce
-                                      ##     multiline yaml
- a long excerpt                       ## NO! You need to indent multiline yaml
- --                                   ## NO! Use three hyphens.

+ ---
+ title: 'Gatsby: what you need to know' ## YES!
+ excerpt: >-                            ## YES!
+   a long excerpt                       ## YES!
+ ---                                    ## YES!
```

### Check for `< angle brackets>`

Gatsby treats angle brackets as tokens, and it's _very_ strict about escaping them.
This applies to Gatsby components, in-line HTML, and other strings you put in angle brackets.

```md

<Collapsible>

Here's my friendly site.

<Collapsible> // ← Not closed!!! This will break.

I like to write <b>HTML<b>  // OMG That <b> tag will break things.

I like to pretend I made up new HTML elements sometimes.
Like wouldn't it be joyful if I could put my
<joy> happy text between joy tags </joy> // Monospace that `<joy>` please



```


## ESlint errors

This isn't really a Gatsby problem, but a linting issue.
If you have JavaScript snippets, our githooks and CI run the prettier linter.

Usually you can fix this with `eslint --fix`.


```bash
./node_modules/.bin/eslint src/data/markdown/posts/2022-03-25--private-load-zones --fix
```

For more troublesome files, you will need to look at the offending code.
Prettier evaluates the entire abstract syntax tree, so some errors can be surprising
(why should a one line example need to declare variables).
Some writer don't like this linting, but the alternative is a million different styles of code in our load-test snippets.
Reader comfort is more important here.
