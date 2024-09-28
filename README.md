# be-committed (🤝)

be-committed encapsulates and makes declarative a snippet of code that is likely found [frequently in various web sites](https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp). In particular, trigger a button click on keyboard "enter."


[![Playwright Tests](https://github.com/bahrus/be-committed/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-committed/actions/workflows/CI.yml)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-committed?style=for-the-badge)](https://bundlephobia.com/result?p=be-committed)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-committed?compression=gzip">

[![NPM version](https://badge.fury.io/js/be-committed.png)](http://badge.fury.io/js/be-committed)

## Syntax

```html
<label for=url>Enter Url</label>
<input id=url be-committed-to=#change>
<button id=change>Search</button>
```

What this does:

If you set focus on the input element, start typing, and click enter, it clicks on the "Search" button.


The "nudges" setting allows for setting the disabled attribute for the input element, and the nudges setting removes the disabled attribute (or lowers the number by one if set to a number higher than 1), so we can progressively enhance the input element, activating it when ready.


Referencing the module, as shown above, only affects input elements outside any ShadowDOM realm.

To affect elements within a ShadowDOM realm, add an instance the tag ["be-hive"](https://github.com/bahrus/be-hive) within the ShadowDOM realm.  


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
