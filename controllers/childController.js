const { validate } = require("../models/Child");
const db = require('../db')

function createChild(req, res)
{
    const v = validate(req);
    if(!v.isOk)
    {
        res.status(500).json({error:v.message})
        return;
    }
    db.query('INSERT INTO childs set ?', [req.body], (err, results, fields)=>
  {
    if(err)
    {
      res.status(500).json({"error":err})
      return;
    }

    res.status(200).json({"results":results})
  });
}

function deleteChild(req, res)
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
}

module.exports =
{
    create:createChild,
    delete:deleteChild
}