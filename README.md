# s3mdParse
[![License](https://img.shields.io/:license-apache-blue.svg)](https://github.com/verybigzhouhai/s3mdParse/blob/main/LICENSE.md)


tools for read s3mb file content

`s3mdParse` can be used as a command-line tool or Node.js module.

## Getting Started

Install [Node.js](https://nodejs.org/en/) if you don't already have it, and then:
```
npm install -g s3mdParse
```

### Using s3mdParse as a command-line tool:

`s3mdParse -i ./sampleData`

### Using s3mdParse as a library:

```javascript
const s3mdParse = require('s3mdParse');
const path = './sampleData'
s3mdParse(path)
```

### Command-Line Flags

|Flag|Description|Required|
|----|-----------|--------|
|`--help`, `-h`|Display help|No|
|`--input`, `-i`|Path to the scp file.|:white_check_mark: Yes|