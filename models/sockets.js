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
            
            const [ validate, id ] = verifyJWT(socket.handshake.headers['token']);
            console.log(socket.handshake.headers['token']);
            // console.log(socket)
            if(!validate){
                console.log('socket not valid');
                return socket.disconnect();
            }
            // save in mongoDB the user connected

            // TODO: Saber que usuario esta activo mediante el UID
            
            const user = await userConnected(id);
            console.log('user connected', user._iduser)

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('list-users', await getUsers() );

            // TODO: Escuchar cuando el cliente manda un mensaje // y un mensaje personal a un grupo...
            socket.on( 'server:message-personal', async(payload) => {
                const message = await saveMessage( payload);
                console.log(payload)
                this.io.to( payload.to ).emit( 'server:message-personal', message );
                this.io.to( payload.from ).emit( 'server:message-personal', message );
            })

            // TODO: Socket join, UID / Unir al usuario a una sala de socket.io
            socket.join(id)

            // TODO: Disconect, marcar en base de datos que usuario se desconectados
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() =>{
                await userDisconnect(id);
                this.io.emit('server:list-users', await getUsers());
            })
        
        });
    }
}
module.exports = Sockets;