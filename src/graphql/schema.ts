import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "@/graphql/user/schema";

// 공통 타입 정의
const commonTypeDefs = `#graphql
  type Query {
    health: String
  }
`;

// 모든 스키마 통합
const typeDefs = mergeTypeDefs([commonTypeDefs, userTypeDefs]);

export { typeDefs };
