import { ChatUnit } from "../../components/chatUnit/chatUnit";
import type { ChatUT } from "../../components/chatUnit/chatUnit";
import SearchUser from "../../components/searchUser/searchUser";
import ChatUser from "../../components/chatUser/chatUser";
import { CRequests } from "./CRequests";
import type { User } from "../../types/types";

export class CChat {
  chatList: string = "";
  parentSelector: string = ".ch__contacts";
  elementSelector: string = ".ch__chatUnit";
  userListSelector: string = ".ch__users";
  userList: HTMLDivElement | null = document.querySelector(
    this.userListSelector
  );
  activeChat: HTMLDivElement | null = null;
  searchUser = new SearchUser();
  chatUser = new ChatUser();
  chatUnit = new ChatUnit();
  usersHTML: string;
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
  chatID: string | null;
  userID: number;
  addedUsersToChat: [any];
  fatalUser: any | null;
  socket: WebSocket | null;
  chatELDIV: HTMLDivElement | null =
    document.querySelector(".ch__div__messages");

  userNameElSpan = document.querySelector(".ch__userName");

  CRequests: CRequests = new CRequests();

  private static _exit: CChat;

  constructor() {
    if (CChat._exit) {
      return CChat._exit;
    }
    CChat._exit = this;

    if (document.location.pathname == "/chats" && this.fatalUser == null) {
      this.getUserData();
      this.addChatList();
      this.sendMessage();
    }
    this.display(this.messageSelectDisplay);
  }

  searchUser2(userLogin: string) {
    this.CRequests.requestSerchUsers(userLogin).then((users: [User]) => {
      let usersHTML: string = this.searchUser.makeUser(users);
      if (this.userList) {
        //----view
        this.userList.innerHTML = usersHTML;
        this.eventAddUserToChat();
      }
    });
  }

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

  addChatList() {
    this.display(this.messageSelectDisplay);
    this.CRequests.requestGetChats()
      .then((chats) => {
        const parent = document.querySelector(this.parentSelector);
        if (parent) {
          parent.innerHTML = this.makeChatList(chats);
          this.addEventChat();
        }
      })
      .catch((err: string) => {
        console.error("error", err);
      });
  }

  addNewСhat(chatName: string) {
    this.CRequests.requestAddNewChat(chatName)
      .then(() => {
        this.addChatList();
      })
      .catch((err: string) => {
        console.error("error", err);
      });
  }

  addEventChat() {
    let CL = document.querySelectorAll(this.elementSelector);
    CL.forEach((chat: HTMLDivElement) => {
      if (chat) {
        this.addEventDelChat(chat);
        this.addEventSerchUsersPanel(chat);
      }
      chat.addEventListener("click", () => {
        if (this.chatDisplay && this.messageSelectDisplay) {
          if (this.activeChat != chat) {
            if (this.activeChat != null) {
              this.activeChat.style.border = "";
            }
            this.activeChat = chat;
            chat.style.border = "1px solid silver";
            this.messageSelectDisplay.style.display = "none";
            this.chatID = chat.getAttribute("data-id");
            this.startSocket();
            this.display(this.chatDisplay);
          } else {
            chat.style.border = "";
            this.display(this.messageSelectDisplay);
            if (this.activeChat != null) {
              this.activeChat = null;
            }
          }
        }
      });
    });
  }

  addEventSerchUsersPanel(chat: HTMLDivElement) {
    const linkUsers: HTMLSpanElement | null =
      chat.querySelector(".ch__chatUsers");
    if (linkUsers) {
      linkUsers.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (linkUsers) {
          this.chatID = chat.getAttribute("data-id");
          this.getChatUsers();
          this.display(this.userManagementDisplay);
        }
      });
    }
  }

  addEventDelChat(chat: HTMLDivElement) {
    const delChat = chat.querySelector(".ch__delChat");
    if (delChat) {
      delChat.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (delChat) {
          this.chatID = chat.getAttribute("data-id");
          this.CRequests.requestDelChat(this.chatID).then(() => {
            this.addChatList();
          });
        }
      });
    }
  }

  eventAddUserToChat() {
    const addUser = document.querySelectorAll(".ch__addUser");
    addUser.forEach((user) => {
      let userID = user.getAttribute("data-id");
      user.addEventListener("click", () => {
        if (this.userOverlap(userID) == false) {
          this.CRequests.requestAddUserToChat(userID, this.chatID)
            .then(() => {})
            .then(() => {
              this.getChatUsers();
            })
            .catch((err: string) => {
              console.error("error", err);
            });
        }
      });
    });
  }

  getChatUsers() {
    this.CRequests.requestGetUsersInChat(this.chatID).then((chatUsers) => {
      let usersHTML: string = this.chatUser.makeUser(chatUsers, this.userID);
      if (this.usersInChat) {
        this.usersInChat.innerHTML = usersHTML;
      }
      this.addUsersToarray(chatUsers);
      this.addEventDelUserFromChat();
    });
  }

  userOverlap(userID: string | null) {
    let x = 0;
    do {
      if (this.addedUsersToChat[x].id == userID) {
        return true;
      }
      x++;
    } while (x < this.addedUsersToChat.length);
    return false;
  }

  addUsersToarray(users: [any]) {
    this.addedUsersToChat = [...users];
  }

  addEventDelUserFromChat() {
    const delUser = document.querySelectorAll(".ch__delUser");
    delUser.forEach((user) => {
      user.addEventListener("click", (e) => {
        e.preventDefault();
        let userID = user.getAttribute("data-id");
        this.CRequests.requestDelUserFromChat(userID, this.chatID)
          .then(() => {
            this.getChatUsers();
          })
          .catch((err: string) => {
            console.error("error", err);
          });
      });
    });
  }

  getUserData() {
    this.CRequests.requestGetUserData()
      .then((userData: User) => {
        console.log("hello", userData);
        this.setViewUserLogin(userData);
      })
      .catch((err: string) => {
        console.error("error", err);
      });
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

  startSocket() {
    this.CRequests.requestGetChatToken(this.chatID)
      .then((ans) => {
        this.socket = new WebSocket(
          `wss://ya-praktikum.tech/ws/chats/${this.fatalUser.id}/${this.chatID}/${ans.token}`
        );
        this.socket.addEventListener("open", () => {
          if (this.socket) {
            this.socket.onmessage = (ansFromServer) => {
              const data = JSON.parse(ansFromServer.data);
              if (data.type == "message") {
                const divEL = document.createElement("div");
                divEL.appendChild(
                  document.createTextNode(`${data.login}: ${data.content}`)
                );
                divEL.className = "ch__div__message";
                if (this.chatELDIV) {
                  this.chatELDIV.appendChild(divEL);
                }
              }
            };
          }
        });
      })
      .catch((err: string) => {
        console.error("error", err);
      });
  }

  sendMessage() {
    const formEL = document.querySelector(".ch__form__sendMessage");
    if (formEL) {
      formEL.addEventListener("submit", (e) => {
        e.preventDefault();
        let messageEL: HTMLTextAreaElement | null =
          formEL.querySelector(".ch__textarea");
        if (messageEL && this.socket) {
          this.socket.send(
            JSON.stringify({
              content: messageEL.value,
              type: "message",
              login: this.fatalUser.login,
            })
          );
        }
      });
    }
  }
}
