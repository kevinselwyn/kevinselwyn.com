---
title: "l337 Web Component"
description: "Creating a Custom Element that translates text into l337 5p34k"
date: 2019-03-05T09:34:16-05:00
categories: ["javascript"]
tags: ["web-components"]
---

Let's make a <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_blank">Web Component</a> that transforms the text inside to <a href="https://en.wikipedia.org/wiki/Leet" target="_blank">l337 5p34k</a>.

Here's a working example. Type to translate to l337 5p34k:

<div class="l337-5p34k">
    <input type="text" placeholder="The quick red fox jumps over the lazy brown dog." />
    <l337-5p34k>The quick red fox jumps over the lazy brown dog.</l337-5p34k>
    <link rel="stylesheet" type="text/css" href="/css/posts/l337-web-component/style.css" />
    <script src="/js/posts/l337-web-component/bundle.js"></script>
    <script src="/js/posts/l337-web-component/l337-5p34k.js"></script>
</div>

Starting with the implementation, this is what we want the markup to look like:

```html
<l337-5p34k>The quick red fox jumps over the lazy brown dog.</l337-5p34k>
```

To define a Custom Element, we must use **`window.customElements`**, specifically **`window.customElements.define`**:

```js
class L3375P34K {
    // will define below
}

customElements.define('l337-5p34k', L3375P34K);
```

One thing to note is that the name for a new Custom Element *must* contain a hyphen. This forces us to namespace our new component.

Now we create the class that defines the Custom Element:

```js
var L337MAPPING = {
    a: 4,
    e: 3,
    g: 6,
    o: 0,
    s: 5,
    t: 7
};

class L3375P34K extends HTMLElement {
    constructor() {
        super();

        this.shadowTextNode = document.createTextNode('');
        this.textNode = null;

        var shadow = this.attachShadow({
            mode: 'open'
        });

        shadow.appendChild(this.shadowTextNode);

        this._onLoad = this._onLoad.bind(this);
        this._onTextChange = this._onTextChange.bind(this);
    }

    connectedCallback() {
        document.addEventListener('readystatechange', this._onLoad, true);
        this._onLoad();
    }

    adoptedCallback() {
        this._onLoad();
    }

    disconnectedCallback() {
        document.removeEventListener('readystatechange', this._onLoad, true);

        if (this.textNode) {
            this.textNode.removeEventListener('DOMCharacterDataModified', this._onTextChange, true);
        }
    }

    _onLoad() {
        if (document.readyState !== 'complete') {
            return;
        }

        this.textNode = Array.prototype.slice.call(this.childNodes)
            .filter(function (node) {
                return node.nodeType === 3;
            })
            .shift();

        if (!this.textNode) {
            this.textNode = document.createTextNode('');

            this.appendChild(this.textNode);
        }

        this.textNode.addEventListener('DOMCharacterDataModified', this._onTextChange, true);

        this._onTranslate()
    }

    _onTextChange() {
        this._onTranslate();
    }

    _onTranslate() {
        var text = ((this.textNode || {}).textContent || '')
            .trim()
            .toLowerCase();
        var translated = text
            .split('')
            .map(function (chr) {
                return L337MAPPING[chr] !== undefined ? L337MAPPING[chr] : chr;
            })
            .join('');

        this.shadowTextNode.textContent = translated;
    }
}

if (window.customElements) {
    customElements.define('l337-5p34k', L3375P34K);
}
```

Let's break that down:

```js
var L337MAPPING = {
    a: 4,
    e: 3,
    g: 6,
    o: 0,
    s: 5,
    t: 7
};
```

This is our very simple Latin -> l337 mapping. **`a`** becomes **`4`**, **`o`** becomes **`0`**, etc.

```js
class L3375P34K extends HTMLElement {
    constructor() {
        super();

        this.shadowTextNode = document.createTextNode('');
        this.textNode = null;

        var shadow = this.attachShadow({
            mode: 'open'
        });

        shadow.appendChild(this.shadowTextNode);

        this._onLoad = this._onLoad.bind(this);
        this._onTextChange = this._onTextChange.bind(this);
    }

    // ...
}
```

Here's our class and constructor. Note that our class extends **`HTMLElement`**. We create a **`textNode`** that will be attached to the <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM" target="_blank">Shadow DOM</a> of our Custom Element. After that, we just bind a few callbacks that will be used later.

```js
// ...

    connectedCallback() {
        document.addEventListener('readystatechange', this._onLoad, true);
        this._onLoad();
    }

    adoptedCallback() {
        this._onLoad();
    }

    disconnectedCallback() {
        document.removeEventListener('readystatechange', this._onLoad, true);

        if (this.textNode) {
            this.textNode.removeEventListener('DOMCharacterDataModified', this._onTextChange, true);
        }
    }

// ...
```

Here we have our Custom Element lifecycle methods.

* **`connectedCallback()`** will be called when the element is connected to the DOM
    * We wait for the document to be loaded. If it's already loaded, we move forward. This helps us instantiate the Custom Element if the page loads with it as opposed to adding it later dynamically.
* **`adoptedCallback()`** will be called when the element is moved to a new document
    * We trigger another load because something may have changed while the element was moving
* **`disconnectedCallback()`** will be called when the element is removed/disconnected from the DOM
    * We clean up some callbacks

```js
// ...

    _onLoad() {
        if (document.readyState !== 'complete') {
            return;
        }

        this.textNode = Array.prototype.slice.call(this.childNodes)
            .filter(function (node) {
                return node.nodeType === 3;
            })
            .shift();

        if (!this.textNode) {
            this.textNode = document.createTextNode('');

            this.appendChild(this.textNode);
        }

        this.textNode.addEventListener('DOMCharacterDataModified', this._onTextChange, true);

        this._onTranslate()
    }

    _onTextChange() {
        this._onTranslate();
    }

// ...
```

Here we try to load the Custom Element. If the document is not ready, we do not load.

Next we grab the first **`textNode`** inside the **`<l337-5p34k>`** element, if one does not exist, we create one and append it to the element.

Then we apply a listener to our **`textNode`**, waiting for a **DOMCharacterDataModified** event. This is the event we will hook into to re-translate the text if the text is changed, since otherwise we are really only waiting for an element to be attached to the DOM. After the element loads (and/or after the text is changed), we trigger the **`_onTranslate()`** function.

```js
// ...

    _onTranslate() {
        var text = ((this.textNode || {}).textContent || '')
            .trim()
            .toLowerCase();
        var translated = text
            .split('')
            .map(function (chr) {
                return L337MAPPING[chr] !== undefined ? L337MAPPING[chr] : chr;
            })
            .join('');

        this.shadowTextNode.textContent = translated;
    }

// ...
```

The translate function is probably the simpliest part of the entire Custom Element. It takes the textContent from the elements **`textNode`**, **`map()`**s over all the characters, replaces the appropriate ones with the **`L337MAPPING`** defined earlier, and assigns the translated text to the Shadow DOM **`textNode`**.

Last thing to do is the actual definition:

```js
if (window.customElements) {
    customElements.define('l337-5p34k', L3375P34K);
}
```

If Custom Elements are not supported, then we won't try to define ours. Again, our Custom Element's name must be hyphenated, *but* it cannot start with a number, stopping us from naming it "1337" (which would've been much more legit).

And that's it!

Nice things that could be in the future:

* We could add custom styling to our Custom Element
* We could add CSS or JS functionality to animate characters so it looks like they're being translated before our eyes
