import { User } from "../../../entities/User";
import { CreateUserUseCase } from "../../../use-cases/user/create/CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { mock } from "jest-mock-extended";
import { Request, Response } from "express";

const mockCreateUserUseCase = mock<CreateUserUseCase>();

describe("CreateUserController", () => {
  let sut: CreateUserController;
  let params: {
    req: {
      body: {
        data: User;
      };
    };
  };

  beforeEach(() => {
    sut = new CreateUserController(mockCreateUserUseCase);
  });

  it("should be defined", () => {
    expect(CreateUserController).toBeDefined();
  });

  it('should fail if "req.body.data" is not defined', async () => {
    params = {
      req: {
        body: {
          data: undefined as unknown as User,
        },
      },
    };

    await expect(
      sut.execute(params as unknown as Request, {} as unknown as Response)
    ).rejects.toThrow(Error);
  });
});
