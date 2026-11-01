import { prisma } from "../prisma";

export const getUserWorkspaces = async (userId: string) => {
  return prisma.workspace.findMany({
    where: { userId },
    select: {
      id: true,
      username: true,
      fullName: true,
    },
    orderBy: { createdAt: "asc" },
  });
};
