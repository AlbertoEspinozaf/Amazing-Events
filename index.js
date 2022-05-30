async function run() {
    const contenedor = document.querySelector('.caja3');
    contenedor.innerText = `Cargando eventos...`;
    try {
        const data = await getData();
        crearCheckBox(data.events);
        cards(data.events);
    } catch (error) {
        console.log(error);
        contenedor.innerText = `Hubo un error en el servidor.`;
    }
}

run();