# be-committed (🤝)

be-committed encapsulates and makes declarative a snippet of code that is likely found [frequently in various web sites](https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp). In particular, trigger a button click on keyboard "enter."


[![Playwright Tests](https://github.com/bahrus/be-committed/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-committed/actions/workflows/CI.yml)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-committed?style=for-the-badge)](https://bundlephobia.com/result?p=be-committed)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-committed?compression=gzip">

[![NPM version](https://badge.fury.io/js/be-committed.png)](http://badge.fury.io/js/be-committed)

## Syntax

```html
<label>
    Test
    <input be-committed-to="change">
</label>
    
<button id=change onclick="logToConsole()">Click Here</button>

<be-hive>
    <script type=emc src="be-committed/emc.mjs"></script>
</be-hive>
<script type=module>
    import 'be-hive/be-hive.js';
</script>
```

What this does:

If you set focus on the input element, start typing, and click enter, it clicks on the "Search" button.


The "nudge" setting allows for setting the disabled attribute for the input element, and the nudge setting removes the disabled attribute (or lowers the number by one if set to a number higher than 1), so we can progressively enhance the input element, activating it when ready.


Referencing the module, as shown above, only affects input elements outside any ShadowDOM realm.

To affect elements within a ShadowDOM realm, add an instance the tag ["be-hive"](https://github.com/bahrus/be-hive) within the ShadowDOM realm. 

## Alternative name and support for nudging

We can use a shorter name in less formal settings, where we can control conflicts with other libraries:

```html
<label>
    Test
    <input disabled 🤝-to="change" 🤝-nudge>
</label>

<button disabled id=change onclick="logToConsole()">Click Here</button>
```

See [how to define your name](https://github.com/bahrus/be-committed/blob/baseline/%F0%9F%A4%9D.js).

## Default submit button if "-to" value not specified

When no `-to` value is specified, be-committed automatically finds the nearest ancestor `<form>` and clicks its first submit button (`<button type="submit">` or `<input type="submit">`) on Enter.

```html
<form>
    <label>
        Test
        <input be-committed>
    </label>

    <button type=submit>Continue</button>
</form>
```

Browsers already support [implicit form submission](https://html.spec.whatwg.org/multipage/form-elements.html#implicit-submission) — pressing Enter in a single-line input submits the form. However, be-committed is useful in scenarios where the native behavior falls short:

- **SPA form handling** — Many single-page apps call `preventDefault()` on the submit event and handle things via JavaScript. The submit button's `click` handler may contain the actual logic, and implicit submission doesn't always reach it consistently across frameworks.
- **Forms with multiple submit buttons** — The browser picks the first submit button in tree order, but you may want to target a specific one. Combine `be-committed` (no `-to`) for the default, and `be-committed-to="other-btn"` on specific inputs that should target a different button.
- **Non-standard form layouts** — When inputs and buttons are connected via JavaScript but don't follow the traditional `<form>` structure, or when the submit button is dynamically inserted, native implicit submission can be unreliable.
- **Consistent cross-browser behavior** — Implicit submission has subtle differences across browsers (e.g., forms with multiple text inputs). be-committed normalizes the behavior by explicitly clicking the submit button on Enter.

## Viewing Locally

Any web server that serves static files with server-side includes will do but...

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/demo/ in a modern browser

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
