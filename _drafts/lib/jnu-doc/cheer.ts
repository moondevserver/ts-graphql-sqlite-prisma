import * as cheerio from 'cheerio';

// * settings = [{'key': '', 'selector': '', 'attribute': ''}]
interface CheerSetting {
  key: string;
  selector: string;
  attribute?: string;
  callback?: (value: any) => any;
}

/**
 * XPath를 CSS 선택자로 변환하는 간단한 함수
 */
const xpathToSelector = (xpath: string): string => {
  console.log('@@@ Converting xpath:', xpath);

  // 상대 경로 XPath 처리 (.//td[3]/a 형식)
  if (xpath.startsWith('.//')) {
    return xpath
      .replace('.//td', 'td')
      .replace(/td\[(\d+)\]/g, 'td:nth-child($1)')
      .replace(/\/a$/, ' a')
      .replace(/\/span$/, ' span')
      .replace(/\/text\(\)$/, '');
  }

  // 단순 td 경로 처리 (td[3]/a 형식)
  if (xpath.startsWith('td')) {
    return xpath
      .replace(/td\[(\d+)\]/g, 'td:nth-child($1)')
      .replace(/\/a$/, ' a')
      .replace(/\/span$/, ' span')
      .replace(/\/text\(\)$/, '');
  }

  // ID를 포함한 절대 경로 XPath 처리
  let selector = xpath;

  // ID 처리
  selector = selector.replace(/\/\/\*\[@id="([^"]+)"\]/g, '#$1');

  // 테이블 행 처리
  selector = selector.replace(/\/tbody\/tr$/, ' tbody tr');

  // 나머지 경로 처리
  selector = selector
    .replace(/\/div\[(\d+)\]/g, ' > div:nth-child($1)')
    .replace(/\/div/g, ' > div')
    .replace(/\/table/g, ' > table')
    .replace(/\/tbody/g, ' > tbody')
    .replace(/\/tr/g, ' > tr')
    .replace(/\/td\[(\d+)\]/g, ' > td:nth-child($1)')
    .replace(/\/td/g, ' > td')
    .replace(/\/a/g, ' > a');

  // console.log('@@@ Converted to selector:', selector);
  return selector;
};

// *
const querySelectorAll = ($root: any, selector: string) => {
  return $root instanceof Function ? $root(selector) : $root.find(selector);
};

// *
const querySelector = ($root: any, selector: string) => {
  return $root instanceof Function ? $root(selector).eq(0) : $root.find(selector).eq(0);
};

// *
const _getValue = ($element: any, attribute: string) => {
  attribute ??= 'text';
  let rst;

  switch (attribute.toLowerCase()) {
    case 'text':
      rst = $element.text().trim();
      break;
    case 'texts':
      let contents = $element.contents();
      let texts: any[] = [];
      // console.log(`###contents.length: ${contents.length}`);
      for (let i = 0; i < contents.length; i++) {
        let _text: any = contents.eq(i).text().trim();
        // console.log(`###_text: |${_text}|`)
        if (_text.length > 0) {
          // console.log(`###_text: |${_text}|`)
          texts.push(_text);
        }
      }
      rst = texts;
      break;
    case 'innerhtml':
      rst = $element.html().trim();
      break;
    default:
      rst = $element.attr(attribute);
  }

  return rst;
};

// *
const getValue = ($root: any, selector: string, attribute?: string) => {
  attribute ??= 'text';
  let $element = querySelector($root, selector);
  return !$element ? '' : _getValue($element, attribute);
};

// *
const getValues = ($root: any, selector: string, attribute?: string) => {
  attribute ??= 'text';
  let $elements = querySelectorAll($root, selector);
  if (!$elements) return [];

  let values: any[] = [];
  for (let i = 0; i < $elements.length; i++) {
    let $element = $elements.eq(i);
    let value = _getValue($element, attribute);
    if (value) values.push(value);
  }
  return values;
};

// *
const getHtml = ($: any, selector?: string) => {
  if (!selector) {
    return $.html(); // selector가 없는 경우 전체 HTML 반환
  }
  return $.html(querySelector($, selector)); // selector가 있는 경우 해당 요소의 HTML 반환
};

// *
const getValueFromStr = (str: string, selector: string, attribute?: string) => {
  return getValue(cheerio.load(str), selector, attribute);
};

// *
const getValuesFromStr = (str: string, selector: string, attribute?: string) => {
  return getValues(cheerio.load(str), selector, attribute);
};

