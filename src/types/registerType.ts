export interface registerType {
  email: string;
  nickname: string;
  password: string;
  image: File | null;
  food: string[];
}

export interface emailType {
  email: string;
}

export interface nicknameType {
  nickname: string;
}
