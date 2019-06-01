const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

server.post('/projects', async (req, res) =>{
    console.log(req.body)
    
    try{
        const project = req.body;
        const newProject = await db.insert(project).into('Project').then(project => {res.status(201).json(project)})

    }catch(error){res.status(500).json(error)}
})

server.post('/projects/:id', async (req, res) =>{    
    try{
        const {id} = req.params;
        const action = req.body;
        const newAction = await db.insert(action).into('Actions').where('Project_ID', '=', id).then(action => {res.status(201).json(action)})

    }catch(error){res.status(500).json(error)}
})

server.get('/projects/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const project = await db('Project').where('ID', '=', id).then(project =>{res.status(201).json(project)})
        const action = await db('Actions').where('Project_ID', '=', id).then(action =>{res.status(201).json(action)})

    }catch(error){res.status(500).json(error)}
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`); 
});

