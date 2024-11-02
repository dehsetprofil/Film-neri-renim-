// server.js
const express = require('express');
const axios = require('axios');
const config = require('./config');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/recommendations', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${config.TMDB_API_KEY}&language=en-US&page=1`);
        res.json(response.data.results);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).send('API error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
