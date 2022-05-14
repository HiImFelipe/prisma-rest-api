import "express-async-errors";
import { Router as router } from "express";
import { CreateUserController } from "../controllers/user/create/CreateUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { CreateUserUseCase } from "../use-cases/user/create/CreateUserUseCase";

const userRouter = router();

const prismaUserRepository = new PrismaUserRepository();
const createUserUseCase = new CreateUserUseCase(prismaUserRepository);
const createUserController = new CreateUserController(createUserUseCase);

userRouter.post("/user", async (req, res) => {
  await createUserController.execute(req, res);
});
userRouter.get("/user", () => {});
userRouter.get("/user/:id", () => {});
userRouter.put("/user/:id", () => {});
userRouter.delete("/user/:id", () => {});

export { userRouter };
