import { HTTPTransport } from "./HTTPTransport";
import { Navigator } from "./navigator";

export class UserAnalytics{
  HTTPTransport: HTTPTransport = new HTTPTransport();
  Navigator: Navigator = new Navigator()

  private static _UserAnalytics: UserAnalytics;

  constructor(){
    if (UserAnalytics._UserAnalytics) {
      return UserAnalytics._UserAnalytics;
    }
    UserAnalytics._UserAnalytics = this;
  }

  verification(){
    const currentLocation = location.pathname
      this.HTTPTransport.get("auth/user", { method: "GET" }).then(()=>{      
          if (currentLocation == "/" || currentLocation == "/sign_up") {
              this.Navigator.segue("/chats");
          }
        }).catch((err: string) => {
          console.log(err);
          
          localStorage.clear();
          if (currentLocation !== "/" && currentLocation !== "/sign_up") {
            this.Navigator.segue("/")
          }
        });
  }
}
