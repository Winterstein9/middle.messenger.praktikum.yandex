import type { User, ChatUT } from "../../types/types";
import ChatUser from "../../components/chatUser/chatUser";
import { ChatUnit } from "../../components/chatUnit/chatUnit";
import SearchUser from "../../components/searchUser/searchUser";
export class CChatView {
  messageSelectDisplay: HTMLDivElement | null = document.querySelector(
    ".ch__div__selectChatDisplay"
  );
  chatDisplay: HTMLDivElement | null = document.querySelector(
    ".ch__div__chat__display"
  );
  userManagementDisplay: HTMLDivElement | null = document.querySelector(
    ".ch__div__userManagmentDisplay"
  );
  usersInChat: HTMLDivElement | null =
    document.querySelector(".ch__usersInChat");
  userList: HTMLDivElement | null = document.querySelector(".ch__users");
  chatListELDIV = document.querySelector(".ch__contacts");

  chatELDIV: HTMLDivElement | null =
    document.querySelector(".ch__div__messages");
  userID: number;
  fatalUser: any | null;
  chatUser = new ChatUser();
  chatUnit = new ChatUnit();
  searchUser = new SearchUser();

  display(displayElement: HTMLDivElement | null) {
    if (
      this.chatDisplay &&
      this.messageSelectDisplay &&
      this.userManagementDisplay
    ) {
      this.chatDisplay.style.display = "none";
      this.messageSelectDisplay.style.display = "none";
      this.userManagementDisplay.style.display = "none";
    }
    if (displayElement) {
      displayElement.style.display = "flex";
    }
  }

  setViewUserLogin(userData: User) {
    localStorage.setItem("Login", userData.login);
    this.fatalUser = userData;
    this.userID = userData.id;
    console.log(this.userID, typeof this.userID);
    const userName = document.querySelector(".ch__userName");
    if (userName) {
      userName.textContent = this.fatalUser.login;
    }
  }

  setViewChats(chats: [ChatUT]) {
    if (this.chatListELDIV) {
      this.chatListELDIV.innerHTML = this.makeChatList(chats);
    }
  }

  makeChatList(chats: any) {
    let chatList: string = "";
    chats.map((chat: ChatUT) => {
      chatList += this.chatUnit.makeChatUnit(
        chat.title,
        chat.avatar,
        chat.unread_count,
        chat.last_message,
        chat.id
      );
    });
    return chatList;
  }

  setViewChatUsers(chatUsers: [User]) {
    console.log("работает");
    let usersHTML: string = this.chatUser.makeUser(chatUsers, this.userID);
    if (this.usersInChat) {
      this.usersInChat.innerHTML = usersHTML;
    }
  }

  setViewDetectedUsers(users: [User]) {
    let usersHTML: string = this.searchUser.makeUser(users);
    if (this.userList) {
      this.userList.innerHTML = usersHTML;
    }
  }

  setViewMessage(login: string, content: string) {
    const divEL = document.createElement("div");
    divEL.appendChild(document.createTextNode(`${login}: ${content}`));
    divEL.className = "ch__div__message";
    if (this.chatELDIV) {
      this.chatELDIV.appendChild(divEL);
    }
  }
}
