import { User } from "../../../entities/User";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { MockUserRepository } from "../../../repositories/MockUserRepository";
import { CreateUserUseCaseParams } from "./types";
import { makeFakeUser } from "../../../helpers/fakers/MakeFakeUser";

describe("CreateUserUseCase", () => {
  let sut: CreateUserUseCase;
  let params: CreateUserUseCaseParams;
  let fakeUser: User;

  beforeAll(() => {
    fakeUser = makeFakeUser();
    MockUserRepository.create.mockResolvedValue(fakeUser);
    MockUserRepository.findByEmail.mockResolvedValue(fakeUser);
  });

  beforeEach(() => {
    sut = new CreateUserUseCase(MockUserRepository);
    params = { user: fakeUser };
  });

  it("should be defined", () => {
    expect(CreateUserUseCase).toBeDefined();
  });

  it("should create a new user", async () => {
    MockUserRepository.findByEmail.mockResolvedValueOnce(null);

    await sut.execute(params);

    expect(MockUserRepository.create).toHaveBeenCalledWith(params.user);
  });

  it("should not create a new user (email already taken)", async () => {
    const [_, error] = await sut.execute(params);

    expect(error!.message).toBe("Email already exists");
  });

  it("should throw an error if user is not created", async () => {
    MockUserRepository.findByEmail.mockResolvedValueOnce(null);
    MockUserRepository.create.mockResolvedValueOnce(null);

    const [_, error] = await sut.execute(params);

    expect(error!.message).toBe("Error while creating user");
  });
});
