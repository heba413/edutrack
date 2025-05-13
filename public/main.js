const socket = io();

// DOM Elements
const clientsTotal = document.getElementById('clients-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const feedback = document.getElementById('feedback');

// Submit message form
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

// Receive total clients update from server
socket.on('clients-total', (data) => {
  clientsTotal.innerText = `total clients is ${data}`;
});

// Send a message (can be extended to emit a real message)
function sendMessage() {
    if (messageInput.value==='') return
    console.log(messageInput.value);
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime:new Date()
    }
  // Future implementation: socket.emit('message', { user: nameInput.value, text: messageInput.value });
    socket.emit('message', data)
    addMeassageToUI(true,data)
}

socket.on('chat-message', (data) => {
    console.log(data)
    addMeassageToUI(false, data)
    messageInput.value=''
})

function addMeassageToUI(isOwnMessage, data) {
    const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"} "> 
            <p class="message">
            ${data.message}
     
                <span> ${data.name} ⚪️ ${moment(data.dateTime).fromNow()} </span>
            </p>
        </li>
        `
    messageContainer.innerHTML += element
    
}