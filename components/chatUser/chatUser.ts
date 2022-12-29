import userhbs from "./chatUser.hbs";

export default class ChatUser {
  makeUser(users: any, userID: number): any {
    let html = "";
    users.forEach((user: any) => {
      if (user.id != userID) {
        html += userhbs({
          id: user.id,
          first_name: user.first_name,
          second_name: user.second_name,
          login: user.login,
          avatar: user.avatar,
          email: user.email,
          phone: user.phone,
        });
      }
    });
    return html;
  }
}
