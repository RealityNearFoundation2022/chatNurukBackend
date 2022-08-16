const { verifyJWT } = require('../helpers/jwt');
const { userConnected, saveMessage, userDisconnect, getUsuarios } = require('../controllers/sockets')

class Sockets {
    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ validate, uid ] = verifyJWT(socket.handshake.query['x-token']);
            if(!validate){
                console.log('socket not valid');
                return socket.disconnect();
            }
            const user = await userConnected(uid);
            console.log('user connected', user.name)
            // typing events
            // socket.on('chat:typing', (data) => {
            // io.sockets.broadcast.emit('chat:typing', data);
            // })
            // // Escuchar evento: mensaje-to-server
            // socket.on('mensaje-to-server', ( data ) => {
            //     console.log( data );
                
            //     this.io.emit('mensaje-from-server', data );
            // });
            // TODO: Validar el JWT, si token no es valido desconectar
            
            // TODO: Saber que usuario esta activo mediante el UID

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios() );

            // TODO: Escuchar cuando el cliente manda un mensaje // y un mensaje personal a un grupo...
            socket.on( 'mensaje-personal', async(payload) => {
                const message = saveMessage( payload);
                console.log( message );
                this.io.to( payload.for ).emit( 'mensaje-personal', message );
                this.io.to( payload.from ).emit( 'mensaje-personal', message );
            })

            // TODO: Socket join, UID

            // TODO: Disconect, marcar en base de datos que usuario se desconectados
            socket.on('disconnect', async() =>{
                await userDisconnect(uid);
                this.io.emit('lista-usuarios', await getUsuarios());
            })
            // TODO: Emitir todos los usuarios conectados
        
        });
    }


}


module.exports = Sockets;