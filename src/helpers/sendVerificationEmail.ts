import { resend } from "@/lib/resend";
import VerificationEmail from "../../components/emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "harshilkiemail@gmail.com",
      to: email,
      subject: "Anon-Rev | Verification Code Email",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    //
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification Email" };
  }
}
