import { PrismaClient } from "@prisma/client";

interface UserArgs {
  id: number;
  email?: string;
  name?: string;
}

export const userResolvers = {
  Query: {
    users: async (_: unknown, __: unknown, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.user.findMany();
    },
    user: async (_: unknown, { id }: UserArgs, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createUser: async (_: unknown, { email, name }: { email: string; name?: string }, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.user.create({
        data: { email, name },
      });
    },
    updateUser: async (_: unknown, { id, email, name }: UserArgs, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.user.update({
        where: { id },
        data: { email, name },
      });
    },
    deleteUser: async (_: unknown, { id }: UserArgs, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.user.delete({
        where: { id },
      });
    },
  },
};
