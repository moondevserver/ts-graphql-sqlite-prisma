import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

// 환경 변수 로드
dotenv.config()

// Prisma 클라이언트 초기화
const prisma = new PrismaClient({
  log: ['query', 'error'],
})

/**
 * 여기에 테스트하려는 새로운 함수를 작성합니다
 */
async function myNewFunction() {
  // 예시: 파일 크기에 따른 그룹화와 통계
  const fileSizeStats = await prisma.file.groupBy({
    by: ['type'],
    _count: {
      id: true
    },
    _sum: {
      size: true
    },
    _avg: {
      size: true
    },
    _max: {
      size: true
    },
    _min: {
      size: true
    }
  })

  // 결과 포맷팅 및 반환
  const formattedResults = fileSizeStats.map(stat => ({
    fileType: stat.type,
    count: stat._count.id,
    totalSizeBytes: stat._sum.size,
    totalSizeMB: (stat._sum.size / (1024 * 1024)).toFixed(2) + ' MB',
    avgSizeKB: (stat._avg.size / 1024).toFixed(2) + ' KB',
    maxSizeKB: (stat._max.size / 1024).toFixed(2) + ' KB',
    minSizeKB: (stat._min.size / 1024).toFixed(2) + ' KB'
  }))

  return formattedResults
}

/**
 * 테스트 실행 함수
 */
async function runTest() {
  console.log('🧪 새 함수 테스트 시작...')
  const result = await myNewFunction()
  console.log('🔍 함수 결과:', JSON.stringify(result, null, 2))
  return result
}

/**
 * 메인 함수
 */
async function main() {
  try {
    console.log('🚀 테스트 시작...')
    const result = await runTest()
    console.log('✅ 테스트 완료!')
    return result
  } catch (error) {
    console.error('❌ 테스트 실패:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// 실행
main()
  .then(result => console.log('🎉 최종 결과:', result))
  .catch(e => {
    console.error('💥 오류 발생:', e)
    process.exit(1)
  }) 