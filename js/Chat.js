const socket = io();
const messages = document.getElementById("messages");

socketMenssaje.on("messages", (data) => {
    console.log("Evento messages recibido:", data);

    let salida = ``;
    data.forEach(item => {
        salida += `<p class="card-text"><b>${item.user}:</b> <span class="fw-light">${item.message}</span></p>`;
    });

    messages.innerHTML = salida;
});

const sendMessage = () => {
    const user = document.getElementById("user");
    const message = document.getElementById("message");
    console.log("Enviando mensaje:", { user: user.value, message: message.value });
    socketMenssaje.emit("newMessage", { user: user.value, message: message.value });
    user.value = "";
    message.value = "";
}

const btnSendMessage = document.getElementById("btnSendMessage");

btnSendMessage.addEventListener("click", () => {
    sendMessage();
});
