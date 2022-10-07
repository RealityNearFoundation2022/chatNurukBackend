const { verifyJWT } = require('../helpers/jwt');
const { userConnected, saveMessage, userDisconnect, getUsersConected } = require('../controllers/sockets')
class Sockets {
    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {
            // TODO: Validar el JWT, si token no es valido desconectar
            // console.log('cliente conectado', socket.handshake.headers['tokenuser']);
            const [valid, sub ] = verifyJWT(socket.handshake.query.tokenUser);
            if(!valid){
                console.log('socket not valid');
                return socket.disconnect();
            }
            // TODO: save new user connected in MongoDb
            // TODO: Saber que usuario esta activo mediante el UID
            const newUser = await userConnected(sub);
            console.log("New User connected", newUser._iduser);

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('list-users', await getUsersConected() );

            // TODO: Escuchar cuando el cliente manda un mensaje // y un mensaje personal a un grupo...
            socket.on( 'message-personal', async(payload) => {
                console.log("message save en MongoDb", payload)
                const message = await saveMessage( payload);
                this.io.to( payload.to ).emit( 'message-personal', message );
            })

            // TODO: Socket join, UID / Unir al usuario a una sala de socket.io
            socket.join(newUser._iduser)

            // TODO: Disconect, marcar en base de datos que usuario se desconectados
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() =>{
                console.log('Cliente desconectado', newUser._iduser);
                await userDisconnect(newUser._iduser);
                await socket.disconnect();
                // this.io.emit('server:list-users', await getUsers());
            })
        });
    }
}

module.exports = Sockets;