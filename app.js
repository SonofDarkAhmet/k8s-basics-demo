const express = require('express')
const app = express()

app.get('/',(req,res)=>{
   res.json({message:"Welcome to kubernetes v3..."})
})

app.get('/crash',(req,res)=>{
    res.send('Server is crashing...');
    setTimeout(() => process.exit(1), 100);
})

app.get("/unresponsive",(req,res)=>{
    console.log("Server is unresponsive...");
    while(true) {}
})
    
let dbConnected = true;

app.get('/ready',(req,res)=>{
    if(dbConnected){
        res.json({message:"Database connection successful"})
    }
    else{
        res.status(500).json({message:"Database connection failed"})
    }
})

app.get('/disconnect-db',(req,res)=>{
    if(dbConnected){
        dbConnected = false;
        res.json({message:"Database connection disconnected"})        
    }
    else{
        res.status(500).json({message:"Database connection is already disconnected"})
    }
})

app.get('/connect-db',(req,res)=>{
    if(!dbConnected){
        dbConnected = true;
        res.json({message:"Database connection established"})        
    }
    else{
        res.status(500).json({message:"Database connection is already connected"})
    }
})



app.listen(5000,()=>{
    console.log("server running on 5000")
})