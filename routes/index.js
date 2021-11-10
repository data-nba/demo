var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/', function(req, res) {
  db.query('SELECT * from links', (err, results, fields)=>
  {
    if(err)
    {
      res.status(500).json({"error":err})
      return;
    }

    console.log("ok")
    res.status(200).json({"results":results})
  })
});

router.delete('/:id', (req, res)=>
{
  const {id} = req.params;

  db.query('DELETE from links WHERE id = ?', [id], (err, results, fields) =>
  {
      if(err){
        res.status(500).json({err})
        return;
      }

      res.status(200).json({results})
  });

})

router.put('/:id', (req, res)=>
{
  const {id} = req.params;
  db.query('UPDATE links set ? WHERE id = ?', [req.body, id], (err, results, fields)=>
  {
    if(err)
    {
      res.status.json({"error":err});
      return;
    }

    res.status(200).json({"results":results});
  });
})

router.post('/add', (req, res)=>
{
  db.query('INSERT INTO links set ?', [req.body], (err, results, fields)=>
  {
    if(err)
    {
      res.status(500).json({"error":err})
      return;
    }

    res.status(200).json({"results":results})
  })
})

module.exports = router;
