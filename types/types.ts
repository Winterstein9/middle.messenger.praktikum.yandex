export type { User, ChatUT, LastMessage}

type User={
    avatar:null
    display_name:string|null
    email:string
    first_name:string
    id:number
    login:string
    phone:string
    second_name:string
}

type ChatUT = {
    title: string;
    avatar?: string;
    unread_count?: string | null;
    last_message?: LastMessage;
    id?: number;
  };


  type LastMessage = {
    content:string
    id:number
    time:string
    user:User
  }
  