import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      role_name?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role_name: string;
    accessToken: string;
  }
}
