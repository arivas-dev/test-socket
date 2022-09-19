const express = require('express')
const app = express()

const port = 8080

const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: "*",
    }
});

let socket_node = null;

io.on("connection", (socket) => {
    console.log("a user connected");
    // setInterval(() => {

    // }, 5000)
    socket_node = socket;
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {

    //Recibo el parametro sociedad de la url y el parametro cadena y valido que ambos existan
    if (req.query.sociedad && req.query.cadena) {
        //Si ambos existen, envio el mensaje al socket
        const { sociedad, cadena } = req.query;
        socket_node.emit(`marcaje_${sociedad}}`, { sociedad, cadena });
        res.send('Mensaje enviado');
    } else {
        //Si alguno de los dos no existe, envio un mensaje de error
        res.send('Error, no se ha enviado el mensaje');
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
