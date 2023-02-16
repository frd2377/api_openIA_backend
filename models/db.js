const {Sequelize,DataTypes} = require('sequelize')

const db = new Sequelize(process.env.DB)

const Imagenes = db.define('Imagenes',{
    nombre:{
        type: DataTypes.STRING
    },
    url:{
        type: DataTypes.STRING
    }
})

db.sync({force:false})

module.exports = {
    Imagenes:Imagenes
}











