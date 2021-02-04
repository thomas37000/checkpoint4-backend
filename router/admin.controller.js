const express = require('express');
const connection = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * from admin', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (results.length < 1) {
      res.status(404).send("il n 'y a pas d' admins !");
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM admin WHERE idadmin = ?',
    //"SELECT * FROM admin a JOIN adminVinyle av ON a.idadmin = av.adminID JOIN vinyles v ON av.vinyleID = a.iddiscographie",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send('admin inconnu!');
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

router.post('/', (req, res) => {
  const {
    date,
    description,
    firstname,
    email,
    lastname,
    links,
    pictures,
    password,
  } = req.body;
  connection.query(
    'INSERT INTO admin(date, description, firstname, email, lastname, links, pictures, password) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
    [date, description, firstname,email , lastname, links, pictures, password],
    (err) => {
      if (err) {
        res.status(500).send('admin non enregistré!');
      } else {
        res.status(201).send('Vous êtes bien enregistré');
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const idadmin = req.params.id;
  const { date, description, firstname, email, lastname, links, pictures, password } = req.body;
  connection.query(
    `UPDATE admin SET date = ?, description = ?, firstname = ?, email = ?, lastname = ?, links = ?, pictures = ?, password= ? WHERE idadmin = ?`,
    [date, description, firstname, email, lastname, links, pictures, password, idadmin],
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
  const idAdmin = req.params.id;
  connection.query(
    'DELETE FROM admin WHERE idadmin = ?',
    [idAdmin],
    (err) => {
      if (err) {
        res.status(500).send("la suppression n' a pas marché !");
      } else {
        res.status(200).send('Admin bien supprimé');
      }
    }
  );
});

module.exports = router;
