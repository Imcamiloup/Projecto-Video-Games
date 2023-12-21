const { Genre, Videogame } = require('../db.js');

const getGenreById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const genre = await Genre.findByPk(id, {
        include: {
            model: Videogame,
            attributes: ['ID', 'Nombre', 'Rating', 'Released', 'Plataformas'],
        },
        });
    
        if (!genre) {
        return res.status(404).json({ error: 'No se encontró el género' });
        }
    
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getGenreById };
