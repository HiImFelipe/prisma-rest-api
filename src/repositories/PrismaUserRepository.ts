import { prismaClient } from "../database/PrismaClient";
import { User } from "../entities/User";
import { UserRepository } from "./contracts/UserRepository";
import { User as PrismaUser } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User | null> {
    try {
      const prismaUser = await prismaClient.user.create({
        data: user,
      });

      return this.convertPrismaUserToInternalUser(prismaUser);
    } catch (e) {
      console.log(e);

      return null;
    }
  }
  async findById(id: string): Promise<User | null> {
    try {
      const prismaUser = await prismaClient.user.findFirst({
        where: {
          id,
        },
      });

      if (!prismaUser) {
        throw new Error("User not found");
      }

      return this.convertPrismaUserToInternalUser(prismaUser);
    } catch (e) {
      console.log(e);

      return null;
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      const prismaUser = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (!prismaUser) {
        throw new Error("User not found");
      }

      return this.convertPrismaUserToInternalUser(prismaUser);
    } catch (e) {
      console.log(e);

      return null;
    }
  }
  async findAll(): Promise<User[] | null> {
    try {
      const prismaUsers = await prismaClient.user.findMany();

      if (!prismaUsers) {
        throw new Error("User not found");
      }

      return prismaUsers.map((prismaUser) =>
        this.convertPrismaUserToInternalUser(prismaUser)
      );
    } catch (e) {
      console.log(e);

      return null;
    }
  }
  async update(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): Promise<User | null> {
    try {
      const prismaUser = await prismaClient.user.update({
        where: {
          id,
        },
        data,
      });

      return this.convertPrismaUserToInternalUser(prismaUser);
    } catch (e) {
      console.log(e);

      return null;
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      await prismaClient.user.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  private convertPrismaUserToInternalUser(user: PrismaUser): User {
    return new User({
      email: user.email,
      name: user.name || "",
      password: user.password,
    });
  }
}
