const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/character', async (req,res) => {
    const url = 'https://rickandmortyapi.com/api/character';

    try {
        const response = await axios.get(url);
        const characters = response.data.results.map(character => ({
            name: character.name,
            status: character.status,
            species: character.species
        }));

        res.json(characters)
    } catch(ERROR) {
        res.status(404).json({error: 'Error al cargar los personajes'})
    }
});

app.get('/character/:charactersName', async (req, res) => {
    const charactersName = req.params.charactersName;
    const url = `https://rickandmortyapi.com/api/character/?name=${charactersName}`

    try {
        const response = await axios.get(url);
        const {name, status, species, gender, origin: {name: originName}, image} = response.data.results[0]
        
        res.json({name, status, species, gender, origin: {name: originName}, image})
    } catch(ERROR) {
        res.status(404).json({error: 'Personaje no encontrado'})
    }

})


app.listen(port, () => {
    console.log(`Servidor express escuchando en http://localhost:${port}/character/`)
})