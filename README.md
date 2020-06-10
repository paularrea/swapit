# PROJECT-2
Description
Swap it es una plataforma social pensada para realizar intercambios de productos entre personas utilizando las fotografías, cosas echas a mano, dibujos, articulos de decoración, etc, como moneda de cambio.

Consiste en una MERN stack responsive web app realizada para poner en práctica conocimientos adquiridos como React Hooks, implementando librerías como Bootstrap, socket.io y componentes de material UI para el frontend.
Hemos utilizado NodeJS y Express para el server side utilizando Cloudinary para el almacenamiento y gestión de imágenes y 
MongoDB para el almacenamiento de los datos de los usuarios y deploy con heroku.

Una vez registrado el usuario puede:

1. Profile page
    En esta página el usuario puede editar editar su perfil, modificando su foto o nombre.
    Subir fotos de sus propias creaciones y editarlas. 
    Ver sus propias creaciones ya subidas (Own creations).
    Ver su lista de deseos (whish list).

2. Discover page
    El usuario puede buscar productos de otros usuarios y darle a 'like'. De esta forma se añadirían en su lista de deseos.
    Para facilitar su búsqueda el usuario puede filtrar según la categoría del producto o mediante palabras clave.
    Al hacer click en una de las imágenes nos redirige a la pagina detalle del producto donde podemos ver sus características, otros productos relacionados y acceder al perfil del creador.

    2.1. Notifications
        Consiste en un modal para ver cuales de nuestros productos han gustado y a quién. Al hacer click en alguno nos redirigirá al perfil del usuario donde podremos ver sus creaciones para un posible intercambio.

    2.2. Chat
        Se nos abrirá un chat para negociar el intercambio de productos cuando nos guste por lo menos un producto de un usuario y a este le guste uno nuestro.
    

    https://swap-it-app.herokuapp.com/

