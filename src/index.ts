import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { setupGraphQLServer } from "@/graphql/route";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트

const startServer = async () => {
  try {
    // GraphQL 서버 설정
    await setupGraphQLServer(app, prisma);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`GraphQL API is available at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer().catch(console.error);
