/**
 * Cheer 클래스의 jsons 함수 테스트
 * 
 * HTML에서 테이블과 상품 목록 데이터를 추출하는 예제
 */
import { loadFile } from '@/lib/jnu-abc';
import { Cheer } from '@/lib/jnu-doc/cheer';

/**
 * 문자열로 전달된 콜백 함수 실행
 * @param callbackStr - 콜백 함수가 포함된 문자열
 * @param value - 콜백 함수에 전달할 값
 */
const evalCallback = (callbackStr: string, value: any) => {
  // 안전한 방법으로 문자열 콜백 실행 (eval 사용 주의)
  try {
    // Function 생성자를 사용하여 콜백 함수 생성
    const callbackFn = new Function('value', `return ${callbackStr}`);
    return callbackFn(value);
  } catch (error) {
    console.error('문자열 콜백 실행 오류:', error);
    return value; // 오류 발생 시 원래 값 반환
  }
};

/**
 * 테이블에서 사용자 정보 추출 테스트
 */
const testTableParsing = () => {
  console.log('\n=== 테이블 파싱 테스트 ===');
  
  // HTML 파일 로드
  const htmlContent = loadFile('./src/tests/mock/sample-table.html');
  const cheer = new Cheer(htmlContent);
  
  // 테이블의 행 요소들 선택
  const $rows = cheer.find('#userTable tbody .user-row');
  
  // 사용자 정보 추출 설정
  const userSettings = [
    { key: 'id', selector: '.user-id', attribute: 'text' },
    { key: 'name', selector: '.user-name', attribute: 'text' },
    { key: 'email', selector: '.user-email', attribute: 'text' },
    { key: 'role', selector: '.user-role', attribute: 'text' },
    // 콜백 함수 예제: ID를 숫자로 변환
    { 
      key: 'numericId', 
      selector: '.user-id', 
      attribute: 'text',
      callback: (value: string) => parseInt(value)
    }
  ];
  
  // jsons 함수로 사용자 정보 추출
  const users = cheer.jsons($rows, userSettings);
  
  console.log('추출된 사용자 정보:', users);
  
  // 특정 필드가 반드시 있는지 확인하는 required 옵션 테스트
  const requiredFields = ['id', 'name', 'email'];
  const usersWithRequired = cheer.jsons($rows, userSettings, requiredFields);
  console.log('필수 필드 포함 사용자 정보:', usersWithRequired);
  
  // afterRow 콜백 함수 테스트 (각 행 데이터 처리 후 호출)
  const usersWithRowCallback = cheer.jsons($rows, userSettings, [], 
    (row: any) => {
      row.fullInfo = `${row.name} (${row.email})`;
      return row;
    }
  );
  console.log('행 처리 콜백 적용 사용자 정보:', usersWithRowCallback);
  
  // afterRows 콜백 함수 테스트 (전체 행 데이터 처리 후 호출)
  const usersWithRowsCallback = cheer.jsons($rows, userSettings, [], 
    undefined,
    (rows: any[]) => {
      // 이메일 도메인 기준으로 필터링 예시
      return rows.filter(row => row.email.includes('@example.com'));
    }
  );
  console.log('전체 처리 콜백 적용 사용자 정보:', usersWithRowsCallback);
  
  // 문자열로 콜백 함수를 전달하는 테스트
  console.log('\n=== 문자열 콜백 함수 테스트 ===');
  
  // 콜백 함수가 문자열로 된 설정
  const stringCallbackSettings = [
    { key: 'id', selector: '.user-id', attribute: 'text' },
    { key: 'name', selector: '.user-name', attribute: 'text' },
    { key: 'email', selector: '.user-email', attribute: 'text' },
    { key: 'role', selector: '.user-role', attribute: 'text' },
    { 
      key: 'numericId', 
      selector: '.user-id', 
      attribute: 'text',
      callback: 'parseInt(value)'
    },
    {
      key: 'nameWithPrefix', 
      selector: '.user-name', 
      attribute: 'text',
      callback: '"사용자: " + value'
    },
    {
      key: 'roleCategory', 
      selector: '.user-role', 
      attribute: 'text',
      callback: 'value === "관리자" ? "admin" : "user"'
    }
  ];
  
  // 설정의 문자열 콜백을 함수로 변환
  const processedSettings = stringCallbackSettings.map(setting => {
    if (setting.callback && typeof setting.callback === 'string') {
      return {
        ...setting,
        callback: (value: any) => evalCallback(setting.callback as string, value)
      };
    }
    return setting;
  });
  
  // 변환된 설정으로 데이터 추출
  const usersWithStringCallbacks = cheer.jsons($rows, processedSettings);
  console.log('문자열 콜백 적용 결과:', usersWithStringCallbacks);
};

/**
 * 상품 목록 추출 테스트
 */
const testProductParsing = () => {
  console.log('\n=== 상품 목록 파싱 테스트 ===');
  
  // HTML 파일 로드
  const htmlContent = loadFile('./src/tests/mock/sample-table.html');
  const cheer = new Cheer(htmlContent);
  
  // 상품 아이템 요소들 선택
  const $products = cheer.find('.product-item');
  
  // 상품 정보 추출 설정
  const productSettings = [
    { 
      key: 'id', 
      selector: '', 
      attribute: 'data-id',
      // 셀렉터가 빈 문자열이면 현재 요소 자체를 대상으로 함
    },
    { key: 'name', selector: '.product-name', attribute: 'text' },
    { 
      key: 'price', 
      selector: '.product-price', 
      attribute: 'text',
      // 콜백 함수로 가격에서 쉼표와 '원' 제거 후 숫자로 변환
      callback: (value: string) => parseInt(value.replace(/,/g, '').replace('원', ''))
    },
    { key: 'description', selector: '.product-desc', attribute: 'text' },
  ];
  
  // jsons 함수로 상품 정보 추출
  const products = cheer.jsons($products, productSettings);
  
  console.log('추출된 상품 정보:', products);
  
  // 가격 내림차순으로 정렬하는 afterRows 콜백 테스트
  const sortedProducts = cheer.jsons($products, productSettings, [], 
    undefined,
    (rows: any[]) => {
      return rows.sort((a, b) => b.price - a.price);
    }
  );
  console.log('가격 내림차순 정렬된 상품 정보:', sortedProducts);
};

/**
 * 메인 테스트 함수
 */
const runTests = () => {
  testTableParsing();
  testProductParsing();
};

// 테스트 실행
runTests();
