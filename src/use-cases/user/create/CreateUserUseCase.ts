import { User } from "../../../entities/User";
import { UserRepository } from "../../../repositories/contracts/UserRepository";

type HttpError = {
  status: number;
  message: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<[User | null, HttpError | null]> {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      user.email
    );

    if (emailAlreadyExists)
      return [
        null,
        {
          status: 400,
          message: "Email already exists",
        },
      ];

    const userCreated = await this.userRepository.create(user);

    if (!userCreated)
      return [
        null,
        {
          status: 500,
          message: "Error while creating user",
        } as HttpError,
      ];

    return [userCreated, null];
  }
}
