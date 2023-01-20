import "./chatUnit.styl";
import chatUnit from "./chatUnit.hbs";
import { LastMessage } from "../../types/types";
export type { MessageT, ChatT, ChatUT };

export class ChatUnit {

  yandexPathAvatar: string = "https://ya-praktikum.tech/api/v2/resources";
  shortString?:string

  makeShortString(text?:string){
    if(text&&text.length>30){
      this.shortString=text.slice(0,27)+"..."
    }else if(this.shortString){
      this.shortString=undefined
    }
  }

  makeChatUnit(
    title: string,
    unread_count?: string | null,
    last_message?: LastMessage,
    id?: number
  ) {

    this.makeShortString(last_message?.content)

    return chatUnit({
      title: title,
      avatar: this.yandexPathAvatar + last_message?.user.avatar,
      unread_count: unread_count,
      lastMessage: this.shortString || last_message?.content,
      login: last_message?.user.login,
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
