import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  full_name: string;
  nim: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role_name?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IUpdateProfile {
  full_name: string;
  email: string;
}

interface IChangePassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

interface IForgotPassword {
  email: string;
}

interface IResetPassword {
  token: string;
  password: string;
  confirm_password: string;
}

export type {
  SessionExtended,
  UserExtended,
  JWTExtended,
  IRegister,
  ILogin,
  IActivation,
  IUpdateProfile,
  IChangePassword,
  IForgotPassword,
  IResetPassword,
};
