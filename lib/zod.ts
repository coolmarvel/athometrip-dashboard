import { object, string } from 'zod';

/**
 * Zod로 데이터 검증
 *
 * @author 김이안
 */
export const signInSchema = object({
  userId: string({ required_error: "userId" })
    .min(1, "UserId is required")
    .max(50, "UserId must be less than 50 characters"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters"),
})
