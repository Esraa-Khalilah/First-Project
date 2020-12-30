const un = require('underscore');
require('dotenv').config();
const express = require ('express');
const app = express ();
app.use(express.json())
const Joi = require('joi');

const port = process.env.port 
app.listen (port , ()=> console.log(`listening on port ${port}...`))

const movie_list =[
    {id:1 , name:"The Fault in Our Stars" , rate:8, type:"romance"},
    {id:2 , name:"Harry Potter" , rate:7, type:"drama"},
    {id:3 , name:"Annabelle" , rate:6, type:"horror"}
]

app.get ("/films/details/" ,(req,res)=>{
    res.json(movie_list)
})

