import express from "express";
const server = express ()
const  PORT = 8080;
server.use (express.json());
server.use (express.urlencoded({extended:true}));


const teams = {

}
server.get("/teams",(req, res) => {
const { id } = req.params;
const teamsSelected = teams.find (t => t.id === number (id));
if (teamsSelected) return res.json(teamsSelected);
return res.json ({error :""});
})


server.listen (PORT, () =>{
    console.log(`servidor iniciado en ${PORT}`)
});