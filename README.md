
# Chat Nuruk Backend

Socket.io backend service chat app with MongoDB. This backend contains everything you need to set up an express + socket.io server.

Any additional socket connections can be made in the ```models/sockets.js``` file and any additional express middleware can be made in the ```models/server.js``` file.


## Run

To deploy this project run

```bash
  npm start
```

Run change local repository, nodemon project

```bash
  npm run dev
```


## Tech Stack

**Client:** Flutter, socket.io, 

**Server:** Node, Express, Socket.io, MoongoDB, Docker, JWT


## Usage/Examples Users Connected

Connect new client for the server. 
Only user can connect with token with ``'sub': 'id'``, this provider of backend service.
Receive this conection trougth the socket.handshake.query.tokenUser.

** Is really important to use This. before _socket. 
Because, if not the server listen many times the connection user.


```dart
import 'package:reality_near/core/framework/globals.dart';
import 'package:reality_near/global/environment.dart';
import 'package:flutter/material.dart';

import 'package:socket_io_client/socket_io_client.dart' as IO;

enum ServerStatus { Online, Offline, Connecting }

class SocketService with ChangeNotifier {
  ServerStatus _serverStatus = ServerStatus.Connecting;
  IO.Socket _socket;

  ServerStatus get serverStatus => this._serverStatus;

  IO.Socket get socket => this._socket;
  Function get emit => this._socket.emit;

  void connect() async {
    final String token = await getPersistData("userToken");

    // Dart client
    this._socket = IO.io(Environment.socketUrl, {
      'transports': ['websocket'],
      'autoConnect': true,
      'forceNew': true,
      'query': {
      'tokenUser': token,
      },
      'extraHeaders': {'tokenUser': token}
    });

    this._socket.on('connect', (_) {
      _serverStatus = ServerStatus.Online;
      notifyListeners();
    });

    this._socket.on('disconnect', (_) {
      _serverStatus = ServerStatus.Offline;
      notifyListeners();
    });
  }

  void disconnect() {
    this._socket.disconnect();
  }
}

```
Inicialize the SocketService & ChatService inside Main.dart

```Flutter
    import 'package:reality_near/presentation/bloc/socket/chat_service.dart';
    import 'package:reality_near/presentation/bloc/socket/socket_service.dart';
    
    ChangeNotifierProvider(create: (_) => SocketService()),
    ChangeNotifierProvider(create: (_) => ChatService()),

```
Connect Socket in login, register & logout event inside app.

```Flutter
    import 'package:reality_near/presentation/bloc/socket/socket_service.dart';
    
    socketService.connect();

    socketService.disconnect();

```

Connect Endpoint with all Users:
https://api-realitynearorg-chat.herokuapp.com/chat/Users

Example answer to usersConnected Endpoint with postman



## Usage/Examples messageResponse

Emmit message & save message in MongoDB. 
The principal string to use is ``'message-personal'`` To emit and listen message server.
*** idsent & idreceive is 3digits to send o receive to backend service.

```Flutter
    socketService.emit('message-personal', {
      'from': 'idsent', ** id to backend service as 217
      'to': 'idreceive',
      'message': message,
    });

```

connect Endpoint with all messages:
https://api-realitynearorg-chat.herokuapp.com/chat/messages/{to}
**Id user to receive the message

```Flutter
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reality_near/core/framework/globals.dart';
import 'package:reality_near/core/helper/url_constants.dart';
import 'package:reality_near/data/models/messageModel.dart';
import 'package:reality_near/domain/entities/user.dart';

class ChatService with ChangeNotifier {
  User userTo;

  Future<List<Message>> getChat() async {
    String token = await getPersistData("userToken");
    final String baseUrl = CHAT_NURUK + "messages";
    final url = baseUrl;
    final response = await http.get(Uri.parse(url), headers: {
      'Content-Type': 'application/json',
      'token': token,
    });
    final messageResponse = messageResponseFromJson(response.body);
    return messageResponse.messages;
  }
}

```

Emmit message with socketService.emit('message-personal', {'from':'id to sender', 'to':'id to receive', 'message': 'text'})

```Flutter
    socketService.emit('message-personal', {
      'from': user.id,
      'to': this.ChatService.userTo.id,
      'message': message,
    });
```

## API Reference

#### Get all users

```http
  GET /chat/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Send in header Token with ``"sub": "id"`` |

example with image in postman answer

![App Screenshot](https://github.com/RealityNearFoundation2022/chatNurukBackend/blob/main/assets/users.png)

#### Get all messages

```http
  GET /chat/messages/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :--------------------------------   |
| `id`      | `string` | **Required**. Id of user to receive |

example with image in postman answer

![App Screenshot](https://github.com/RealityNearFoundation2022/chatNurukBackend/blob/main/assets/message.png)
## Badges

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


