export type Bindings = {
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ENVIORNMENT: string;
};

export type Variables = {
  userId: string;
  isTokenUpdated?: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export type JWTDataType = {
  id: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
};

export type verifyTokenType = {
  accessToken: string;
  refreshToken: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
};
