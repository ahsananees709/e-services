import { Server } from 'socket.io';

const io = new Server(8000, {
  cors: {
    // origin: "http://localhost:3001"
  origin:"*"
    }
});
let users = []

const addUser = (userId, socketId) => {
    if (userId)
    {
        !users.some((user) =>user.userId === userId) &&
        users.push({userId,socketId})   
        }

}
const removeUser = (socketId) => {
    users = users.filter((user)=> user.socketId !== socketId)
}
const getUser = (userId) => {
    return users.find((user)=> user.userId === userId)
}
io.on("connection", (socket) => {
    // when a user connect
    console.log("a user connected")
    //take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        console.log(users)
        io.emit("getUsers",users)
    })

    // //send and get message
    // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    //     const user = getUser(receiverId)
    //     io.to(user.socketId).emit("getMessage", {
    //         senderId,
    //         text
    //     })
    // })
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            });
        } else {
            console.log("User not found or disconnected:", receiverId);
        }
    });

    // when a user disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnect")
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
})