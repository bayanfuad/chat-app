
const messageQueue = {};

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (room) => {
        users[socket.id] = room;
        socket.join(room);
    });
});

io.on("connection", (socket) => {
    if (messageQueue[socket.id]) {
        messageQueue[socket.id].forEach((message) => {
        socket.emit("receive_message", message);
        });
        delete messageQueue[socket.id];
    }
    });