import { ChromeBasic, goChrome } from '@/lib/jnu-web';
import { By } from 'selenium-webdriver';

/**
 * ChromeBasic 클래스 테스트
 */
const testChromeBasic = async () => {
  console.log('\n=== ChromeBasic 클래스 테스트 ===');

  let chrome: ChromeBasic | null = null;

  try {
    // ChromeBasic 인스턴스 생성
    chrome = new ChromeBasic();

    // Chrome 브라우저 초기화 (headless 모드)
    await chrome.initialize({ headless: true });
    console.log('Chrome 브라우저 초기화됨');

    // 웹 페이지 방문
    await chrome.goto('https://www.example.com');
    console.log('example.com 페이지 로드됨');

    // 드라이버를 사용하여 페이지 제목 가져오기
    const title = await chrome.driver.getTitle();
    console.log('페이지 제목:', title);

    // 드라이버를 사용하여 페이지 내용 확인 (예: body 텍스트)
    const bodyText = await chrome.driver.findElement(By.css('body')).getText();
    console.log('페이지 본문 일부:', bodyText.substring(0, 150) + '...');

    // 브라우저 닫기
    await chrome.close();
    console.log('Chrome 브라우저 닫힘');
  } catch (error) {
    console.error('ChromeBasic 테스트 오류:', error);

    // 오류 발생 시 브라우저 닫기
    if (chrome) {
      try {
        await chrome.close();
      } catch (closeError) {
        console.error('브라우저 닫기 오류:', closeError);
      }
    }
  }
};

/**
 * goChrome 함수 테스트
 */
const testGoChrome = async () => {
  console.log('\n=== goChrome 함수 테스트 ===');

  try {
    // goChrome 함수를 사용한 웹 스크래핑 테스트
    const driver = await goChrome('https://www.example.com');

    // WebDriver를 사용하여 작업 수행
    const title = await driver.getTitle();
    console.log('페이지 제목:', title);

    // 결과 출력
    console.log('goChrome 함수 테스트 완료');

    // 브라우저 종료
    await driver.quit();
  } catch (error) {
    console.error('goChrome 테스트 오류:', error);
  }
};

/**
 * 메인 테스트 함수
 */
const runTests = async () => {
  console.log('===== 웹 브라우저 자동화 테스트 시작 =====');

  // 브라우저 자동화 테스트
  await testChromeBasic();
  await testGoChrome();

  console.log('\n===== 웹 브라우저 자동화 테스트 완료 =====');
};

// 테스트 실행
runTests().catch((error) => {
  console.error('테스트 실행 중 오류 발생:', error);
});
