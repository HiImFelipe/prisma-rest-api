import { User } from "../../entities/User";

type findAllUsersOptions = {
  where?: {
    [key: string]: any;
  };
  page?: number;
  limit?: number;
}

export interface UserRepository {
  create(user: User): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(options: findAllUsersOptions): Promise<User[] | null>;
  update(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
