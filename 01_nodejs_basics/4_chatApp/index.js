const ChatRoom = require("./chatRoom.js")

const chat = new ChatRoom()

chat.on("join",(user)=>{
    console.log(`${user} has joined the chat`)
})

chat.on("message",(user,message)=>{
    console.log(`${user}: ${message}`)
})

chat.on("leave",(user)=>{
    console.log(`${user} has left the ChatRoom`)
})


chat.join("Alice")
chat.join("Bob")

chat.sendMessage("Alice","Hey Bob")
chat.sendMessage("Bob","Hey Alice")

chat.leave("Alice")
chat.sendMessage("Alice","This message wont be sent")
chat.leave("Bob")
