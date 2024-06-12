//ESQUEMA DE CLASE REQUISICION POST

async function listaProductos() {
    const conexion = await fetch('http://localhost:3000/productos');
    const parseConexion = await conexion.json();
    return parseConexion;
}

async function enviarProducto(nombre, precio, imagen){
    const conexion = await fetch('http://localhost:3000/productos',{
        method:'POST',
        headers:{'Content-type': 'application/json'},
        body:JSON.stringify({
            nombre:nombre,
            precio:precio,
            imagen:imagen
        })
    });
    const parseConexion = conexion.json();

    return parseConexion;
}

export const conexionAPI = {
    listaProductos,enviarProducto
};






