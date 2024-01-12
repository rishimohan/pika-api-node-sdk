# Pika API Node.js SDK

## Installation

Using `npm`
```
npm install --save pika-sdk
```

Using `yarn`
```
yarn add pika-sdk
```

## Usage

### Import

```
const { PikaSdk } = require('pika-sdk');
```

With `ES6`

```
import { PikaSdk } from "pika-sdk";
```

### Generate image

Initialise `PikaSdk`.

```js
const PikaSdk = new PikaSdk("Your API key");
```

If you don't have your API key, get one from [Pika.style](https://pika.style).

Check the documentation on [How to get your API key](https://docs.pika.style/docs/basics/getting-api-key).

```js
const response = await PikaSdk.generateImageFromTemplate(templateId, modifications, "base64");
console.log(response);
```

**Example:**

`Base64` response format.

```js
import { PikaSdk } from "pika-sdk";

const pikaSdk = new PikaSdk("sk-he2jdus1cbz1dpt4mktgjyvx");

let templateId = "open-graph-image-1";
let modifications = {
  title: "Pika.style",
  textColor: "",
  description: "Create Visuals and Automate Image Generation",
  backgroundImage: "",
  backgroundColor: "",
  width: "",
  height: "",
  aspectRatio: ""
}

const response = await pikaSdk.generateImageFromTemplate(templateId, modifications, "base64");
console.log(response);

console.log("Image base64:", response.data.base64);
```

Base64 output
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAJ2CAYAAABPQHtcAAAAAXNSR0IArs4c6QAAIABJREFUeJzs3XmYJXdZL/Bvna37dM90FghLCBAQkC1BCBAMShLFBJAgKnofroBeFUUF5LrhiihXcV8BQRYVUUAlIewIGPbFmLCFLWwCYZEtzPR+trp/TM/......
```

`Binary` response format.

```js
import { PikaSdk } from "pika-sdk";
import { createWriteStream } from 'fs';

const pikaSdk = new PikaSdk("sk-he2jdus1cbz1dpt4mktgjyvx");

let templateId = "open-graph-image-1";
let modifications = {
  title: "Pika.style",
  textColor: "",
  description: "Create Visuals and Automate Image Generation",
  backgroundImage: "",
  backgroundColor: "",
  width: "",
  height: "",
  aspectRatio: ""
}

const response = await pikaSdk.generateImageFromTemplate(templateId, modifications, "binary");
const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

createWriteStream("og.png").write(buffer);
```

This example writes the binary image to the file `og.png`.

#### generateImageFromTemplate

Use this function to generate an image. It takes in 3 arguments

| argument | required | description |
|----------|----------|-------------|
|`templateId` | Yes | ID of the template (`open-graph-image-1`, `tweet-image-1`, `beautify-screenshot-1`, ...) |
|`modifications` | Yes | Modifications for the selected template. |
|`responseFormat` | No | `base64` or `binary` (Defaults to `base64`). |

For available templates and it's modifications refer [image generation api templates](https://pika.style/image-generation-api/templates).
