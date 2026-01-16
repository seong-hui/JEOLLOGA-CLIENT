export interface UserNicknameResponse {
  nickname: string;
}

export interface OnboardingDataV2 {
  userId: number;
  ageRange: string | null;
  gender: string | null;
  religion: string | null;
  hasExperience: string | null;
}

export interface OnboardingResponseV2 {
  code: number;
  msg: string;
}

export interface MyPageType {
  nickname: string;
  email: string;
  ageRange?: string;
  gender?: string;
  religion?: string;
  hasExperience?: boolean;
}

export interface MyPageResponse {
  type: string | null;
  typeContent: string | null;
  nickname: string;
  email: string;
  hasType: boolean;
}
