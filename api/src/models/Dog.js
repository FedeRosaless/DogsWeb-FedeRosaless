const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        is:  {
          args: /^[a-zA-Z\s]*$/,  // ReGex que verifica solo el uso de letras y espacios
          msg: 'Must contain letters and spaces only'
        } 
      },
      allowNull: false,
    },
    height:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    weight:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,
      validate: {
        len: [0,20],  // Restringe la cantidad de caracteres 
      },
    },
    image:{
      type: DataTypes.STRING(3000),
      validate: {                   // ReGex que verifica la url de la imagen
        is: {
          args: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/g,
          msg: 'Enter a valid URL',
        },
      },
      allowNull: false
    },
    createdInBd:{ //para acceder mas facil al perro agreagado
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  });
};
