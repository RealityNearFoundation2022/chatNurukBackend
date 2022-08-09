

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('new conection')
            // // Escuchar evento: mensaje-to-server
            // socket.on('mensaje-to-server', ( data ) => {
            //     console.log( data );
                
            //     this.io.emit('mensaje-from-server', data );
            // });
            // TODO: Validar el JWT, si token no es valido desconectar
            
            // TODO: Saber que usuario esta activo mediante el UID

            // TODO: Emitir todos los usuarios conectados

            // TODO: Escuchar cuando el cliente manda un mensaje // y un mensaje personal a un grupo...

            // TODO: Socket join, UID

            // TODO: Disconect, marcar en base de datos que usuario se desconectados

            // TODO: Emitir todos los usuarios conectados
        
        });
    }


}


module.exports = Sockets;