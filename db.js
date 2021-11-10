const mysql = require('mysql');
const {database} = require('./keys');
const {sqlPerson} = require('./models/Person')
const {sqlChild} = require('./models/Child')
const {promisify} = require("util")
const bcrypt = require("bcrypt")
const pool = mysql.createPool(database)

function createTable(sql)
{
   pool.query(sql, (err, results, fields)=>{

    if(err)
        throw Error(err)

   });
}

function initializeDb()
{
    createTable(sqlPerson); // crear tabla persona si no existe
    createTable(sqlChild);
}

pool.getConnection((err, conn) => 
{
    if(err)
    {
    console.log(err)
        return;
    }

    conn.release();
    console.log('db connected')
    initializeDb();
});
pool.query = promisify(pool.query)
module.exports = pool;