const socket = io()


window.addEventListener('load', () => {
    do {
        var Name = prompt('Please Enter Your Name')
        socket.emit('new-user-joined', Name)
    } while (!Name);
})

// fetching required dom elements
const msg_section = document.querySelector('#msg-section')
const send = document.querySelector('#send')
const input = document.querySelector('#input')



// sending message on enter
input.addEventListener('keydown', (e) => {
    const message = document.querySelector('#input').value.trim()
    if (e.key === 'Enter' && message !== '') {
        appendMsg(message, 'outgoing')
        scrollDown()
        document.querySelector('#input').value = '';
        document.querySelector('#input').focus();

        socket.emit('message', message)
    }
})


// sending message on clicking send button
send.addEventListener('click', () => {
    const message = document.querySelector('#input').value.trim()
    if (message !== '') {
        appendMsg(message, 'outgoing')
        scrollDown()
        document.querySelector('#input').value = '';
        document.querySelector('#input').focus();

        socket.emit('message', msg)
    }
})


// appending message
const appendMsg = (message, type) => {

    if (type === 'outgoing') {
        const msg = `
        <div class="flex justify-end mb-2">
            <div id="outgoing-msg" class=" rounded-le rounded-bl-lg bg-white text-black break-words max-w-[45%] w-fit h-fit p-2" >
                ${message}
            </div>
        </div>`

        // Create a new DOMParser
        var parser = new DOMParser();

        // Parse the HTML string
        var doc = parser.parseFromString(msg, 'text/html');

        // Access the parsed <div> element
        var divElement = doc.body.firstChild;

        // Now you can use the divElement as a regular DOM element
        // console.log(divElement); // You can use it as needed in your code

        msg_section.appendChild(divElement)

    }
    else if (type === 'incoming') {
        color = ['green', 'pink', 'blue', 'violet', 'orange', 'yellow', 'red', 'Fuchsia', 'Rose', 'lime']
        const msg = `
        <!-- incoming-msg -->
        <div class="flex justify-start mb-2">
            <div id="incoming-msg" class=" rounded-ri rounded-br-lg bg-black text-white break-normal max-w-[45%] w-fit h-fit p-2" >
                <h4 class="text-${color[Math.floor((Math.random() * 100) / 10)]}-500 relative tracking-wide">${message.Name}</h4>
                ${message.message}
                </div>
        </div>`

        // Create a new DOMParser
        var parser = new DOMParser();

        // Parse the HTML string
        var doc = parser.parseFromString(msg, 'text/html');

        // Access the parsed <div> element
        var divElement = doc.body.firstChild;

        // Now you can use the divElement as a regular DOM element
        // console.log(divElement); // You can use it as needed in your code

        msg_section.appendChild(divElement)
        var audio = new Audio('/public/msg-tone.mp3')
        audio.play()
    }
    else {
        const msg = `
        <!-- user-joined -->
        <div class="flex justify-center mb-2">
            <div id="user-joined" class=" rounded-xl bg-green-300 text-slate-800  max-w-[45%] w-fit h-fit px-2 py-1 my-2" >
                ${message}
            </div>
        </div>`

        // Create a new DOMParser
        var parser = new DOMParser();

        // Parse the HTML string
        var doc = parser.parseFromString(msg, 'text/html');

        // Access the parsed <div> element
        var divElement = doc.body.firstChild;

        // Now you can use the divElement as a regular DOM element
        // console.log(divElement); // You can use it as needed in your code

        msg_section.appendChild(divElement)
    }
}


// scrollDown on new message
const scrollDown = () => {
    msg_section.scrollTop = msg_section.scrollHeight
}



// receiving message from server if any
socket.on('message', (msg) => {
    // console.log(msg)
    appendMsg(msg, 'incoming')
    scrollDown()
})

socket.on('user-joined', Name => {
    appendMsg(`${Name} joined the chat`, '')
})

socket.on('user-left', Name => {
    appendMsg(`${Name} left the chat`, '')
})
