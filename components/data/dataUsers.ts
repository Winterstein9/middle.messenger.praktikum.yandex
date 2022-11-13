export let users:UsersT = [
    {img : "#",  user : true, name : "Duglas", lastMessage : "Hello", lastTimeMessage : "22:15", newMessage : "7",}, 
    {img : "#",  user : true, name : "Vera", lastMessage : "изображение", lastTimeMessage : "22:15", newMessage : "0", active : true,
    messages : [
    {message : "Папка dist и .DS_Store остались в проекте", time : "8:08"},
    {message : "Проблема на нетлифае осталась", time : "8:09"},
    {message : "Много ошибок типизации, попробуй выполнить команду npx tsc --noEmit", img : "/static/6566.jpg", time : "8:10"},    
    {myMessage : "Hello", time : "8:09"}
    ]}, 
    {img : "#",  user : true, name : "William", lastMessage : "bye", lastTimeMessage : "22:15", newMessage : "17"},

    {name:"myMessage", mymessages : [{message: "Hello", time : "8:09"}]}
]


type UsersT=UserT[]

type UserT={
    img?:string,
    user?:boolean,
    active?:boolean,
    name:string,
    lastMessage?:string,
    lastTimeMessage?:string,
    newMessage?:string,
    messages?:MessageT[]
    mymessages?:MessageT[]
}

type MessageT={
    message?:string,
    img?:string,
    time:string,
    myMessage?:string
}

export type{MessageT, UsersT, UserT}