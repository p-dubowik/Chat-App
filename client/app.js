let userName = '';

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

//initialize socket
const socket = io();

//Add event listener to 'message' event with addMessage as callback function
socket.on('message', ({ author, content }) => addMessage(author, content));



const login = e => {
    e.preventDefault();

    if(!userNameInput.value){
        alert('Error');
        return;
    }
    else{
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');

        socket.emit('join', userNameInput.value);
    }



}

const addMessage = (author, content) => {

    const message = document.createElement('li');

    message.classList.add('message');

    message.classList.add('message--received');

    if(author === userName) message.classList.add('message--self');
    if(author === 'chatbot') message.classList.add('message--bot');

    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
        ${content}
    </div>
    `;

    messagesList.appendChild(message);
}

const sendMessage = e => {
    e.preventDefault();

    let messageContent = messageContentInput.value;

    if(!messageContentInput.value){
        alert('Message Content Empty');
        return;
    }
    else {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent });
        messageContentInput.value = '';
    }
}



loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);