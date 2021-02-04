const express = require('express');
const connection = require('../config/config');

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * from client ORDER BY name ASC', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (results.length < 1) {
      res.status(404).send("il n 'y a pas de clients !");
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM client WHERE idclient = ?',
    //"SELECT * FROM client a JOIN clientVinyle av ON a.idclient = av.clientID JOIN vinyles v ON av.vinyleID = a.iddiscographie",
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
  const { name, logo } = req.body;
  connection.query(
    'INSERT INTO client(name, logo) VALUES(?, ?)',
    [name, logo],
    (err) => {
      if (err) {
        res.status(500).send('clieny non enregistré!');
      } else {
        res.status(201).send('le client a bien était enregistré');
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const idclient = req.params.id;
  const { name, logo } = req.body;
  connection.query(
    `UPDATE client SET name = ?, logo = ? WHERE idclient = ?`,
    [name, logo, idclient],
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
  const idclient = req.params.id;
  connection.query(
    'DELETE FROM client WHERE idclient = ?',
    [idclient],
    (err) => {
      if (err) {
        res.status(500).send("la suppression n' a pas marché !");
      } else {
        res.status(200).send('client bien supprimé');
      }
    }
  );
});

module.exports = router;
