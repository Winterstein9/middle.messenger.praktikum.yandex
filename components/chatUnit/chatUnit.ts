import "./chatUnit.styl";
import chatUnit from "./chatUnit.hbs";
import { LastMessage } from "../../types/types";
export type { MessageT, ChatT, ChatUT };

export class ChatUnit {
  makeChatUnit(
    title: string,
    avatar?: string,
    unread_count?: string | null,
    last_message?: LastMessage,
    id?: number
  ) {
    return chatUnit({
      title: title,
      avatar: avatar,
      unread_count: unread_count,
      last_message: last_message,
      id: id,
    });
  }
}

type ChatUT = {
  title: string;
  avatar?: string;
  unread_count?: string | null;
  last_message?: LastMessage;
  id?: number;
};

type ChatT = {
  first_name: string;
  last_message?: string;
  unread_count?: string | null;
  time?: string;
  content?: string | null;
  avatar?: string | null;
};

type MessageT = {
  message?: string;
  img?: string;
  time: string;
  myMessage?: string;
};
