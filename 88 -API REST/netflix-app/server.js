// server.js - Backend Node.js + Express + MySQL
// Academia Fibonacci - Semana 14

const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

//
// Middleware
//
app.use(express.json());
app.use(express.static('public')); // Sirve los archivos frontend

//
// Conexion a MySQL
//________________________
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'netflixdb'
});

connection.connect((err) => {
    if (err) {
        console.log('Error conectando: ', err);
        return;
    }
    console.log('Conectando a NetflixDB')
});

app.get('/api/series', (req, res) => {
    const query = 'SELECT * FROM series ORDER BY titulo';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error: ', err);
            res.status(500).json({ error: 'Error al obtener series' });
            return;
        }
        res.json(results);
    });
});

app.get('/api/series/:id', (req, res) => {
    const serieId = req.params.id;

    const query = `
        SELECT s.*,
        e.episodio_id, e.titulo as episodio_titulo,
        e.duracion, e.rating_imdb, e.temporada,
        e.descripcion as episodio_descripcion,
        e.fecha_estreno
        FROM Series s
        LEFT JOIN Episodios e ON s.serie_id = e.serie_id
        WHERE s.serie_id = ?
        ORDER BY e.temporada, episodio_id;
    `;

    connection.query(query, [serieId], (err, results) => {
        if (err) {
            console.error('Error: ', err);
            res.status(500).json({error: 'Error al obtener series'});
            return;
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});