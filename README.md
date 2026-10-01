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
    <script type=emc src="be-committed/emc.json"></script>
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

## Programmatic attachment (no attribute)

The attribute syntax shown above shines for server-rendered HTML and progressive enhancement:  the markup alone says which button Enter clicks.  But most web development today renders on the client, with a framework (Lit, React, Vue, Svelte, etc.) that already has a JavaScript reference to each element it creates.  In that setting, attaching be-committed programmatically is the better fit:

1. **A less clunky API.**  Frameworks are awkward about setting arbitrary attributes, let alone emoji ones like `🤝-to="change"` and `🤝-nudge`.  More importantly, the attribute can only name the button by id, so the button needs one, unique within its root.  Programmatically, `to` can be the button element itself (or a `WeakRef` to it), id or no id.
2. **Less stringifying and parsing.**  Values like `nudge` are set as real booleans, rather than serialized into attributes and read back out of them.
3. **Less overhead monitoring attributes.**  The attribute approach relies on be-hive / mount-observer watching the DOM for elements that carry (or gain) a be-committed attribute.  `def.js` just registers the config, and the enhancement is attached exactly when, and to exactly the elements, your code says.

Either way, it is the **same enhancement**, with the same defaults (keydown, closest form's submit button when `to` is omitted), and the two can be mixed in one app:  attributes for server-rendered islands, programmatic attachment inside client-rendered components.

### Registration

```JS
import { defBeCommitted } from 'be-committed/def.js';
const emc = await defBeCommitted(document.body); // or a shadow root's host, for a scoped registry
```

### Attribute → property mapping

| Attribute                            | Property | Notes |
|--------------------------------------|----------|-------|
| `be-committed-to` / `🤝-to`           | `to`     | The id of the button to click.  Programmatically, may also be the button element itself, or a `WeakRef` to it.  Omit it to click the closest form's submit button. |
| `be-committed-nudge` / `🤝-nudge`     | `nudge`  | `true` to remove (or decrement) the element's `disabled` attribute once the enhancement is ready. |

### Declarative -- via enh.set

```JS
// equivalent to <input disabled be-committed-to="change" be-committed-nudge>
input.enh.set.beCommitted.nudge = true;
input.enh.beCommitted.to = 'change';
```

Only the first property needs to go through `.set`, which triggers attachment.  This works whether it runs before or after `defBeCommitted` is called.

### Imperative -- via enh.get()

```JS
Object.assign(input.enh.get(emc), {
    nudge: true,
    to: myButton, // the element itself -- no id needed
});
```

### Passing elements directly

`to` only ever holds the button **weakly**.  If the button is removed from the DOM and garbage collected, pressing Enter in the input does nothing (it doesn't throw).

See [demo/Programmatic](demo/Programmatic/) for runnable examples.

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
