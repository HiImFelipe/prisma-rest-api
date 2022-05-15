import { User } from "../../../entities/User";
import { UseCaseResponse } from "../../../helpers/types/UseCaseResponse";

export type CreateUserUseCaseParams = {
  user: User;
};

export type CreateUserUseCaseResponse = UseCaseResponse<User>;
