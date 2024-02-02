 const express = require('express');
// create new router
const router = express.Router();


let users = {
  admin: {
    id: 1,
    password: 'admin'
  },
  user: {
    id: 2,
    password: 'password'
  }
}

let tickets = [];

// // this end-point of an API returns JSON tickets array
// router.get('/', function (req, res) {
//     res.status(200).json(tickets);
// });

// this end-point returns an array of tickets by user id
// we get `id` from URL end-points
router.get('/:userId/tickets', function (req, res) {
    // find the ticket from `tickets` array match by `id`
    let found = tickets.filter(function (item) {
        return item.userId === parseInt(req.params.userId);
    });
    // if object found return an object else return 404 not-found
    if (found.length > 0) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

router.get('/tickets', function (req, res) {
    // find an object from `tickets` array match by `id`
    // if object found return an object else return 404 not-found
      return res.status(200).json(tickets);
});

router.post('/login', function (req, res) {
    // find an object from `tickets` array match by `id`
    // if object found return an object else return 404 not-found
    let user = users[req.body.username];
    console.log('user --- ', user);
    if (user.id === 1) {
      // admin user returning all tickets
      return res.status(200).json({
        user: {id: user.id, username: req.body.username},
        tickets,
      });
    } else if (user.id === 2) {
      // end user returning user tickets
      let found = tickets.filter(function (item) {
        return item.userId === parseInt(req.params.userId);
      });
      res.status(200).json({
        user: {id: user.id, username: req.body.username},
        tickets: found,
      });
    } else {
      // user not found returning error
      res.sendStatus(404);
    }
});

router.post('/ticket/update', function (req, res) {
  // modify an object from `tickets` array match by `id`
  // if object found return an object else return 404 not-found
  tickets = tickets.map(function (item) {
    if (item.id === parseInt(req.body.id)) {
      return {...item, ...req.body};
    }
    return item;
  });

  res.status(200).json(tickets);
});

router.post('/ticket/create', function (req, res) {
  // modify an object from `tickets` array match by `id`
  // if object found return an object else return 404 not-found
  console.log('req.body.name --- ', req.body)
  if (req.body.name) {
    tickets = [...tickets, {...req.body, id: Date.now()}];
    res.status(200).json(tickets);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;