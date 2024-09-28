# be-committed (🤝)

be-committed encapsulates and makes declarative a snippet of code that is likely found [frequently in various web sites](https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp). In particular, trigger a button click on keyboard "enter."


[![Playwright Tests](https://github.com/bahrus/be-committed/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-committed/actions/workflows/CI.yml)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-committed?style=for-the-badge)](https://bundlephobia.com/result?p=be-committed)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-committed?compression=gzip">

[![NPM version](https://badge.fury.io/js/be-committed.png)](http://badge.fury.io/js/be-committed)

## Syntax

```html
<label for=url>Enter Url</label>
<input id=url be-committed=to-change>
<button id=to-change>Search</button>

<script type=module crossorigin>
    import 'https://esm.run/be-committed';
</script>
```

What this does:

If you set focus on the input element, start typing, and click enter, it clicks on the "Search" button.

Alternatively:

```html
<label for=url>Enter Url</label>
<input id=url be-committed='{"to": "change"}'>
<button id=change>Search</button>

<script type=module crossorigin>
    import 'https://esm.run/be-committed';
</script>
```

which is shorthand for:

```html
<label for=url>Enter Url</label>
<input id=url be-committed='{
    "to": "change",
    "on": "keyup",
    "nudge": false
}'>
<button id=change>Search</button>

<script type=module crossorigin>
    import 'https://esm.run/be-committed';
</script>
```

The "nudge" setting allows for setting the disabled attribute for the input element, and the nudge setting removes the disabled attribute (or lowers the number by one if set to a number higher than 1), so we can progressively enhance the input element, activating it when ready.


Referencing the module, as shown above, only affects input elements outside any ShadowDOM realm.

To affect elements within a ShadowDOM realm, add an instance the tag ["be-hive"](https://github.com/bahrus/be-hive) within the ShadowDOM realm.  



## CDN

```html
<script type=module>
    import 'https://esm.run/be-committed'
</script>
```

Use of attributes is not required (for example, during [template instantiation, where use of attributes isn't optimal](https://github.com/bahrus/trans-render#extending-tr-dtr-horizontally)):

```JavaScript
await customElements.whenDefined('be-enhanced');
oInput.beEnhanced.by.beCommited.to = 'change';
```

Editing JSON-in-html can be rather error prone.  A [VS Code extension](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) is available to help with that, and is compatible with web versions of VSCode.

And in practice, it is also quite ergonomic to edit these declarative web components in a *.mjs file that executes in node as the file changes, and compiles to an html file via the [may-it-be](https://github.com/bahrus/may-it-be) compiler.  This allows the attributes to be editable with JS-like syntax.  Typescript 4.6 supports compiling mts to mjs files, which then allows typing of the attributes.

## Running locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Do a git clone or a git fork of repository https://github.com/bahrus/be-committed
3.  Install node.js
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev in a modern browser.

## Using from ESM Module:

```JavaScript
import 'be-committed/be-committed.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-committed';
</script>
```
