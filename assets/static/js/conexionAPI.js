//ESQUEMA DE CLASE REQUISICION POST

async function listaProductos() {
    const conexion = await fetch('http://localhost:3000/productos');
    const parseConexion = await conexion.json();
    return parseConexion;
}

export const conexionAPI = {
    listaProductos
};






