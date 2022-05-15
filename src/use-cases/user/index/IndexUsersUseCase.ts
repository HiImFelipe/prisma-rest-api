import { UserRepository } from "../../../repositories/contracts/UserRepository";
import { IndexUsersUseCaseParams, IndexUsersUseCaseResponse } from "./types";

export class IndexUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    limit = 5,
    page = 1,
  }: IndexUsersUseCaseParams): Promise<IndexUsersUseCaseResponse> {
    const usersFound = await this.userRepository.findAll({
      limit,
      page,
    });

    if (!usersFound) {
      return [
        null,
        {
          message: "Error while fetching users",
          status: 500,
        },
      ];
    }

    return [usersFound, null];
  }
}
