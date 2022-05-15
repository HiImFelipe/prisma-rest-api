import faker from "@faker-js/faker";
import { User } from "../../entities/User";

export const makeFakeUser = (): User => {
  return new User({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
};
