import { User } from "../../../entities/User";
import { makeFakeUser } from "../../../helpers/fakers/MakeFakeUser";
import { MockUserRepository } from "../../../repositories/MockUserRepository";
import { IndexUsersUseCase } from "./IndexUsersUseCase";
import { IndexUsersUseCaseParams } from "./types";

describe("IndexUsersUseCase", () => {
  let sut: IndexUsersUseCase;
  let params: IndexUsersUseCaseParams;
  let fakeUsers: User[];

  beforeAll(() => {
    sut = new IndexUsersUseCase(MockUserRepository);
    params = {
      page: 1,
      limit: 5,
    };
  });

  beforeEach(() => {
    fakeUsers = Array.from({ length: 5 }, makeFakeUser);
    MockUserRepository.findAll.mockResolvedValue(Array.from({ length: 5 }));
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  describe("getting users", () => {
    it("should call findAll with correct values", async () => {
      const { findAll } = MockUserRepository;

      await sut.execute(params);

      expect(findAll).toHaveBeenCalledWith(params);
    });

    it("should return an error message if findAll fails", async () => {
      const { findAll } = MockUserRepository;

      findAll.mockResolvedValue(null);

      const [_, error] = await sut.execute(params);

      expect(error).toBeTruthy();
      expect(error).toEqual({
        message: "Error while fetching users",
        status: 500,
      });
    });
  });

  describe("return values", () => {
    it("should return values", async () => {
      const randomNumberFromZeroToTen = Math.floor(Math.random() * 10);

      params.limit = randomNumberFromZeroToTen;

      const fakeUsers = Array.from(
        { length: randomNumberFromZeroToTen },
        makeFakeUser
      );

      MockUserRepository.findAll.mockResolvedValue(fakeUsers);

      const [users] = await sut.execute(params);

      expect(users).toStrictEqual(fakeUsers);
    });
  });
});
