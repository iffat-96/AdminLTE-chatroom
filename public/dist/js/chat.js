// Make connection
// Get the io from html cdnjs
var socket = io.connect('http://localhost:4000');

// Query DOM node
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var chatbox = document.getElementById('chatbox');


// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

message.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        document.getElementById('send').click();
    }
});

// Listen for events
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('chat', function(data){
    feedback.innerHTML = "";
    
    output.innerHTML += '<div class="direct-chat-infos"><span class="direct-chat-name">' 
    + data.handle + '</span></div>' + '<div class="direct-chat-text">' + data.message + '</div><br>';
    message.value = '';

    if(chatbox.scrollHeight > chatbox.clientHeight){
        setInterval(scrollToBottom, 100);
    };
});

function scrollToBottom() {
    chatbox.scrollTop = chatbox.scrollHeight;
}