import { HTTPTransport } from "../../engine/HTTPTransport";

export class CRequests {
  HTTPTransport: HTTPTransport = new HTTPTransport();

  constructor() {}

  requestGetUserData() {
    return this.HTTPTransport.get("auth/user", { method: "GET" });
  }

  requestAddNewChat(chatName: string) {
    return this.HTTPTransport.post("chats", {
      method: "POST",
      data: { title: chatName },
    });
  }

  requestGetChats = () => this.HTTPTransport.post("/chats", { method: "GET" });

  requestDelChat(chatID: string | null) {
    return this.HTTPTransport.delete("/chats", {
      method: "DELETE",
      data: { chatId: chatID },
    });
  }

  requestAddUserToChat(userID: string | null, chatID: string | null) {
    return this.HTTPTransport.put("/chats/users", {
      method: "PUT",
      data: { users: [userID], chatId: chatID },
    });
  }

  requestDelUserFromChat(userID: string | null, chatID: string | null) {
    return this.HTTPTransport.delete("/chats/users", {
      method: "DELETE",
      data: { users: [userID], chatId: chatID },
    });
  }

  requestGetUsersInChat(chatID: string | null) {
    return this.HTTPTransport.get(`/chats/${chatID}/users`, { method: "GET" });
  }

  requestSerchUsers(userName: string | null) {
    return this.HTTPTransport.post("/user/search", {
      method: "POST",
      data: { login: userName },
    });
  }

  requestGetChatToken(chatID: string | null) {
    return this.HTTPTransport.post(`chats/token/${chatID}`, { method: "POST" });
  }
}
