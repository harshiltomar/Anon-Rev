import { MessageSchemaProps } from "@/model/User.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;

  // Suppose if user sent only message or you might send an API resposne such that you collect lots of messages from DB and you wanna show those messages
  // So this code makes a message array in which each index will be of interface MessageSchemaProps which basically verifies it to be a string + createdAt
  // The ? ensures that this remains optional
  messages?: Array<MessageSchemaProps>;
}
