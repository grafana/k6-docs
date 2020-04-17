Contributing File Formats
====================================

The k6 documentation is a Gatsby application using React components and markdown files for the content of the different pages.

There are two types of pages: Welcome Pages and Documentation articles.

[Welcome Pages](src/templates/docs) are the pages shown on the header menu: `Guides`, `Javascript API`, `Cloud Docs`, `Integration`, and `Examples`. They are made as separate React Components for maximum customisation. 

Documentation articles are markdown files structured under the [`src/data/markdown/docs`](src/data/markdown/docs) folder.

### Folder structure

Root folders represent main categories at the top of the page.  
Use numbers in front of the folder name to set the order. 

Pattern: {number}{space}{page name}

Example: 02 Hello world

![](internal-images/Untitled.png)

The same pattern used to define orders not only root folderы but also pages(md files) inside the category.

![](internal-images/Untitled%201.png)

## Headers

Use typical ## markdown definition to format headers. 

    ## Making HTTP requests

Make sure you are using '##' which stands for a h2 tag - h1 i*s reserved for the title of a page*, that gets parsed from the frontmatter. Also the navigation box that is being dynamically created on each page based on h2 tags.

![internal-images/Untitled%202.png](internal-images/Untitled%202.png)

Use h2 *and only h2 as landmarks*. h3 tag is designed to be used in your blockquote heading, like that: 

![internal-images/Untitled%203.png](internal-images/Untitled%203.png)

And h4,h5,h6 have no specified styles, therefore will be rendered by default very similar to h1, so you probably  do not want to use them, but if there are use cases, please, let us know.

## Images
Default image syntax for markdown files

    ![Alt field of an image](images/insights-url-table-full.png)

You have to store images in src/images folder and access them from md files by using relative path.  This way allows image-sharp-plugin process your image: compressing, converting and lazy loading.

