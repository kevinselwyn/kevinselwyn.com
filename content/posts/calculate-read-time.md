---
title: "Calculate Read Time"
description: "Calculate article read time on this blog"
date: 2019-03-19T15:05:29-04:00
categories: ["javascript"]
tags: ["vanilla javascript"]
---

Let's add a Read Time feature to this blog.

Jumping right in:

```js
class ReadTime {
    constructor(text, opts) {
        const real_opts = opts || {};

        this._raw = text;
        this.text = this._cleanText(this._raw);
        this.words = this.text.split(' ');
        this.wpm = real_opts.wpm || 265;
        this.time = this._calculateTime(this.words, this.wpm);
    }

    _cleanText(text) {
        return (text || '')
            .toString()
            .trim()
            .replace(/[\r\n\t]+/g, ' ')
            .replace(/ +/g, ' ');
    }

    _calculateTime(words, wpm) {
        return (words.length / wpm) * 60;
    }
}
```

Break it down:

```js
class ReadTime {
    constructor(text, opts) {
        const real_opts = opts || {};

        this._raw = text;
        this.text = this._cleanText(this._raw);
        this.words = this.text.split(' ');
        this.wpm = real_opts.wpm || 265;
        this.time = this._calculateTime(this.words, this.wpm);
    }

// ...
}
```

Everything happens in the constructor. We take the input text, clean it, split
it into words, and then calculate the read time based on a default (or
user-supplied) words-per-minute.

The WPM defaults to **265**, based on what
<a href="https://help.medium.com/hc/en-us/articles/214991667-Read-time"
target="_blank">Medium does</a>. All other information I've found about the
average WPM reading for an adult ranges between 200 - 250 WPM.

Let's look at how we sanitize input text:

```js
// ...

    _cleanText(text) {
        return (text || '')
            .toString()
            .trim()
            .replace(/[\r\n\t]+/g, ' ')
            .replace(/ +/g, ' ');
    }

// ...
```

Pretty simple. First we make sure the text A) exists and B) is a string by
converting it using **`toString()`**. Then we **`trim()`** it and replace all
appropriate whitespace characters (**`\r`**, **`\n`**, and **`\t`**) with
spaces. Finally, all those spaces are reduce to single spaces between words.

```js
// ...

    _calculateTime(words, wpm) {
        return (words.length / wpm) * 60;
    }

// ...
```

Once everything is sanitized and split into words, all that's left is simple
math: dividing the words by WPM to get minutes, and then multiplying by 60 to
get words-per-second.

And that's it.

The **`ReadTime`** class now contains:

* **`_raw`** - Raw input text
* **`text`** - Cleaned input text
* **`words`** - Cleaned input text split into words
* **`wpm`** - Words per minute
* **`time`** - Read time (in seconds)

On this blog, it is set up in a way that it will always display the read time in
minutes _unless_ it'll take less than a minute. In that case it will say "Quick
read" (just like it does for this short post 😊).
