const db = require('../db')
const {validate, validateEdit} = require('../models/Person')

async function getPersons(req, res)
{
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
}

async function getWithChilds(req, res)
{
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
}

function deletePerson(req, res)
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

}

function editPerson(req, res)
{
    const {id} = req.params;
    console.log(id)
    const v = validateEdit(req, id);

    if(!v.isOk)
    {
            res.status(500).json({error:v.message})
            return;
    }

    db.query('UPDATE persons set ? WHERE id = ?', [req.body, id], (err, results, fields)=>
    {
      if(err)
      {
        res.status(500).json({"error":err});
        return;
      }

      res.status(200).json({"results":results});
    });
}

function createPerson(req, res)
{
    const v = validate(req);

    if(!v.isOk)
    {
        res.status(500).json({error:v.message})
        return;
    }
    db.query('INSERT INTO persons set ?', [req.body], (err, results, fields)=>
  {
    if(err)
    {
      res.status(500).json({"error":err})
      return;
    }

    res.status(200).json({"results":results})
  });
}

module.exports =
{
    get:getPersons,
    getWithChilds:getWithChilds,
    delete:deletePerson,
    edit:editPerson,
    create:createPerson
}