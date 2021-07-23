export interface IRefreshTokensDTO {
  id: string;
  user_id: string;
  token: string;
  expiresIn: Date;
  created_at: Date;
}
