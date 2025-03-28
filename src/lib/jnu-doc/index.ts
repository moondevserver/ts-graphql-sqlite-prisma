//  depends on `jnj-lib-base`
//  npm install js-yaml ini csv-parse csv-stringify node-xlsx --save
// npm i --save-dev @types/ini @types/js-yaml

//  npm install csv-parse@5.4.2 csv-stringify@6.1.5 --save
//  npm install node-xlsx@0.21.0 --save

export { loadCsv, saveCsv } from '@/lib/jnu-doc/csv';
export { loadYaml, saveYaml } from '@/lib/jnu-doc/yaml';
export { loadIni, saveIni } from '@/lib/jnu-doc/ini';
export {
  tsvFromSrt, // Convert SubRipText(`srt`) format string => Tab-Separated Values(`tsv`) format string
  srtFromTsv, // Convert Tab-Separated Values(`tsv`) => SubRipText(`srt`)
  convertStr, // convert string format
  txtFromSrt, // Convert SubRipText(`srt`) format string => Text(`txt`) format string
  tsvFromVtt, // Convert Timed Text Markup Language(`vtt`) format string => Tab-Separated Values(`tsv`) format string
  txtFromVtt, // Convert Timed Text Markup Language(`vtt`) format string => Text(`txt`) format string
  srtToVtt, // Convert SubRipText(`srt`) format string => Timed Text Markup Language(`vtt`) format string
  vttToSrt, // Convert Timed Text Markup Language(`vtt`) format string => SubRipText(`srt`) format string
  convertSrtFileToVtt, // Convert SubRipText(`srt`) file => Timed Text Markup Language(`vtt`) file
  convertSrtToVttInFolder, // Convert SubRipText(`srt`) folder => Timed Text Markup Language(`vtt`) folder
} from '@/lib/jnu-doc/caption';
export {
  encodeHtml,
  decodeHtml,
  escapeRegExp,
  escapeMarkdown,
  escapeValue,
  unescapeValue,
  escapeDoubleQuotes,
  formatVariables,
  makeUrlAbsolute,
  formatDuration,
} from '@/lib/jnu-doc/html';
export { Cheer } from '@/lib/jnu-doc/cheer';
export { mdTitle, mdContent, mdFrontmatter } from '@/lib/jnu-doc/markdn';
