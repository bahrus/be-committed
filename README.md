# be-committed

be-committed encapsulates and makes declarative a snippet of code that is likely found [frequently in various web sites](https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp). In particular, trigger a button click on keyboard "enter."

<a href="https://nodei.co/npm/hypo-link/"><img src="https://nodei.co/npm/be-committed.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/be-committed">

## Syntax

```html
<label for=url>Enter Url</label>
<input id=url be-committed='{"to": "change"}'>
<button id=change>Search</button>

<script type=module crossorigin>
    import '//cdn.skypack.dev/be-committed/be-committed.js';
</script>
```

You can stick to 100% kosher HTML syntax as well:

```html
<label for=url>Enter Url</label>
<input id=url data-be-committed=to-change>
<button id=to-change>Search</button>

<script type=module crossorigin>
    import '//cdn.skypack.dev/be-committed/be-committed.js';
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


## Running locally

1.  Do a git clone or a git fork of repository https://github.com/bahrus/be-committed
2.  Install node.js
3.  Run "npm install" from location of folder created in step 1.
4.  Run npm run serve.  Open browser to http://localhost:3030/demo/dev.html

## import map

If running locally without a bundling tool, just pure ESM modules, the following needs to be included in your html file:

```html
<script type=importmap>
    {
        "imports": {
            "xtal-element/": "../node_modules/xtal-element/",
            "trans-render/": "../node_modules/trans-render/",
            "be-decorated/": "../node_modules/be-decorated/"
        }
    }
</script>
```

A [polyfill](https://github.com/guybedford/es-module-shims) is required for browsers that don't yet support import maps.

