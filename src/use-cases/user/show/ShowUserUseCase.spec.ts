import faker from "@faker-js/faker";
import { User } from "../../../entities/User";
import { MockUserRepository } from "../../../repositories/MockUserRepository";
import { ShowUserUseCase } from "./ShowUserUseCase";
import { ShowUserUseCaseParams } from "./types";

describe("ShowUserUseCase", () => {
  let sut: ShowUserUseCase;
  let params: ShowUserUseCaseParams;

  beforeEach(() => {
    sut = new ShowUserUseCase(MockUserRepository);
    params = {
      id: faker.datatype.string(),
    };
  });

  it("should be defined", () => {
    expect(ShowUserUseCase).toBeDefined();
  })

  describe('getting a user', () => {
    it('should call getById with correct values', async () => {
      await sut.execute(params);

      expect(MockUserRepository.findById).toHaveBeenCalledWith(params.id);
    })

    it('should return a HttpError if user is not found', async () => {
      MockUserRepository.findById.mockResolvedValueOnce(null);

      const [_, error] = await sut.execute(params);

      expect(error!.message).toBe('User not found');
    })
  })

  describe('return values', () => {
    it('should return a user', async () => {
      const user = new User({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      MockUserRepository.findById.mockResolvedValueOnce(user);

      const [result, _] = await sut.execute(params);

      expect(result).toBe(user);
    })
  })
});
