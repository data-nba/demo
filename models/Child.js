
const createTableSql = `CREATE TABLE IF NOT EXISTS childs(

id VARCHAR(100) NOT NULL PRIMARY KEY,
name VARCHAR(150),
personId VARCHAR(100),
CONSTRAINT fk FOREIGN KEY (personId) REFERENCES persons(id)
)
`;

function validate(req)
{

    if(!req.body.name)
        return {isOk:false, message:"El campo nombre es requerido"}

    if(req.body.name.length <= 150 && req.body.name.length >= 20)
        return {isOk:true}

    var result = {isOk:false, message:(req.name.length < 20)? "El nombre de un hijo debe tener 20 caracteres minimo":
"El nombre de un hijo debe tener 150 caracteres maximo"};

return result;
}

module.exports=
{
    "sqlChild": createTableSql,
    validate:validate
};