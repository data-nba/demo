var express = require('express');
const pool = require('../db');
var router = express.Router();
const db = require('../db')

/* listar personas con su cantidad de hijos */
router.get('/', async function(req, res) {

    try
    {

    //selecciono a las personas
    const results = await db.query('SELECT * from persons');

 for(let i = 0; i < results.length; i++)
 {
     //le adjunto a cada persona una propiedad cantidad de hijos
     const childs = await db.query('SELECT COUNT(id) as count from childs WHERE personId = ?', [results[i].id]);
     
     results[i].cant_childs = childs[0].count;

 }
    res.status(200).json({"results":results})
}
catch(e)
{
    res.status(500).json({"error":e})
}
});

//listar personas con el listado de sus hijos
router.get('/with-childs', async function(req, res) {
    try{
    //selecciono a todas las personas
    const results = await db.query('SELECT * from persons');

    for(let i = 0; i < results.length; i++)
    {
        // le anhado los hijos a cada persona
        const childs = await db.query('SELECT * from childs WHERE personId = ?', [results[i].id]);
        results[i].childs = childs;
    }

    res.status(200).json({"results":results})
}
catch(e)
{
    res.status(500).json({"error":e});
}
});

//eliminar persona
router.delete('/:id', (req, res)=>
{
  const {id} = req.params;

  //elimino a todos sus hijos
  db.query('DELETE from childs WHERE personId = ?', [id], (err, results, fields) =>
  {
      if(err){
        res.status(500).json({err})
        return;
      }

      //elimino a la persona
      db.query('DELETE from persons WHERE id = ?', [id], (err, results, fields)=>
      {
        if(err){
            res.status(500).json({err})
            return;
          }

          res.status(200).json({results})
      })
  });

})

//editar persona
router.put('/:id', (req, res)=>
{
  const {id} = req.params;
  db.query('UPDATE persons set ? WHERE id = ?', [req.body, id], (err, results, fields)=>
  {
    if(err)
    {
      res.status.json({"error":err});
      return;
    }

    res.status(200).json({"results":results});
  });
})

//crear persona
router.post('/', (req, res)=>
{
  db.query('INSERT INTO persons set ?', [req.body], (err, results, fields)=>
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