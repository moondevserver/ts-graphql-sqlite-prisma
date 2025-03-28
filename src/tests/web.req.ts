import { reqGet, reqPost } from "@/lib/jnu-web";
// 사용하지 않는 import는 주석 처리
// import { reqGql, ChromeBasic, goChrome } from "@/lib/jnu-web";
// import { By } from "selenium-webdriver";

/**
 * JNU-WEB 라이브러리 함수 테스트
 * 
 * 각 함수의 기본 기능을 테스트하는 예제 코드
 */

/**
 * HTTP GET 요청 테스트
 */
const testReqGet = async () => {
  console.log('\n=== HTTP GET 요청 테스트 ===');
  
  try {
    // 공개 API를 사용한 GET 요청 테스트
    const result = await reqGet('https://jsonplaceholder.typicode.com/todos/1');
    console.log('GET 요청 결과:', result);
    
    // 쿼리 파라미터를 포함한 GET 요청 테스트
    const resultWithParams = await reqGet('https://httpbin.org/get', {
      params: {
        page: 1,
        limit: 10,
        search: '테스트 검색어'
      }
    });
    console.log('GET 요청 (쿼리 파라미터 포함) 결과:', resultWithParams);
    
    // 추가 설정을 포함한 GET 요청 테스트
    const resultWithConfig = await reqGet('https://httpbin.org/headers', {
      config: {
        headers: {
          'X-Custom-Header': 'Test-Header-Value',
          'User-Agent': 'JNU-WEB-Test'
        }
      }
    });
    console.log('GET 요청 (설정 포함) 결과:', resultWithConfig);
  } catch (error) {
    console.error('GET 요청 테스트 오류:', error);
  }
};

/**
 * HTTP POST 요청 테스트
 */
const testReqPost = async () => {
  console.log('\n=== HTTP POST 요청 테스트 ===');
  
  try {
    // JSON 데이터를 전송하는 POST 요청 테스트
    const result = await reqPost('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: '테스트 제목',
        body: '테스트 내용',
        userId: 1
      }
    });
    console.log('POST 요청 결과:', result);
    
    // FormData를 직접 전달할 때는 data로 감싸지 않고 FormData 객체를 직접 넘겨야 합니다.
    // 이 부분은 reqPost 함수 구현이 실제 FormData 객체를 지원하는지에 따라 달라질 수 있습니다.
    // 아래는 데이터를 객체 형태로 전달하는 예시입니다.
    const formDataTest = await reqPost('https://httpbin.org/post', {
      data: {
        username: 'testuser',
        password: 'testpass'
      }
    });
    console.log('POST 요청 (폼 데이터 유사) 결과:', formDataTest);
    
    // 추가 설정을 포함한 POST 요청 테스트
    const resultWithConfig = await reqPost('https://httpbin.org/post', {
      data: { 
        message: 'Test Data'
      }, 
      config: {
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'Test-Header-Value'
        }
      }
    });
    console.log('POST 요청 (설정 포함) 결과:', resultWithConfig);
  } catch (error) {
    console.error('POST 요청 테스트 오류:', error);
  }
};

/**
 * GraphQL 요청 테스트 (주석 처리)
 */
/*
const testReqGql = async () => {
  console.log('\n=== GraphQL 요청 테스트 ===');
  
  try {
    // 공개 GraphQL API를 사용한 요청 테스트 (예시)
    const query = `
      query {
        repository(owner: "facebook", name: "react") {
          name
          description
          stargazerCount
        }
      }
    `;
    
    // 실제 API 호출은 주석 처리 (예시만 제공)
    /*
    const result = await reqGql('https://api.github.com/graphql', {
      query,
      config: {
        headers: {
          'Authorization': 'Bearer YOUR_GITHUB_TOKEN'
        }
      }
    });
    console.log('GraphQL 요청 결과:', result);
    *//*
    
    // 예시 응답 출력 (실제 호출하지 않음)
    console.log('GraphQL 요청 예시 (GitHub API - React 저장소 정보):');
    console.log({
      data: {
        repository: {
          name: 'react',
          description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
          stargazerCount: 200000 // 예시 값
        }
      }
    });
    
    // 변수를 포함한 GraphQL 쿼리 예시
    const queryWithVars = `
      query {
        user(login: \${login}) {
          name
          bio
          avatarUrl
        }
      }
    `;
    
    // 실제 API 호출은 주석 처리 (예시만 제공)
    /*
    const resultWithValues = await reqGql('https://api.github.com/graphql', {
      query: queryWithVars,
      values: {
        login: 'octocat'
      },
      config: {
        headers: {
          'Authorization': 'Bearer YOUR_GITHUB_TOKEN'
        }
      }
    });
    console.log('GraphQL 요청 (변수 포함) 결과:', resultWithValues);
    *//*
    
    // 예시 응답 출력 (실제 호출하지 않음)
    console.log('GraphQL 요청 예시 (GitHub API - 사용자 정보):');
    console.log({
      data: {
        user: {
          name: 'The Octocat',
          bio: 'GitHub mascot',
          avatarUrl: 'https://github.com/octocat.png'
        }
      }
    });
  } catch (error) {
    console.error('GraphQL 요청 테스트 오류:', error);
  }
};
*/


/**
 * 메인 테스트 함수
 */
const runTests = async () => {
  console.log('===== JNU-WEB 라이브러리 테스트 시작 =====');
  
  // HTTP 요청 테스트
  await testReqGet();
  await testReqPost();
  // GraphQL 및 브라우저 자동화 테스트는 필요 시 주석 해제
  // await testReqGql();
  // await testChromeBasic();
  // await testGoChrome();
  
  console.log('\n===== JNU-WEB 라이브러리 테스트 완료 =====');
};

// 테스트 실행
runTests().catch(error => {
  console.error('테스트 실행 중 오류 발생:', error);
});


