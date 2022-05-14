import { User } from "../../../entities/User";
import { CreateUserUseCase } from "./CreateUserUseCase";
import faker from "@faker-js/faker";
import { MockUserRepository } from "../../../repositories/MockUserRepository";

const fakeUser = new User({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("CreateUserUseCase", () => {
  let sut: CreateUserUseCase;
  let params: User;

  beforeAll(() => {
    MockUserRepository.create.mockResolvedValue(fakeUser);
    MockUserRepository.findByEmail.mockResolvedValue(fakeUser);
  });

  beforeEach(() => {
    sut = new CreateUserUseCase(MockUserRepository);
    params = fakeUser;
  });

  it("should be defined", () => {
    expect(CreateUserUseCase).toBeDefined();
  });

  it("should create a new user", async () => {
    MockUserRepository.findByEmail.mockResolvedValueOnce(null);

    await sut.execute(params);

    expect(MockUserRepository.create).toHaveBeenCalledWith(params);
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
