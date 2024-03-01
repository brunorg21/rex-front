export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  avatarUrlId: string | null;
  bio: string;
}

export interface IUser {
  token: string;
  user: UserData;
}
