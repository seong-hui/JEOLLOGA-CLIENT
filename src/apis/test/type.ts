import { TestType } from '@constants/test';

export interface TestResponse {
  code: TestType;
  tagline: string;
  description: string;
  requirement: string;
  bestMate: string;
  worstMate: string;
}
