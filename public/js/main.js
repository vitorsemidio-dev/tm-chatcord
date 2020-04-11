const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit('joinRoom', {username, room});

socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  scrollChatMessage();
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit('chatMessage', msg);

  clearAndFocusInput(e);
});

function clearAndFocusInput(e) {
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
}

function scrollChatMessage() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function outputMessage({username, text, time}) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <div class="message">
    <p class="meta">${username} <span>${time}</span></p>
    <p class="text">
      ${text}
    </p>
  </div>
  `;
  document.querySelector('.chat-messages').appendChild(div);
}
