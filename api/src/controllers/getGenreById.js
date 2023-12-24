const getGenreById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const genre = await Genre.findByPk(id, {
        include: Videogame,
      });
  
      if (genre) {
        res.status(200).json({
          id: genre.id, // Cambiado de genre.ID a genre.id
          Nombre: genre.Nombre,
          Videogames: genre.Videogames.map((videojuego) => ({
            id: videojuego.id, // Cambiado de videojuego.ID a videojuego.id
            Nombre: videojuego.Nombre,
            // Agrega más campos según sea necesario
          })),
        });
      } else {
        res.status(404).json({ error: 'Genre not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { getGenreById };
  