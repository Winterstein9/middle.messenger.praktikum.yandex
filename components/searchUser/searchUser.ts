import "./searchUser.styl";
import userhbs from "./searchUser.hbs";

export default class searchUser {
  makeUser(users: any): any {
    let html = "";
    users.forEach((user: any) => {
      html += userhbs({
        id: user.id,
        first_name: user.first_name,
        second_name: user.second_name,
        login: user.login,
        avatar: user.avatar,
        email: user.email,
        phone: user.phone,
      });
    });
    return html;
  }
}
