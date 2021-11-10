
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

function validate(req)
{
    if(req.body.name && (req.body.name.length < 20 || req.body.name.length > 150)) 
    {

        var result = {isOk:false, message:(req.body.name.length < 20)? "El nombre de una persona debe tener 20 caracteres minimo":
        "El nombre de una persona debe tener 150 caracteres maximo"};

        return result;
    }

    const married = req.body.married;

    // married no es un campo obligatorio
    if(married && typeof married !== 'boolean')
        return {isOk:false, message:"El campo married debe ser booleano"}

    const age = req.body.age;
    console.log(typeof age)
    if(age && typeof age !== 'number')
        return {isOk:false, message:"El campo age debe ser un numero"}

    if(age && age < 0)
        return {isOk:false, message:"El campo age debe ser positivo"}

    if(!req.body.gender)
        return {isOk:false, message:"El genero es un campo obligatorio", type:"notGender"};

    const gender = req.body.gender;
    if(!(gender=== "Male" || gender === "Female" || gender === "Others"))
        return {isOk:false, message:(gender) + " no es un genero permitido"}

    return {isOk:true}
}

function validateEdit(req, id)
{
    console.log(req.body.id + " " + id)
    if(req.body.id && req.body.id !== id)
        return {isOk:false, message:"No se puede editar el id de una persona"}

    const v = validate(req)
    if(v.type && v.type === 'notGender')
        {
            //el genero es un campo obligatorio, pero en editar no tiene por que estar en el req
            return {isOk:true};
        }
     
    return v;

}
module.exports=
{
    "sqlPerson": createTableSql,
    validate:validate,
    validateEdit:validateEdit
};