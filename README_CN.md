# s3mdParse
[![License](https://img.shields.io/:license-apache-blue.svg)](https://github.com/verybigzhouhai/s3mdParse/blob/main/LICENSE)

老铁，右上角给个星星呗!

s3m数据的s3mb主要存储几何数据、s3md主要存储属性数据 ，这个工具可以批量提取s3m文件的属性数据到excel中，方便使用supermap desktop生成的smid和业务数据库的唯一id进行绑定和关联。
在输入目录下会输出一个excel文件，用图层名称命名，文件内容包含了所有模型构件的属性数据、smid取值范围、字段及其类型。

`s3mdParse` 可以作为命令行工具和nodejs模块使用.

## Getting Started

Install [Node.js](https://nodejs.org/en/) 安装Node之后执行命令:
```
npm install -g s3mdparse
```

### 作为命令行工具使用:

`s3mdparse -i ./sampleData`
在输入目录下会输出一个excel文件，用图层名称命名。

### 作为一个node模块使用:

```javascript
const s3mdParse = require('s3mdParse');
const path = './sampleData'
s3mdParse(path)
```
在输入目录下会输出一个excel文件，用图层名称命名。

### Command-Line Flags

|Flag|Description|Required|
|----|-----------|--------|
|`--help`, `-h`|Display help|No|
|`--input`, `-i`|Path to the scp file.|:white_check_mark: Yes|
