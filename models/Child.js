
const createTableSql = `CREATE TABLE IF NOT EXISTS childs(

id VARCHAR(100) NOT NULL PRIMARY KEY,
name VARCHAR(150),
personId VARCHAR(100),
CONSTRAINT fk FOREIGN KEY (personId) REFERENCES persons(id)
)
`;

module.exports=
{
    "sqlChild": createTableSql
};