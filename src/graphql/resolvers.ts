import { userResolvers } from "@/graphql/user/resolvers";

// 공통 리졸버
const commonResolvers = {
  Query: {
    health: () => "OK - GraphQL Server is running",
  },
};

const resolvers = {
  Query: {
    ...commonResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

export { resolvers };
