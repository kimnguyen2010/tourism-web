import type { UserModel } from "../models/user.model.js";

export type GraphqlContext = {
  req?: unknown;
  authHeader: string;
  currentUser: UserModel | null;
};
