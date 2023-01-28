const chatForm =  document.getElementById("chat-box")

const chatMessages = document.querySelector('.chatbox')

const {username,room} = Qs.parse(location.search, {ignoreQueryPrefix: true});

const socket = io();

console.log(username)

//sends join room to the server, with a payload cointaing username room
socket.emit('join room', {username, room})

//when client recieves a message from the server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    //auto scroll when a message is sent
    chatMessages.scrollTo(chatMessages.scrollHeight)
});

//message is sent
 chatForm.addEventListener('submit', e =>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    const user = username 
       // sending message to server
    socket.emit('chatMessage',{msg, user});
    e.target.elements.msg.value = ''; //sets text in textField to nothing
    
    
 });


//  output messasge to chat box in html 
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div class="msg-row">
    <div class="msg-text">
        <h2>${message.user}</h2>
        <p>${message.text}</p>
    </div>
</div>`
    document.querySelector('.col-1').appendChild(div);
}

