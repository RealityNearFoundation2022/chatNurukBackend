const { verifyJWT } = require('../helpers/jwt');
const { userConnected, saveMessage, userDisconnect, getUsers } = require('../controllers/sockets')

class Sockets {
    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {
            // TODO: Validar el JWT, si token no es valido desconectar
            
            const [ validate, uid ] = verifyJWT(socket.handshake.query['x-token']);
            if(!validate){
                console.log('socket not valid');
                return socket.disconnect();
            }
            // TODO: Saber que usuario esta activo mediante el UID

            const user = await userConnected(uid);
            console.log('user connected', user.name)

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsers() );

            // TODO: Escuchar cuando el cliente manda un mensaje // y un mensaje personal a un grupo...
            socket.on( 'mensaje-personal', async(payload) => {
                const message = await saveMessage( payload);
                console.log(payload)
                this.io.to( payload.to ).emit( 'mensaje-personal', message );
                this.io.to( payload.from ).emit( 'mensaje-personal', message );
            })

            // TODO: Socket join, UID / Unir al usuario a una sala de socket.io
            socket.join(uid)

            // TODO: Disconect, marcar en base de datos que usuario se desconectados
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() =>{
                await userDisconnect(uid);
                this.io.emit('lista-usuarios', await getUsers());
            })
        
        });
    }


}

module.exports = Sockets;