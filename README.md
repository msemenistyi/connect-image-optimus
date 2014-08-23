[![Build Status](https://travis-ci.org/msemenistyi/connect-image-optimus.png)](https://travis-ci.org/msemenistyi/connect-image-optimus)

## Install
> npm install connect-image-optimus

## Overview
Middleware to server image in optimal format. Switches from `.jpg`, `.jpeg` or 
`.png` to `.webp` or `.jxr` if possible.
Works with [Connect](https://github.com/senchalabs/connect/) 
and [Express](https://github.com/visionmedia/express).

Image-optimus analyzes **Accept** header of request and searches for `image/webp`.
If search is successful, fs check for file with the same name but .webp extension 
is performed. In case of existance, url is changed so that other middleware 
(e.g. static) will serve webp format.   
If there was no `image/webp` in **Accept** header, module performs a check on 
**User-Agent** header. These are browsers supporting **webp** format:
- Android 4.0+ 
- Chrome 23.0+
- Opera 12.1+

The same check is performed for serving **jpeg-xr** images if possible.
These are browsers supporting this format:
- IE 9+

The last change made will be **Vary** header set to **Accept** so that caching
proxies could distingiuish which content to load for the same requested url.

##Usage

**Warning**: image-optimus should be used before a middleware that is serving 
files so that it serves changed format file.   

```js
var optimus = require('connect-image-optimus');

var staticPath = __dirname + '/static/';

app.use(optimus(staticPath));
app.use(connect.static(staticPath));
```
##Contributing
Feel free to open issues and send PRs, though make sure that you create tests
for new functionality and amend ones for fixes and changes. 

## Running tests
Run `npm test` in order to see test results.

## License

The MIT License (MIT)

Copyright (c) 2014 Semenistyi Mykyta nikeiwe@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