const dictFromRoot = ($root: any, settings: any[] = []) => {
  let dict: any = {};
  for (let setting of settings) {
    if (!setting.selector) {
      continue;
    }
    let value = getValue($root, setting.selector, setting.attribute);
    dict[setting.key] = setting.callback ? setting.callback(value) : value;
  }
  return dict;
};

// * settings = [{'key': '', 'selector': '', 'attribute': '', 'callback': (value: any) => any}, ...]
const dictsFromRoots = (
  $roots: any[],
  settings: any[] = [],
  required: string[] = [],
  afterRow?: (row: any) => void,
  afterRows?: (rows: any[]) => void
) => {
  let dicts: any[] = [];
  for (let i = 0; i < $roots.length; i++) {
    let $root = $roots[i];
    let dict = dictFromRoot($root, settings);
    if (!dict) continue;
    let notPush = false;
    for (let key of required) {
      if (!dict[key]) {
        notPush = true;
        break;
      }
    }
    if (!notPush) {
      if (afterRow) {
        afterRow(dict);
      }
      dicts.push(dict);
    }
  }
  if (afterRows) {
    afterRows(dicts);
  }
  return dicts;
};

// *
const removeElement = ($root: any, selector: string) => {
  if ($root instanceof Function) {
    $root(selector).eq(0).remove();
  } else {
    $root.find(selector).eq(0).remove();
  }
};

// *
const removeElements = ($root: any, selector: string) => {
  if ($root instanceof Function) {
    $root(selector).remove();
  } else {
    $root.find(selector).remove();
  }
};

// *
const addElement = ($root: any, srcHtml: string, dstSelector: string, location: 'before' | 'after' = 'after') => {
  if ($root instanceof Function) {
    switch (location) {
      case 'before':
        $root(dstSelector).before(srcHtml);
        break;
      case 'after':
        $root(dstSelector).after(srcHtml);
        break;
    }
  } else {
    switch (location) {
      case 'before':
        $root.find(dstSelector).before(srcHtml);
        break;
      case 'after':
        $root.find(dstSelector).after(srcHtml);
        break;
    }
  }
};

// *
const retag = ($root: any, selector: string, newTag: string) => {
  if ($root instanceof Function) {
    $root(selector).each((_, element) => {
      const $element = $root(element);
      const attrs = element.attribs;
      const content = $element.html();
      const $newElement = $root(`<${newTag}>`).attr(attrs).html(content);
      $element.replaceWith($newElement);
    });
  } else {
    $root.find(selector).each((_, element) => {
      const $element = $root(element);
      const attrs = element.attribs;
      const content = $element.html();
      const $newElement = $root(`<${newTag}>`).attr(attrs).html(content);
      $element.replaceWith($newElement);
    });
  }
};

// * 요소들 찾기
const findElements = ($root: any, selector: string) => {
  return $root instanceof Function ? $root(selector) : $root.find(selector);
};

// & CLASS AREA
// ** class
class Cheer {
  private source: string;
  private $: cheerio.CheerioAPI;

  constructor(source: string) {
    this.source = source;
    this.$ = cheerio.load(source) as cheerio.CheerioAPI;
  }

  root() {
    return this.$;
  }

  value(selector: string, attribute?: string) {
    return getValue(this.$, selector, attribute);
  }

  values(selector: string, attribute?: string) {
    return getValues(this.$, selector, attribute);
  }

  html(selector: string) {
    return getHtml(this.$, selector);
  }

  json(settings: any[] = []) {
    return dictFromRoot(this.$, settings);
  }

  jsons(
    $elements: any,
    settings: any[] = [],
    required: string[] = [],
    afterRow?: (row: any) => any,
    afterRows?: (rows: any[]) => any[]
  ) {
    // cheerio 객체를 배열로 변환
    const elements = $elements.toArray().map((el: any) => this.$(el));
    return dictsFromRoots(elements, settings, required, afterRow, afterRows);
  }

  remove(selector: string) {
    removeElement(this.$, selector);
  }

  del(selector: string) {
    removeElements(this.$, selector);
  }

  add(srcHtml: string, dstSelector: string, location: 'before' | 'after' = 'after') {
    addElement(this.$, srcHtml, dstSelector, location);
  }

  retag(selector: string, newTag: string) {
    retag(this.$, selector, newTag);
  }

  find(selector: string) {
    return findElements(this.$, selector);
  }
}

// & EXPORT
export { Cheer };
