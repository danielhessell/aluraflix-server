export interface ICreateRefreshTokenDTO {
  user_id: string;
  token: string;
  expiresIn: Date;
}
