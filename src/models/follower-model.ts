interface IFollower {
  id: number;
  follower_username: string;
  follower_avatar_url: string;
  userId: number;
}

export interface IFollowerData {
  followersCount: number;
  followingCount: number;
  followersRelated: IFollower[];
}
