let token = ``;// declaracion de una variable token vacia

//esta funcion se encarga de enviar los datos del fromulario al servidor para autenticacion
function login(){
    //fetch es una funcion de javaScript para hacer peticiones HTTP 
    fetch(`http://localhost:3000/login`, {// el primer parametro es la url a la que haremos peticion y el segundo es un objeto que contiene la configuracion de la peticion
        method: `POST`,//indica el tipo de peticion, en este caso de tipo POST, que indica que enviaremos datos al servidor en este caso nombre y contraseña
        //define los encabezados de la peticion
        headers: {"content-type": "application/json"},//indica que enviaremos datos en formato JSON
        //El body contiene los datos que enviaremos al servidor
        body: JSON.stringify({//convierte un objeto javaScript a una cadena Json
            username: document.getElementById(`username`).value,//guarda en una propiedad del objeto lo que introdujo el usuario en el input del HTML 
            password: document.getElementById(`password`).value,
        })
    })

        //Esperamos la respuesta del servidor y la convertimos en formato JSON
        .then((res)=> res.json())

        //cuando ya tenemos los datos, accedemos al token recibido
        .then((data)=>{//data recibe los datos ya convertidos a JSON
            token = data.token; //guardamos el token en la variable global
            //Mostramos el token en pantall para que el alumno vea como se ve
            document.getElementById("respuesta").innerText = "Token:\n"+token;
        });
}

function verPerfil(){//se encarga de ver un endpoint protegido del backend usando el token JWT
    //realizamos una peticion GET  a la ruta protegida
    fetch("http://localhost:3000/perfil",{
        headers: {
            //enviamos el token en el encabezado Authorization como exige JWT
            Authorization: `Bearer ${token}`, //formato correcto "Bearer <token>"
        },
    })
        //convertimos la respuesta en JSON
        .then((res) => res.json())

        //mostramos los datos recibidos en pantalla formateados
        .then((data)=>{
            document.getElementById("respuesta").innerText = JSON.stringify(//JSON.stringify convierte el objeto javascript a una cadena JSON
                data, //El contenido de la respuesta
                null,//sin reemplazo de propiedades
                2//indentacion de 2 espacios (formato bonito)
            );
        });

}

/*Nota...
que debe hacer el alumno con esto?
-tener un backend corriendo en http://localhost:3000 con dos rutas:
// POST /Llogin: valida usuario y contraseña, y responde con un JWT
// GET /perfil: devuelve datos solo si el JWT en el header Authorization es valido.
-probar que despues del login el token aparece en pantalla.
-hacer clic en ver perfil protegido y verificar que se muestran los datos del perfil */