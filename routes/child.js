var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET home page. */


//eliminar hijo
router.delete('/:id', (req, res)=>
{
  const {id} = req.params;

  db.query('DELETE from childs WHERE id = ?', [id], (err, results, fields) =>
  {
      if(err){
        res.status(500).json({err})
        return;
      }

      res.status(200).json({results})
  });

})


//crear hijo
router.post('/', (req, res)=>
{
  db.query('INSERT INTO childs set ?', [req.body], (err, results, fields)=>
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