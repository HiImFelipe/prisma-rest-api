import { HttpError } from "../HttpError";

export type UseCaseResponse<T> = [T | null, HttpError | null];
