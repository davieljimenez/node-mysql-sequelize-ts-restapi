import { Sequelize } from "sequelize";

const db = new Sequelize("node_user","root", "toor",{
    host: "localhost",
    dialect:"mysql",
    // loggin:false
})

export default db;