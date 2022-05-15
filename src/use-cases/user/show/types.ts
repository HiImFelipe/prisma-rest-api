import { User } from "../../../entities/User";
import { UseCaseResponse } from "../../../helpers/types/UseCaseResponse";

export type ShowUserUseCaseParams = {
  id: string;
};

export type ShowUserUseCaseResponse = UseCaseResponse<User>;
