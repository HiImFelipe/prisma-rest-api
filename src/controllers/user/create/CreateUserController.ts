import { Request, Response } from "express";
import * as Yup from "yup";
import { User } from "../../../entities/User";
import { CreateUserUseCase } from "../../../use-cases/user/create/CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await schema.validate(req.body);

      const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });

      const [response, error] = await this.createUserUseCase.execute({ user });

      if (error) {
        return res
          .status(error.status)
          .json({ status: error.status, message: error.message });
      }

      return res.status(201).json({
        status: 201,
        data: response,
        message: "User created successfully",
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
}
