const un = require('underscore');
require('dotenv').config();
const express = require ('express');
const app = express ();
app.use(express.json())
const Joi = require('joi');
const log = require("./logger")

const port = process.env.port 
app.listen (port , ()=> console.log(`listening on port ${port}...`))

const movie_list =[
    {id:1 , name:"The Fault in Our Stars" , rate:8, type:"romance"},
    {id:2 , name:"Harry Potter" , rate:7, type:"drama"},
    {id:3 , name:"Annabelle" , rate:6, type:"horror"}
]

app.get ("/films/details/" ,(req,res)=>{
    res.json(movie_list)
});

app.post ("/films/add" , (req,res)=>{
    
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        rate: Joi.number().integer().required(),
        type: Joi.string().min(2).required()
    } )
    const validation = schema.validate (req.body)
    if (validation.error){
        res.status(400).json(validation.error.details[0].message)
        return ;
    }
    const film = {
        id:movie_list.length+1 ,
        name:req.body.name,
        rate:req.body.rate,
        type:req.body.type
    }
    movie_list.push(film)
    res.json(film)
})


    app.put ("/films/update/:id" , (req,res)=>{
        const film = movie_list.find (e=> e.id === parseInt(req.params.id))
        if (!film) res.status(404).json ("not found")
        res.json(film)
    
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        rate: Joi.number().integer().required(),
         type: Joi.string().min(2).required()

         
    } )
     const validation = schema.validate (req.body )
        if (validation.error){
        res.status(400).json(validation.error.details[0].message)
        return ;
        }  

        film.name =req.body.name,
        film.rate =req.body.rate,
        film.type =req.body.type;
        res.json(movie_list)
    })


    app.delete("/film/delete/:id" , (req,res)=>{
        const film= movie_list.find (e=> e.id === parseInt(req.params.id))
        if (!film) res.status(404).json ("not found")
        res.json( film)

        const index = movie_list.indexOf(film)
        movie_list.splice(index , 1)
        res.json(film)
})

app.use (log);
    