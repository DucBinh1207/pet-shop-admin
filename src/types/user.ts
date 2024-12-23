export type UserType = {
  id: string;
  email: string;
  id_role: number;
  status: number;
  is_verified: boolean;
  image?: string;
  name?: string;
  nationality?: string;
  telephoneNumber?: string;
  district?: string;
  province?: string;
  street?: string;
  ward?: string;
};

export type ResponseGetUsersApi = {
  users: UserType[];
};
