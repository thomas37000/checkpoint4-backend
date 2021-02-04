const express = require('express');
const connection = require('../config/config');

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * from favourite ORDER BY name ASC', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (results.length < 1) {
      res.status(404).send("il n 'y a pas vos favoris !");
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM favourite WHERE idfavourite = ?',
    //"SELECT * FROM favourite a JOIN favouriteVinyle av ON a.idfavourite = av.favouriteID JOIN vinyles v ON av.vinyleID = a.iddiscographie",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send('favoris inconnu!');
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

router.post('/', (req, res) => {
  const { name, pictures } = req.body;
  connection.query(
    'INSERT INTO favourite(name, pictures) VALUES(?, ?)',
    [name, pictures],
    (err) => {
      if (err) {
        res.status(500).send('favoris non enregistré!');
      } else {
        res.status(201).send('Vos favoris ont bien était enregistré');
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const idFavourite = req.params.id;
  const { name, pictures } = req.body;
  connection.query(
    `UPDATE favourite SET name = ?, pictures = ? WHERE idfavourite = ?`,
    [name, pictures, idFavourite],
    (error, result) => {
      if (error) {
        res.status(500).json({ errorMessage: error.message });
      } else {
        res.status(200).json({ result });
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const idFavourite = req.params.id;
  connection.query(
    'DELETE FROM favourite WHERE idfavourite = ?',
    [idFavourite],
    (err) => {
      if (err) {
        res.status(500).send("la suppression n' a pas marché !");
      } else {
        res.status(200).send('favoris bien supprimé');
      }
    }
  );
});

module.exports = router;
