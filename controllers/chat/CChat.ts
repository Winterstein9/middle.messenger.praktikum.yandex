import type { User } from "../../types/types";
import { CRequests } from "./CRequests";
import { CChatView } from "./CChatView";

export class CChat extends CChatView {
  chatList: string = "";
  elementSelector: string = ".ch__chatUnit";
  activeChat: HTMLDivElement | null = null;
  usersHTML: string;
  chatID: string | null;
  addedUsersToChat: [any];
  socket: WebSocket | null;
  CRequests: CRequests = new CRequests();

  chatsMessages: any = {}

  private static _CChat: CChat;

  constructor() {
    super();
    if (CChat._CChat) {
      return CChat._CChat;
    }
    CChat._CChat = this;
    
    if (document.location.pathname == "/chats" && this.fatalUser == null) {      
      this.getUserData();
      this.addChatList();
      this.sendMessage();
    }
    this.display(this.messageSelectDisplay);
  }

  searchUser2(userLogin: string) {
    this.CRequests.requestSerchUsers(userLogin).then((users: [User]) => {
      this.setViewDetectedUsers(users);
      //this.eventAddUserToChat();
    }).then(()=>{
      this.eventAddUserToChat();//8
    }).catch((err: string) => {
      console.error("error", err);
    });
  }

  addChatList() {
    this.display(this.messageSelectDisplay);
    this.CRequests.requestGetChats()
      .then((chats) => {

        /*
        console.log("получены чаты", chats)----------------------------
      for(let v = 0; v<chats.length; v++){
        this.chatsMessages[chats[v].id]=[]
      }
      localStorage.setItem('myCat', JSON.stringify(this.chatsMessages));
     let myCat = JSON.parse(localStorage.getItem('myCat')as string)
      console.log("=",myCat,"=")
      console.log(";mmnkln===>", this.chatsMessages)
*/
        this.setViewChats(chats);
        this.addEventChat();
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
    const CL = document.querySelectorAll(this.elementSelector);
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

            this.clearChatView()

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
        if (this.userOverlap2(userID) == false) {
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
    this.CRequests.requestGetUsersInChat(this.chatID).then(
      (chatUsers: [User]) => {
        this.setViewChatUsers(chatUsers);
        this.addUsersToarray(chatUsers);
        this.addEventDelUserFromChat();
      }
    ).catch((err: string) => {
        console.error("error", err);
      });
  }

  userOverlap2(userID: string | null) {
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
        const userID = user.getAttribute("data-id");
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
        this.setViewUserLogin(userData);
      })
      .catch((err: string) => {
        console.error("error", err);
      });
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
                this.setViewMessage(data.login, data.content);
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
        const messageEL: HTMLTextAreaElement | null =
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
