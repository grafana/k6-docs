# Gatsby troubleshooting


<img src="https://upload.wikimedia.org/wikipedia/en/c/c2/TheGreatGatsby2013Poster.jpg" alt="Leonardo DiCaprio as the great Gatsby" width="300" align="right">


**Table of contents**

 - [Can't serve the site locally](#cant-serve-the-site-locally)
      - [Windows - 'shx' is not recognized](#shx-is-not-recognized)
 - [Serving suddenly broke](#serving-suddenly-broke)
      - [Check the frontmatter](#check-the-frontmatter)
      - [Check for `<angle brackets>`](#check-for-angle-brackets)
      - [Clean the cache](#clean-the-cache)
  - [ESlint errors](#eslint-errors)

<!-- markdown-toc end -->


Gatsby errors can leave something to be desired.
That's the bad news.

The good news is that the majority of all local Gatsby issues have the same handful of root causes.
If you can't make Gatsby work on your site, check that your environment and local docs for any of these conditions.

If there's still an issue, ask for help!
Hopefully, we can find the solution and add it to this list.



## Can't serve the site locally

The site dependencies are usually a little behind the latest versions of node and npm.
If you are using the latest version of node, the `npm install` command might fail with something like this:

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

```

In this case, you need to use a 16.x version of node.
You can change versions with nvm.

1. Use `nvm ls` to see what versions are available.
2. Install and use what you need:

  ```sh
  nvm ls ## see what versions are available
  nvm install 16.16
  nvm use 16.16
  ```

3. Install dependencies and run:

  ```sh
  npm install && npm start
  ```
  
### shx is not recognized
On windows architectures, the component shx is often not found, and windows may prompt the following error message:
```sh
'shx' is not recognized as an internal or external command,
operable program or batch file.
```

If this happens, you can install shx with the following commands:
```sh
yarn add -D shx
```
or 
```sh
npm i shx --dev
```
## Serving suddenly broke

Great! You figured out versions and got Gatsby serving on your `localhost`.
You're saving changes, and previewing them live...what the deuce? The site just stopped serving! Gatsby is talking about some Raact code and you don't know what anything means.

Don't get angry! Try these things:

1. Scroll up the terminal that has the Gatsby server process. Usually Gatsby will print the text of the offending line. If you can't find anything, save a file and monitor what prints.

If the server output doesn't help:

1. Check the front matter.
1. Check for broken or unclosed components and HTML elements.
1. Check for other text in angle brackets (`<` `>`).


### Check the frontmatter

_Frontmatter_ is the YAML metadata at the top of each page.
Broken frontmatter breaks a site.
This checklist covers most frontmatter issues:

- [ ] Do you begin and end with triple hyphens, each on their own line?
- [ ] Is the YAML valid? Do you need to quote or escape a character?

```diff
- ---
- title: Gatsby: what you need to know   ## NO! Colons break will break things
- excerpt:                               ## NO! You need characters to introduce
-                                        ##     multiline yaml
- a long excerpt                         ## NO! You need to indent multiline yaml
- --                                     ## NO! Use three hyphens.
+ ---
+ title: 'Gatsby: what you need to know' ## YES!
+ excerpt: >-                            ## YES!
+   a long excerpt                       ## YES!
+ ---                                    ## YES!
```

### Check for angle brackets

Gatsby treats angle brackets as tokens, and it's _very_ strict about them.
This applies to Gatsby components, in-line HTML, and other strings you put in angle brackets.

- [ ] Make sure Gatsby tags and html elements are valid and closed properly
- [ ] Make sure you monospace or escape other text in angle brackets

```html

<Collapsible>

Here's my friendly site.

<Collapsible> <!--- Not closed!!! This will break. -->

I like to write <b>HTML<b>  <!--- Not closed!!! This will break. --->

Sometimes I like to invent my own whimisical HTML elements.
Like wouldn't it be joyful if I could put my
<joy> happy text between joy tags </joy> <!--- Monospace that `<joy>`, please --->.

```

Problems with angle brackets can be tricky to diagnose, especially if you've saved across multiple files.

### No text in codegroups

The only text in a `<CodeGroup>` component should be in the code fence ( between `\`\`\`` the text that is in the code fence itself, don't put text in codegroups.
Otherwise you'll get the error `No codeFrame could be generated`

### Be careful nesting

If you have the courage to nest components, be sure you keep each context separated.

### Check that component open and close tags have the same indentation

```html

- I'm hiding something in a bullet

  <Collapsible>

  Here's my secret.

<Collapsible> <!--- not aligned!!! This will break. -->
```
### Clean the cache

Sometimes you might get an error about something missing from the `.cache` directory.

```
  ModuleNotFoundError: Module not found: Error: Can't resolve 'components/blocks/new' in '.cache/caches/gatsby-plugin-mdx/mdx-scopes-dir'
```

To resolve this, you can clean the cache:

```bash
./node_modules/.bin/gatsby clean
```

## ESlint errors

This isn't really a Gatsby problem.
If you have JavaScript snippets, our githooks and CI run the prettier linter on them.

Usually you can fix this with `eslint --fix`.


```bash
./node_modules/.bin/eslint --fix ./src/data/markdown/translated-guides/en/01\ Getting\ started/04\ Results\ Output.md

```
For more troublesome files, you will need to look at the offending code.
Prettier evaluates the entire abstract syntax tree, so some errors can be surprising
(why should a one-line example need to declare variables? The AST is why).

Some writers don't like this linting, but the alternative is a multitude of codestyles in our load-test snippets, which could create a confusing reading experience.
Readers ~~>~~ `>` Writers.

Sometimes, though, the Prettier output can be misleading.

This error suggests that the problem is with a missing config. Really, the problem is with JS formatting at line 266.

```txt
✖ eslint -c ./src/data/markdown/.eslintrc.js --fix:

./k6-docs/src/data/markdown/translated-guides/en/03 Results output/100 End-of-test/150-custom-summary.md
  266:1  error  Parsing error: No Babel config file detected for ./k6-docs/src/data/markdown/translated-guides/en/03 Results output/100 End-of-test/150-custom-summary.md/5_5.javascript. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files
```

## Vale errors

Vale is the prose linter. Most times, when vale has an error, you should fix it.
However, sometimes Vale will flag a word that you want to use as a spelling error.
To fix this, you have two options:

- If this word will only appear on one page, disable vale for those lines.

  ```markdown

  <!-- vale off -->

  No spellng erors.

  <!-- vale on -->
  ```

- If this is a word that might appear often (usually a programming term or application), add it to `.vale/accept.txt`
