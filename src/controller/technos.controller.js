const express = require('express');
const connection = require('../config/config');

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * from techno', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (results.length < 1) {
      res.status(404).send("il n 'y a pas de techno !");
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM techno WHERE idtechno = ?',
    //"SELECT * FROM techno a JOIN technoVinyle av ON a.idtechno = av.technoID JOIN vinyles v ON av.vinyleID = a.iddiscographie",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send('techno inconnu!');
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

router.post('/', (req, res) => {
  const { name, logo } = req.body;
  connection.query(
    'INSERT INTO techno(name, logo) VALUES(?, ?)',
    [name, logo],
    (err) => {
      if (err) {
        res.status(500).send('techno non enregistrée!');
      } else {
        res.status(201).send('La techno a bien était enregistrée');
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const idTechno = req.params.id;
  const { name, logo } = req.body;
  connection.query(
    `UPDATE techno SET name = ?, logo = ? WHERE idtechno = ?`,
    [name, logo, idTechno],
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
  const idTechno = req.params.id;
  connection.query(
    'DELETE FROM techno WHERE idtechno = ?',
    [idTechno],
    (err) => {
      if (err) {
        res.status(500).send("la suppression n' a pas marché !");
      } else {
        res.status(200).send('techno bien supprimée');
      }
    }
  );
});

module.exports = router;
