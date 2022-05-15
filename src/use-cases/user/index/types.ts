import { User } from "../../../entities/User";
import { UseCaseResponse } from "../../../helpers/types/UseCaseResponse";

export type IndexUsersUseCaseParams = {
  page?: number;
  limit?: number;
  where?: {
    [key: string]: any;
  };
};

export type IndexUsersUseCaseResponse = UseCaseResponse<User[]>;
