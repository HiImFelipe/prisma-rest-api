import { User } from "../../../entities/User";
import { HttpError } from "../../../helpers/HttpError";
import { UserRepository } from "../../../repositories/contracts/UserRepository";
import { ShowUserUseCaseParams, ShowUserUseCaseResponse } from "./types";

export class ShowUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: ShowUserUseCaseParams): Promise<ShowUserUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return [
        null,
        {
          message: "User not found",
          status: 404,
        },
      ];
    }

    return [user, null];
  }
}
