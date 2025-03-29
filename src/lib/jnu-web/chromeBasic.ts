import { Builder, By, WebDriver, WebElement } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * ChromeDriver 설치 확인 및 설치
 */
const ensureChromeDriver = () => {
  try {
    // ChromeDriver 실행 테스트
    execSync('chromedriver --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('ChromeDriver가 설치되어 있지 않습니다. 설치를 시도합니다...');
    try {
      // ChromeDriver 설치 (Ubuntu/Debian 기준)
      execSync('sudo apt-get update && sudo apt-get install -y chromium-chromedriver');
      console.log('ChromeDriver 설치 완료');
    } catch (installError) {
      console.error('ChromeDriver 설치 실패:', installError);
      throw new Error('ChromeDriver 설치에 실패했습니다. 수동으로 설치해주세요.');
    }
  }
};

class ChromeBasic {
  public driver: WebDriver | null = null;

  async initialize(options: { headless?: boolean; arguments?: string[] }) {
    const chromeOptions = new chrome.Options();

    // 기본 옵션 설정
    if (options.headless) {
      chromeOptions.addArguments('--headless=new');
    }

    // 고유한 사용자 데이터 디렉토리 설정
    const uniqueUserDir = `/tmp/chrome-user-dir-${uuidv4()}`;
    chromeOptions.addArguments(`--user-data-dir=${uniqueUserDir}`);

    // 자동화 감지 우회를 위한 기본 인자
    const defaultArguments = [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ];

    // 기본 인자와 사용자 지정 인자를 합치기
    const finalArguments = [...defaultArguments, ...(options.arguments || [])];

    // 최종 인자 설정
    finalArguments.forEach((arg) => chromeOptions.addArguments(arg));

    // 원격 Selenium 서버 사용
    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub')
      .build();
  }

  async goto(url: string) {
    if (!this.driver) {
      throw new Error('Chrome 드라이버가 초기화되지 않았습니다.');
    }
    await this.driver.get(url);
  }

  async close() {
    if (this.driver) {
      try {
        await this.driver.quit();
        this.driver = null;
      } catch (error) {
        console.error('브라우저 종료 중 오류:', error);
      }
    }
  }
}

const goChrome = async (url: string) => {
  const chrome = new ChromeBasic();
  try {
    await chrome.initialize({ headless: true });
    await chrome.goto(url);
    return chrome.driver;
  } catch (error) {
    await chrome.close();
    throw error;
  }
};

export { ChromeBasic, goChrome };
