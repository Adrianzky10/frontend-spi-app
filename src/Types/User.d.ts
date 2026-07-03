interface IUser {
  id: string;
  full_name: string;
  nim: string;
  email: string;
  role_name: string;
  is_verified: boolean;
  created_at: string;
}

interface ICreateUser {
  full_name: string;
  nim: string;
  email: string;
  password: string;
  role_id: string;
}

interface IUpdateUser {
  full_name: string;
  nim: string;
  email: string;
  role_id: string;
  is_verified: boolean;
}

export type { IUser, ICreateUser, IUpdateUser };
