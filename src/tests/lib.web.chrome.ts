import { Chrome } from '@/lib/jnu-web';
import path from 'path';
import fs from 'fs';
// import dotenv from 'dotenv';

// dotenv.config();

// const { CHROME_DEFAULT_USER_EMAIL, CHROME_DEFAULT_USER_DATA_DIR } = process.env;

const CHROME_DEFAULT_USER_EMAIL = 'bigwhitekmc@gmail.com';
const CHROME_DEFAULT_USER_DATA_DIR = 'C:\\Users\\Jungsam\\AppData\\Local\\Google\\Chrome\\User Data';
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

// screenshots 디렉토리가 없으면 생성
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

/**
 * Chrome 기본 기능 테스트
 */
const testChromeBasic = async () => {
  console.log('\n=== Chrome 기본 기능 테스트 ===');
  let chrome = null;

  try {
    // Chrome 인스턴스 생성
    chrome = new Chrome({
      headless: false,
      email: CHROME_DEFAULT_USER_EMAIL,
      userDataDir: CHROME_DEFAULT_USER_DATA_DIR,
    });

    // Chrome 드라이버 초기화
    console.log('Chrome 드라이버를 초기화합니다...');
    await chrome.init();

    // 웹사이트 방문
    console.log('네이버로 이동합니다...');
    await chrome.goto('https://www.naver.com');
    await chrome.driver.sleep(2000);

    // 페이지 소스 가져오기
    console.log('페이지 소스를 가져옵니다...');
    const html = await chrome.getPageSource();
    console.log('페이지 소스 길이:', html.length);

    // 스크린샷 찍기
    console.log('스크린샷을 저장합니다...');
    await chrome.saveScreenshot(path.join(SCREENSHOT_DIR, 'naver.png'));

    console.log('테스트 완료!');
  } catch (error) {
    console.error('테스트 중 오류 발생:', error);
  } finally {
    if (chrome?.driver) {
      try {
        console.log('브라우저를 종료합니다...');
        await chrome.close();
      } catch (error) {
        console.error('브라우저 종료 중 오류 발생:', error);
      }
    }
  }
};

// /**
//  * Chrome 프로필 관련 기능 테스트
//  */
// const testChromeProfile = async () => {
//   console.log('\n=== Chrome 프로필 테스트 ===');

//   try {
//     // 프로필 정보 가져오기
//     const profile = await getProfileByEmail(CHROME_DEFAULT_USER_EMAIL);
//     if (!profile) {
//       throw new Error('프로필을 찾을 수 없습니다.');
//     }
//     console.log('프로필 정보:', profile);

//     // 프로필로 Chrome 인스턴스 생성
//     const chrome = new Chrome({
//       headless: false,
//       email: CHROME_DEFAULT_USER_EMAIL, // profile.email 대신 직접 사용
//       userDataDir: CHROME_DEFAULT_USER_DATA_DIR, // profile.userDataDir 대신 직접 사용
//     });

//     // 로그인이 필요한 사이트 접속 테스트
//     console.log('Gmail로 이동합니다...');
//     await chrome.goto('https://mail.google.com');
//     await chrome.driver.sleep(5000);

//     // 브라우저 종료
//     console.log('브라우저를 종료합니다...');
//     await chrome.close();

//     console.log('테스트 완료!');
//   } catch (error) {
//     console.error('테스트 중 오류 발생:', error);
//   }
// };

// /**
//  * Chrome 요소 조작 테스트
//  */
// const testChromeElements = async () => {
//   console.log('\n=== Chrome 요소 조작 테스트 ===');
//   let chrome = null;

//   try {
//     chrome = new Chrome({
//       headless: false,
//       email: CHROME_DEFAULT_USER_EMAIL,
//       userDataDir: CHROME_DEFAULT_USER_DATA_DIR,
//       arguments: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--window-size=1920,1080'],
//     });

//     // 드라이버 초기화
//     await chrome.init();
//     console.log('Chrome 드라이버가 초기화되었습니다.');

//     // 네이버 검색 테스트
//     console.log('네이버로 이동합니다...');
//     await chrome.goto('https://www.naver.com');
//     await chrome.driver.sleep(2000);

//     // 검색창 찾기 및 입력
//     console.log('검색어를 입력합니다...');
//     const searchInput = await chrome.findElement('input#query');
//     await searchInput.sendKeys('TypeScript 튜토리얼');
//     await chrome.driver.sleep(1000);

//     // 검색 버튼 클릭
//     console.log('검색 버튼을 클릭합니다...');
//     const searchButton = await chrome.findElement('button.btn_search');
//     await searchButton.click();
//     await chrome.driver.sleep(3000);

//     console.log('테스트 완료!');
//   } catch (error) {
//     console.error('테스트 중 오류 발생:', error);
//   } finally {
//     // 브라우저 종료
//     if (chrome) {
//       try {
//         console.log('브라우저를 종료합니다...');
//         await chrome.close();
//       } catch (error) {
//         console.error('브라우저 종료 중 오류 발생:', error);
//       }
//     }
//   }
// };

// 메인 테스트 실행
const main = async () => {
  try {
    await testChromeBasic();
    // await testChromeProfile();  // 프로필 테스트는 일단 제외
    // await testChromeElements();
  } catch (error) {
    console.error('테스트 실행 중 오류 발생:', error);
  }
};

// 테스트 실행
main();
