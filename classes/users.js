
class Users {

  constructor() {
      this.users = [];
  }

  addUser(id, name, room) {
      let user = { id, name, room };
      this.users.push(user);
      return this.users;

  }

  getUser(id) {
      let user = this.users.filter(user => user.id === id)[0];

      return user;
  }

  getUsers() {
      return this.users;
  }

  getUsersForRoom(room) {
      let usersInRoom = this.users.filter(user => user.room === room);
      return usersInRoom;
  }

  deleteUser(id) {
      let userOut = this.getUser(id);
      this.users = this.users.filter(user => user.id != id);

      return userOut;

  }


}


module.exports = {
  Users
}