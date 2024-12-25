export type UserType = {
  id: string;
  email: string;
  idRole: number;
  status: number;
  isVerified: boolean;
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
  totalPages: number;
};
