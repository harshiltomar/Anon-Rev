import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { MessageSchemaProps } from "@/model/User.model";
import { request } from "http";

export async function POST(request: Request) {
  // Connect to db
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    //Is User accepting the messages
    if (user.isAcceptingMessage) {
      return Response.json(
        {
          message: "User is not accepting messages",
          success: false,
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as MessageSchemaProps);

    await user.save();
  } catch (error) {
    console.error("Error adding message: ", error);
    return Response.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
