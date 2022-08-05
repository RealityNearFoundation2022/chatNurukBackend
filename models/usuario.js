const { Schema, model } = require('moongose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  password: {
    type: String,
    required: false,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = mode('Usuario', UsuarioSchema);