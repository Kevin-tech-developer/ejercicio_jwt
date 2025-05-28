
//importacion de moculos
const express = require(`express`);//framework para crear un servidor facilmente, framework web para node.js

const bodyparser = require(`body-parser`);//permite leer el contenido json que nos envia el cliente

const jwt = require(`jsonwebtoken`);//permite crear y verificar tokens jwt(muy usados en logins seguros)

const cors  = require(`cors`)//perimite solicitudes de dominios distintos (como por ejemplo dessde el navegador puedan comunicarse con este servidor)


//configuracion del servidor
const app = express();//creacion de la app de express()
const port = 3000;// se define el puerto en el que escuchara el servidor
const SECRET_KEY = "mi_clave_secreta";// es una clave secreta para firmar los tokens, no se puede compartir en muy secreta

//middlew (plocesadores de peticiones)
app.use(cors());//habilita cors para que otros origenes puedan hacer peticiones al servidor
app.use(bodyparser.json());//permite que el servidor entienda peticiones con cuerpos JSON

//usuario fijo sin base de datos
const USUARIO = {//objeto USUARIO, solo con nombre y contraseña para probar el login
    unsername : "kevin",
    password: "123",
};

//login publico (post/login)
app.post(`/login`, (req, res) =>{//define la ruta HTTP POST llamada /login, (req, res) y se debe pedir algo para evaluar y se debe entregar un resultado(token)
    const {username, password} = req.body;//se pide el nombre y contraseña. res.body

    if(username ===USUARIO.unsername && password ===USUARIO.password){//se evalua si lo que entrego el usuario es igual a la informacion del objeto
        const token = jwt.sign({username}, SECRET_KEY, {expiresIn: `1h`})//si si es correcto se crea un token, usando su nombre, la firma que seria la clave y el tiempo de expiracion del token
        return res.json({token});//entrega el token en forma de JSON. res.Json
    }
    res.status(401).json({message: `Credenciales invalidas`}) //si la informacion que entrego el usuario es incorrecta se genere un error de tipo 401, y se envia un mensaje en Json
} );

//ruta protegida que solo puede ser accedida con un token valido
app.get("/perfil", (req, res)=>{//define la URL a la que se accedera "/perfil"
    //obtenemos el header `Authorization` que debe contener el token
    const authHeader = req.headers["authorization"];
    //Extraemos el token del header (el formato es "Bearer <token>")
    const token = authHeader && authHeader.split (" ")[1];//split divide el string usando un espacio y [1] toma el segundo elemento

    //si no se envio el token, respondemos con error 401 (no autorizado)
    if(!token)return res.status(401).json({message : "token requerido"});//responde en forma de Json

    try {
        //verificamos el toque usando la clave secreta
        const decoded = jwt.verify(token, SECRET_KEY);
        //Si el token es valido, respndemos con un mensaje de acceso concedido y los datos decodificados
        res.json({message: "Acceso concedido", user: decoded})//envia una respuesta en formato Json y user los datos decodificados
    } catch (err) {
        //si el token es invalido o expiro, respondemos con error 403(prohibido)
        res.status(403).json({message : "token invalido expirado"})
    }
});

//iniciamos el servidor y escuchamos en el puerto definido
app.listen(port, ()=>{
    console.log(`servidos corriedo en http:localhost:${port}`);
});

/*nota...
que puede aprender el aulmno con este codigo?
-como crear un servivior basico con Express
-como recibir datos con body-parse
como generar y verificar JWT con la libreria Jsonwebtoken
como proteger rutas y enviar respuestas segun el estado de una autenticacion
como usar middleware para CORSS*/ 
