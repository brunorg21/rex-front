export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar_url: string | null;
}

export interface IUser {
  token: string;
  user: UserData;
}
