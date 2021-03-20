import express, { Application } from "express";
import router from "../routes/usuarios.routes";
import cors from "cors";

import db from "../database/connection";


class Server{
    
    private app:Application;
    private port: string;    
    private apiPaths ={
        usuarios:"/api/usuarios"
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "4000";
        
        this.dbConnection();
        // Middlewares
        this.middlewares()
        // Routes:
        this.routes();
    }

    // db connection:
    async dbConnection(){
        try {

            await db.authenticate();
            console.log("Database Online");
            
        } catch (error) {
            throw new Error (error)
        }
    }

    // middlewares

    middlewares(){

        // CORS
        this.app.use(cors({}));
        
        // Lectura del body
        this.app.use(express.json());
        
        // Carpeta publica
        this.app.use(express.static("public"));
    }
    
    routes(){
        this.app.use(this.apiPaths.usuarios, router)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }

}

export default Server;