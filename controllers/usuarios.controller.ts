import { Request, Response } from "express";
import Usuario from '../models/usuario.model';

export const getUsuarios = async(req:Request, res:Response) =>{
    
    const usuarios = await Usuario.findAll(); 
    res.json({usuarios})
}


export const getUsuario = async(req:Request, res:Response) =>{

    const {id} = req.params;
    const usuario = await Usuario.findByPk(id); 
    
    if(usuario){
        res.json({usuario})
    } else{
        res.status(404).json({
            msg: `No existe un usuario con el id: ${id}`
        })
    }

    
}


export const postUsuario = async (req:Request, res:Response) =>{

    const {body} = req;

    try {

        const exitseEmail = await Usuario.findOne({
            where:{
                email: body.email
            }
        });

        if(exitseEmail){
            return res.status(400).json({
                msg: "Ya existe un usuario con el email " + body.email
            })
        }

        
        
        const usuario = Usuario.build(body)
        await usuario.save()

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administadror"
        })
        
    }

}


export const putUsuario = (req:Request, res:Response) =>{

    const {id} = req.params;
    const {body} = req;

    res.json({
        msg:"put usuario", 
        body,
        id
    })
}

export const deleteUsuario = (req:Request, res:Response) =>{

    const {id} = req.params;

    res.json({
        msg:"put usuario",
        id
    })
}