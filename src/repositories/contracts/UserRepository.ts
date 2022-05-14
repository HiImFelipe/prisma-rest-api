import { User } from "../../entities/User";

export interface UserRepository {
  create(user: User): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
  update(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
