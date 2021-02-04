const express = require('express');
const connection = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * from project', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (results.length < 1) {
      res.status(404).send("il n 'y a pas de projets !");
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM project WHERE idproject = ?',
    //"SELECT * FROM project a JOIN projectVinyle av ON a.idproject = av.projectID JOIN vinyles v ON av.vinyleID = a.iddiscographie",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send('project inconnu!');
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

router.post('/', (req, res) => {
  const { date, description, links, name, pictures } = req.body;
  connection.query(
    'INSERT INTO project(date, description, links, name, pictures) VALUES(?, ?, ?, ?, ?)',
    [date, description, links, name, pictures],
    (err) => {
      if (err) {
        res.status(500).send('projet non enregistré!');
      } else {
        res.status(201).send('Le projet a bien était enregistré');
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const idProject = req.params.id;
  const { date, description, links, name, pictures } = req.body;
  connection.query(
    `UPDATE project SET date = ?, description = ?, links = ?, pictures = ?, name = ?, pictures = ? WHERE idproject = ?`,
    [date, description, links, name, pictures, idProject],
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
  const idProject = req.params.id;
  connection.query(
    'DELETE FROM project WHERE idproject = ?',
    [idProject],
    (err) => {
      if (err) {
        res.status(500).send("la suppression n' a pas marché !");
      } else {
        res.status(200).send('projet bien supprimé');
      }
    }
  );
});

module.exports = router;
