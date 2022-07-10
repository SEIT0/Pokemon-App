const express = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
/*
Únicos Endpoints/Flags que pueden utilizar
GET https://pokeapi.co/api/v2/pokemon //further aclaración del corrector: no se puede usar este endpoint + querys, solo así como esta
GET https://pokeapi.co/api/v2/pokemon/{id}
GET https://pokeapi.co/api/v2/pokemon/{name}
GET https://pokeapi.co/api/v2/type
*/
const server = express()
server.use(express.json())
const router = express.Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {
    let { name } = req.query
    let pkmn = [];

    if (name) {
        try {
            var poke = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
            let { sprites, types, id, stats, weight, height } = poke.data
            let { front_default } = sprites
            res.json({ front_default, name, types, id, stats, weight, height })
        } catch (error) {
            let DBpoke = await Pokemon.findOne({ where: {name}, include: Type})
            DBpoke ? res.send(await Pokemon.findOne({ where: {name}, include: Type}))
            : res.send('F')
        }
    } else {
        for (let i = 1; i < 41; i++) {
            let { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + i)
            let { sprites, name, types, id, stats } = data
            let { front_default } = sprites

            pkmn.push({ front_default, name, types, id, stats })
        }
        for(const trucho of await Pokemon.findAll({include: Type})){
            pkmn.push(trucho)
        }
        res.send(pkmn)
    }
})

router.get('/pokemons/:id', async (req, res) => {
    try{
        var poke = await axios.get('https://pokeapi.co/api/v2/pokemon/' + req.params.id)
        let { sprites, name, types, id, stats, weight, height } = poke.data
        let { front_default } = sprites
        res.json({ front_default, name, types, id, stats, weight, height })
    } catch (error) {
        res.send(await Pokemon.findOne({where : {id: Number(req.params.id)}}))
    }
})

router.post('/pokemons', async (req, res) => {
    let {createThis, addThis, findThis} = req.body
    try{
    const [c, bool] = await Pokemon.findOrCreate({where:{name: findThis}, defaults: createThis})
    bool&&await c.addTypes(addThis)
    res.send(c)
    } catch(err){res.status(400).send(err)}
})

router.get('/types', async (req, res) => {
    Type.findAll().then(r=> res.json(r))
})

module.exports = router;
