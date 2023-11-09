const ws = new WebSocket("ws://localhost:20001");

const nickname = document.querySelector("#nickname");
const message = document.querySelector("#message");
const sendBtn = document.querySelector("#send");

sendBtn.addEventListener("click",sendMessage);

function sendMessage(){
    if(nickname.value == ''){
        alert("닉네임을 입력하세요.");
        return;
    }
    ws.send(nickname.value+" : "+message.value);
    message.value = '';
}

function receiveMessage(event){
    const chat = document.createElement("div");
    const message = document.createTextNode(event.data);
    chat.appendChild(message);

    const chatLog = document.querySelector("#chat-log");
    chatLog.appendChild(chat);
}

function disconnected(event){
    alert("서버와의 연결이 끊어졌습니다.");
    location.href = '/';
}

ws.onmessage = receiveMessage;
ws.onclose = disconnected;