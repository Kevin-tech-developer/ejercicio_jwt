let token = ``;// declaracion de una variable token vacia

function login(){// se crea la funcion
    //fetch es uan funcion de javaScript para hacer peticiones HTTP 
    fetch(`http://localhost:3000/login`, {// el primer parametro es la url a la que haremos peticion y el segundo es un objeto que contiene la configuracion de la peticion
        method: `POST`,//indica el tipo de peticion, en este caso de tipo POST, que indica que enviaremos datos al servidor en este caso nombre y contraseña
        //define los encabezados de la peticion
        headers: {"content-type": "application/json"},//indica que enviaremos datos en formato JSON
        //El body contiene los datos que enviaremos al servidor
        body: JSON.stringify({//convierte un objeto javaScript a una cadena Json
            username: document.getElementById(`username`).value,//guarda en una propiedad del objeto lo que introdujo el usuario en el input del HTML
            password: document.getElementById(`password`).value,
        })
    });
}