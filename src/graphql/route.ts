import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Express, Request, Response } from "express";
import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

interface GraphQLContext {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}

const setupGraphQLServer = async (app: Express, prisma: PrismaClient) => {
  // GraphQL 서버 설정
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    introspection: true,
  });

  // 서버 시작
  await server.start();

  // GraphQL 미들웨어 설정
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        prisma,
        req,
        res,
      }),
    })
  );

  return { server };
};

export { GraphQLContext, setupGraphQLServer };
