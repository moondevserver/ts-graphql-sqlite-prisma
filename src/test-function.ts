import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

// 환경 변수 로드
dotenv.config()

// Prisma 클라이언트 초기화
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

/**
 * 테스트하려는 함수를 여기에 작성합니다
 */
async function testFunction() {
  // 예: 모든 사용자 조회
  const users = await prisma.user.findMany({
    include: { 
      // 관계가 있는 경우 포함
    }
  })
  
  console.log('Users:', JSON.stringify(users, null, 2))
  
  // 여기에 새로운 함수를 추가하고 테스트합니다
  const result = await myNewFunction()
  console.log('New function result:', result)
  
  return { users, result }
}

/**
 * 새로 만들고 싶은 함수
 */
async function myNewFunction() {
  // 여기에 새로운 함수 로직을 구현합니다
  // 예: 특정 조건의 데이터 조회, 집계, 복잡한 쿼리 등
  
  const result = await prisma.user.count()
  return {
    count: result,
    timestamp: new Date().toISOString()
  }
}

// 함수 실행 및 종료 처리
async function main() {
  try {
    console.log('Starting test...')
    const result = await testFunction()
    console.log('Test completed successfully!')
    return result
  } catch (error) {
    console.error('Test failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// 스크립트 실행
main()
  .then(result => console.log('Final result:', result))
  .catch(e => {
    console.error('Error in main execution:', e)
    process.exit(1)
  }) 