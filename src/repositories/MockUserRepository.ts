import { User } from "../entities/User";

export const MockUserRepository = {
  create: jest.fn<Promise<User | null>, [user: User]>(),
  findById: jest.fn<Promise<User | null>, [id: string]>(),
  findByEmail: jest.fn<Promise<User | null>, [email: string]>(),
  findAll: jest.fn<Promise<User[] | null>, []>(),
  update: jest.fn<
    Promise<User | null>,
    [id: string, user: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>]
  >(),
  delete: jest.fn<Promise<boolean>, [id: string]>(),
};
