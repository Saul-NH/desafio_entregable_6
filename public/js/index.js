const socket = io();
loadFirstData();

const createProductForm = document.getElementById('createProductForm');
const chatForm = document.getElementById('chat');

createProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const product = Object.fromEntries(form.entries());

    socket.emit('createProduct', product);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputChat = new FormData(e.target);
    const message = Object.fromEntries(inputChat);

    socket.emit('saveMessage', message);
});

socket.on('refreshProductList', (product) => {
    loadDataToTbody(product);
});

socket.on('refreshChat', (message) => {
    loadMessagesToChat(message);
});

function loadFirstData() {
    fetch('/products')
        .then((data) => data.json())
        .then((products) => {
            loadDataToTbody(products.products);
        })
        .catch((e) => alert(e));

    fetch('/messages')
        .then((data) => data.json())
        .then((messages) => {
            loadMessagesToChat(messages.messages);
        })
        .catch((e) => alert(e));
}

function loadDataToTbody(products) {
    const tbody = document.getElementById('tbody');

    products.forEach((product) => {
        tbody.innerHTML += `<tr>
                                <td>${product.title} </td>
                                <td>${product.price} </td>
                                <td> <img src="${product.thumbnail}" class="img-thumbnail" alt="thumbnail" style="heitght: 60px; width:60px;"></td>
                            </tr>
                            `;
    });
}

function loadMessagesToChat(messages) {
    const chat = document.getElementById('messages');
    messages.forEach((message) => {
        chat.innerHTML += `<br> <b style="color:blue"> ${message.email} </b> [<b style="color:maroon">${message.date}</b>]: <i style="color:green">${message.message}</i>`;
    });
}
