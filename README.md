# be-committed

be-committed encapsulates and makes declarative a snippet of code that is likely found [frequently in various web sites](https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp). In particular, trigger a button click on keyboard "enter."


[![Playwright Tests](https://github.com/bahrus/be-committed/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-committed/actions/workflows/CI.yml)

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-committed?style=for-the-badge)](https://bundlephobia.com/result?p=be-committed)

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-committed?compression=gzip">

<a href="https://nodei.co/npm/be-committed/"><img src="https://nodei.co/npm/be-committed.png"></a>

## Syntax

```html
<label for=url>Enter Url</label>
<input id=url be-committed='{"to": "change"}'>
<button id=change>Search</button>

<script type=module crossorigin>
    import 'https://esm.run/be-committed';
</script>
```


Referencing the module, as shown above, only affects input elements outside any ShadowDOM realm.

To affect elements within a ShadowDOM realm, add an instance the tag ["be-hive"](https://github.com/bahrus/be-hive) within the ShadowDOM realm.  

What this does:

If you set focus on the input element, start typing, and click enter, it clicks on the "Search" button.

## CDN

```html
<script type=module>
    import 'https://esm.run/be-committed'
</script>
```

Use of attributes is not required (for example, during [template instantiation, where use of attributes isn't optimal](https://github.com/bahrus/trans-render#extending-tr-dtr-horizontally)).

## Running locally

1.  Do a git clone or a git fork of repository https://github.com/bahrus/be-committed
2.  Install node.js
3.  Run "npm install" from location of folder created in step 1.
4.  Run npm run serve.  Open browser to http://localhost:3030/demo/

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
