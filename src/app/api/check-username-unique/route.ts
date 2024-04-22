import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  // TODO: use this in all other routes
  await dbConnect();

  try {
    //gives the full request as a url and then you can use it to destructure it
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    // Validate with Zod
    const result = UsernameQuerySchema.safeParse(queryParams);

    // TODO: remove on production
    console.log(result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error checking username", error);

    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
