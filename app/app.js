const express = require("express");
const {WebSocketServer} = require("ws");

const app = express();
const wss = new WebSocketServer({port:20001});

app.use(express.static(`${__dirname}/src/public`));

app.listen(20000,()=>{
    console.log("서버 실행");
});

wss.broadcast = (message) =>{
    wss.clients.forEach(client =>{
        client.send(message);
    })
}

wss.on("connection", (ws, request)=>{
    console.log(`유저 접속 : ${request.socket.remoteAddress}, ${wss.clients.size}명`);

    wss.broadcast(`새로운 유저가 접속했습니다. 현재 ${wss.clients.size}명`);
    
    ws.on("message",data=>{
        wss.broadcast(data.toString());
    });

    ws.on("close", ()=>{
        wss.broadcast(`유저가 떠났습니다. 현재 ${wss.clients.size}명`);
    });
    
})


