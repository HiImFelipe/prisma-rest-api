import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

type Params = {
  name: string;
  email: string;
  password: string;
}

export class User {
  private readonly _id: string;
  private readonly _createdAt: Date;

  private _name: string;
  private _email: string;
  private _password: string;
  private _updatedAt: Date;

  constructor(params: Params) {
    this._name = params.name;
    this._email = params.email;
    this._password = this.passwordHash(params.password);

    this._id = randomUUID();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    this._updatedAt = new Date();
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
    this._updatedAt = new Date();
  }

  get password() {
    return this._password;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set password(password: string) {
    this._password = this.passwordHash(password);
    this._updatedAt = new Date();
  }

  getFirstName(): string {
    return this._name.split(" ")[0];
  }

  getLastName(): string {
    const splittedName = this._name.split(" ");

    return splittedName[splittedName.length - 1];
  }

  private passwordHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
