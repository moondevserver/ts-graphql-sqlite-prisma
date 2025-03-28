/**
 * A library for CSV Utility Functions
 *
 * @references
 *  - [Reading and Writing CSV Files in Node.js with node-csv](https://stackabuse.com/reading-and-writing-csv-files-in-nodejs-with-node-csv/)
 */
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify';
import { loadFile, saveFile } from '@/lib/jnu-abc';

/**
 * Load Csv
 *
 * @param path - string, './filename.ext'
 *
 */
const loadCsv = (path: string = '') => {
  return parse(loadFile(path), { columns: true });
};

/**
 * Save Csv
 *
 * @param path - string, './filename.ext'
 * @param data - 저장할 데이터 객체
 * @param options - CSV 저장 옵션
 * @param options.header - 헤더 저장 여부 (기본값: true)
 *
 */
const saveCsv = (path: string, data: any, options: { header?: boolean } = {}) => {
  const { header = true } = options;
  
  stringify(data, { header }, (err, output) => {
    if (err) throw err;
    saveFile(path, output);
  });
};

export { loadCsv, saveCsv };
// // & TEST
// // * LOAD
// console.log("loadCsv", loadCsv("../data/userLevel.csv"));

// // * DUMP
// const path = "../data/test2.csv";
// const data = [
//   {
//     name: "John",
//     surname: "Snow",
//     age: 26,
//     gender: "M",
//   },
//   {
//     name: "Clair, Black",
//     surname: "White",
//     age: 33,
//     gender: "F",
//   },
//   {
//     name: "Fancy",
//     surname: "Brown",
//     age: 78,
//     gender: "F",
//   },
// ];

// dumpCsv(path, data);
