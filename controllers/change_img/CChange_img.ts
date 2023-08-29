import { HTTPTransport } from "../../engine/HTTPTransport";

export class CСhangeIMG {
  HTTPTransport = new HTTPTransport();
  avatar: HTMLImageElement | null = document.querySelector(
    ".chimg__img__user__avatar"
  );
  inputFileAvatar: HTMLInputElement | null = document.querySelector(
    ".chimg__input__file"
  );
  yandexPathAvatar: string = "https://ya-praktikum.tech/api/v2/resources";
  constructor() {
    this.setAvatar();
    this.updateUserAvatar();
  }

  setAvatar() {
    try{
      const userAvatar: string | null = localStorage.getItem("userAvatar");
      if (userAvatar && this.avatar) {
        this.avatar.src = userAvatar;
      }
   }catch(err){
    console.log(err.name, err.message)
   }
  }

  updateUserAvatar() {
    const butChIMG = document.querySelector(".chimg__input__sub");
    butChIMG?.addEventListener("click", (e) => {
      e.preventDefault();
      const formData = new FormData();
      let img: any;
      if (this.inputFileAvatar?.files) {
        img = this.inputFileAvatar.files[0];
        formData.append("avatar", img, img.name);
      }

      this.HTTPTransport.put("user/profile/avatar", {
        method: "PUT",
        data: formData,
      }).then((ans) => {
        if (this.avatar) {
          let avatarPath = this.yandexPathAvatar + ans.avatar;
          this.avatar.src = avatarPath;
          try{
           localStorage.setItem("userAvatar", avatarPath);
          }catch(err){
            console.log(err.name, err.message)
          }

        }
      }).catch((err: string) => {
        console.error("error", err);
      });
    });
  }
}
