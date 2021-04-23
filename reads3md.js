#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const pako = require('pako')
const ab2str = require('arraybuffer-to-string')

const xlsx = require('xlsx')
const yargs = require('yargs')

let argv = yargs
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .alias('i', 'input')
  .argv

const filePath = argv.i

reads3md(filePath)

function reads3md(filePath){
  const s3mdList = []
  // read field
  if (!fs.existsSync(path.join(filePath, "attribute.json"))) {
    console.log('attribute not found!')
    return
  }
  const layerInfo = JSON.parse(fs.readFileSync(path.join(filePath, "attribute.json")).toString()).layerInfos[0]
  const layerName = layerInfo.layerName
  const idRange = layerInfo.idRange
  const fieldInfos = layerInfo.fieldInfos

  dirTraverse(filePath, s3mdList)

  const arrayData = []
  for (let i = 0; i < s3mdList.length; i++) {
    const file = s3mdList[i]
    readS3MDFile(file, arrayData, i == 0 ? true : false)
  }


  // data to workSheet
  const arrayWorkSheet = xlsx.utils.aoa_to_sheet(arrayData)
  const fieldInfosWorkSheet = xlsx.utils.json_to_sheet(fieldInfos)
  const idRangeWorkSheet = xlsx.utils.json_to_sheet([idRange])

  // construt workBook
  const workBook = {
    SheetNames: ['data', 'fieldInfos', 'idRange'],
    Sheets: {
      'data': arrayWorkSheet,

      'fieldInfos': fieldInfosWorkSheet,

      'idRange': idRangeWorkSheet
    },
  }
  // let worksheet = workBook.Sheets['data']

  xlsx.writeFile(workBook, path.join(filePath, layerName + '.xlsx'))

  console.log('read successed!')
}

//file traverse
function dirTraverse(filePath, s3mdList) {
  filePath = path.resolve(filePath)
  const files = fs.readdirSync(filePath)
  files.forEach(function (filename) {
    const filedir = path.join(filePath, filename)
    const stats = fs.statSync(filedir)
    const isFile = stats.isFile()
    const isDir = stats.isDirectory()
    if (isFile && path.extname(filedir) === '.s3md') {
      s3mdList.push(filedir)
    }
    if (isDir) {
      dirTraverse(filedir, s3mdList)
    }
  })
}

// console.log(s3mdList)

function readS3MDFile(filepath, arrayData, isHead) {
  const fileContent = fs.readFileSync(filepath)
  // zipped package size
  // const zippedPackageZize = fileContent.readUInt32LE()

  const upzipbuffer = pako.inflate(new Uint8Array(fileContent.slice(8, fileContent.length))).buffer

  const layerInfo = JSON.parse(ab2str(upzipbuffer.slice(4)))['layerInfos'][0]

  if (isHead) {
    const fieldInfos = layerInfo.fieldInfos
    const fieldInfoArray = []
    for (let i = 0; i < fieldInfos.length; i++) {
      const item = fieldInfos[i]
      fieldInfoArray.push(item.name)
    }
    arrayData.push(fieldInfoArray)
  }

  const records = layerInfo.records
  for (let i = 0; i < records.length; i++) {
    const item = records[i]
    const id = item.id
    const values = item.values
    const recordArray = []
    for (let h = 0; h < values.length; h++) {
      const value = values[h]
      recordArray.push(value.field)
    }
    arrayData.push(recordArray)
  }
}

module.exports = reads3md