If you really have to put there some remote picture, write it like that:

    ![Alt field of an image](https://files.readme.io/9e92efd-insights-url-table-full.png)

But keep in mind the size of an image on the other side of a link to prevent page overweighting.


## Blockquotes

Here things are getting a bit hairy. It is still default md, so it is perfectly fine to write blockquotes like:

    > ### Docker syntax
    >
    > When using the `k6` docker image, you can't just give the script name since
    > the script file will not be available to the container as it runs. Instead
    > you must tell k6 to read `stdin` by passing the file name as `-`. Then you
    > pipe the actual file into the container with `<` or equivalent. This will
    > cause the file to be redirected into the container and be read by k6.
    >
    > **Note**: If your script imports other files (JS modules), piping like this
    > will not work since the extra files will not be visible inside the container.
    > To use modules you need to first mount your host/local directory into the
    > Docker container, see [Modules with Docker](https://docs.k6.io/v1.0/docs/modules#section-using-local-modules-with-docker)."

And you'll get a fine quote block:

![internal-images/Untitled%204.png](internal-images/Untitled%204.png)

And, in case of a 'warning' mod for a blockquote, you just add an ⚠️ emoji, like this:
    
    > ### ⚠️ Docker syntax
    >
    > When using the `k6` docker image, you can't just give the script name since
    > the script file will not be available to the container as it runs. Instead
    > you must tell k6 to read `stdin` by passing the file name as `-`. Then you
    > pipe the actual file into the container with `<` or equivalent. This will
    > cause the file to be redirected into the container and be read by k6.
    >
    > **Note**: If your script imports other files (JS modules), piping like this
    > will not work since the extra files will not be visible inside the container.
    > To use modules you need to first mount your host/local directory into the
    > Docker container, see [Modules with Docker](https://docs.k6.io/v1.0/docs/modules#section-using-local-modules-with-docker)."

*Pay attention to those empty lines between md block and a wrapper, they are required to correctly parsing.*

And our default blockquote will take a form of:

![internal-images/Untitled%205.png](internal-images/Untitled%205.png)

At the moment there are only two mods available, default (no wrapper needed) and warning. If you need more, let us know.

## Code blocks

So, there are basically three types of code blocks, small ones, headerless ones and headerfull ones, 

that last two have one possible modification - line numbers. 

### Small

No hardwork required, just wrap your small stuff like keywords in backticks:

    `API_VARIABLE` should be stored under a pillow

and you are good to go

![internal-images/Untitled%206.png](internal-images/Untitled%206.png)

### Headerless

We are going to write them a bit differently, half-native md, just like blockquotes:

    <div class="code-group" data-props='{"labels": []}'>
    
    ```javascript
    for (var id = 1; id <= 100; id++) {
    	http.get(http.url`http://example.com/posts/${id}`)
    }
    
    // tags.name="http://example.com/posts/${}", 
    // tags.name="http://example.com/posts/${}"
    ```
    
    </div>

And, as a result:

![internal-images/Untitled%207.png](internal-images/Untitled%207.png)

If we want line numbers to be rendered, we shall adjust our data-props to:

    <div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>
    
    ```javascript
    for (var id = 1; id <= 100; id++) {
    	http.get(http.url`http://example.com/posts/${id}`)
    }
    
    // tags.name="http://example.com/posts/${}", 
    // tags.name="http://example.com/posts/${}"
    ```
    
    </div>

Here you go:

![internal-images/Untitled%208.png](internal-images/Untitled%208.png)

### Headerfull

Pretty much the same routine as with headerless ones, but one difference in data-props, labels field, but I bet, you already got that: 

    <div class="code-group" data-props='{"labels": ["Nice code!"], "lineNumbers": [true]}'>
    
    ```javascript
    for (var id = 1; id <= 100; id++) {
    	http.get(http.url`http://example.com/posts/${id}`)
    }
    
    // tags.name="http://example.com/posts/${}", 
    // tags.name="http://example.com/posts/${}"
    ```
    
    </div>

![internal-images/Untitled%209.png](internal-images/Untitled%209.png)

### Multiple tabs

To be able to switch between different code tabs, we have to repeat the headerfull routine, but extend labels and md code blocks:

    <div class="code-group" data-props='{"labels": ["Nice code!", "This one is better", "Oh my.."], "lineNumbers": [true, true, true]}'>
    
    ```javascript
    for (var id = 1; id <= 100; id++) {
    	http.get(http.url`http://example.com/posts/${id}`)
    }
    
    // tags.name="http://example.com/posts/${}", 
    // tags.name="http://example.com/posts/${}"
    ```
    
    ```javascript
    for (var id = 1; id <= 100; id++) {
    	http.get(http.url`http://example.com/posts/${id}`)
    }
    
    // tags.name="http://example.com/posts/${}", 
    // tags.name="http://example.com/posts/${}"
    ```
    
    ```javascript
    for (var id = 1; id <= 100; id++) {
    	http.get(http.url`http://example.com/posts/${id}`)
    }
    
    // tags.name="http://example.com/posts/${}", 
    // tags.name="http://example.com/posts/${}"
    ```
    
    
    </div>

![internal-images/Untitled%2010.png](internal-images/Untitled%2010.png)

### A little note

    '{"labels": ["Nice code!", "This one is better", "Oh my.."], "lineNumbers": [true, true, true]}'

Line numbers are optional not for the whole code block, but for each tab. That is why here we have an array of bool.

## Table data

In md file it should look like this to be formatted as a table. You could use online markdown tables generator to simplify the process – [https://www.tablesgenerator.com/text_tables](https://www.tablesgenerator.com/text_tables)

    |                                     |                                     |
    |-------------------------------------|-------------------------------------|
    |[batch()](https://docs.k6.io/docs/batch-requests) | Issue multiple HTTP requests in parallel (like e.g. browsers tend to do) |
    |[del()](https://docs.k6.io/docs/del-url-body-params) | Issue an HTTP DELETE request. |
    |[get()](https://docs.k6.io/docs/get-url-body-params) | Issue an HTTP GET request. |
    |[options()](https://docs.k6.io/docs/options-url-body-params) | Issue an HTTP OPTIONS request. |
    |[patch()](https://docs.k6.io/docs/patch-url-body-params) | Issue an HTTP PATCH request. |
    |[post()](https://docs.k6.io/docs/post-url-body-params) | Issue an HTTP POST request. |
    |[put()](https://docs.k6.io/docs/put-url-body-params) | Issue an HTTP PUT request. |
    |[request()](https://docs.k6.io/docs/request-method-url-body-params) | Issue any type of HTTP request. |

Result: 

![internal-images/Untitled%2011.png](internal-images/Untitled%2011.png)

## The rest

The rest of elements you could write as you would in native md. It includes p, ul, ol, em, strong etc.

## Additional information

Check out the [project Wiki](https://github.com/loadimpact/k6-docs/wiki)  for additional information