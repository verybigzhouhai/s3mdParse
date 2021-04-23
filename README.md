# s3mdParse
[![License](https://img.shields.io/:license-apache-blue.svg)](https://github.com/verybigzhouhai/s3mdParse/blob/main/LICENSE)

[中文说明](https://github.com/verybigzhouhai/s3mdParse/blob/main/README_CN.md)

tools for read s3mb file content to excel

`s3mdParse` can be used as a command-line tool or Node.js module.

## Getting Started

Install [Node.js](https://nodejs.org/en/) if you don't already have it, and then:
```
npm install -g s3mdparse
```

### Using s3mdParse as a command-line tool:

`s3mdparse -i ./sampleData`
In the input directory, you will get an excel.
### Using s3mdParse as a library:

```javascript
const s3mdParse = require('s3mdParse');
const path = './sampleData'
s3mdParse(path)
```
In the input directory, you will get an excel.
### Command-Line Flags

|Flag|Description|Required|
|----|-----------|--------|
|`--help`, `-h`|Display help|No|
|`--input`, `-i`|Path to the scp file.|:white_check_mark: Yes|