Proyecto JWT con Express
Este proyecto es un ejemplo básico de autenticación con JSON Web Tokens (JWT) utilizando Node.js y Express. Permite iniciar sesión con un usuario fijo y acceder a una ruta protegida mediante un token.

Requisitos
Node.js instalado
npm instalado (viene con Node.js)
Instalación del proyecto
Inicializa el proyecto (ya realizado):
npm init -y
Instala las dependencias necesarias:
npm install express body-parser jsonwebtoken cors
Ejecutar el servidor
Ejecuta el servidor con el siguiente comando:

node server.js
El servidor se ejecutará en:

http://localhost:3000
Probar desde el navegador
Abre el archivo index.html en tu navegador.

Usa las siguientes credenciales para iniciar sesión:

Usuario: kevin
Contraseña: 123
Luego, haz clic en “Ver perfil protegido” para acceder al endpoint seguro con el token recibido.
Estructura de Archivos
server.js → Código del servidor Express con rutas /login y /perfil.
index.html → Interfaz básica en el navegador para interactuar con el servidor.
customer.js → Script que maneja el login y la obtención del perfil protegido usando fetch y JWT.
Endpoints disponibles
POST /login
Envía un JSON con username y password.
Si las credenciales son correctas, devuelve un token JWT.

GET /perfil
Ruta protegida. Requiere incluir el token en el header:
Authorization: Bearer <token>

Dependencias utilizadas
express
body-parser
jsonwebtoken
cors
