# demo
se debe crear antes de correr el server una base de datos con el nombre demo_evaluar_db (modificar el archivo 'key.js' en la raiz para cambiar la configuracion de la base de datos si asi lo desea)

al iniciar por primera vez el server se crearan las tablas de persona e hijo respectivamente

endpoints:

localhost:4000/person (GET): lista las personas con su cantidad de hijos

              /person (POST): para crear una persona
              
              /person (PUT): editar una persona
              
              /person/:id (DELETE) eliminar una persona
              
              /person/with-childs (get) listar a las personas con sus hijos listados
              
              /child (POST) crear hijo
              /child (DELETE) eliminar hijo
              
          estructura del body JSON para post y put
          
          person:{
                "id":<value>,
                "name": <value>,
                "lastName": <value>,
                "gender": <value>,
                "married": <value>,
                "age": <value>),
                }
                
          child:{
          "id":<value>,
          "name"<value>,
          "personId":<value>
          }
