
const createTableSql = `CREATE TABLE IF NOT EXISTS persons(

id VARCHAR(100) NOT NULL,
name VARCHAR(150),
lastName VARCHAR(150),
gender enum('Male', 'Female', 'Others') NOT NULL,
married BOOLEAN,
age INT(10),
PRIMARY KEY(id)
)
`;

module.exports=
{
    "sqlPerson": createTableSql
};