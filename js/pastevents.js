async function run() {
    const contenedor = document.querySelector('.caja3');
    contenedor.innerText = `Cargando eventos...`;
    const data = await getData();
    const eventos = data.events.filter(evento => {
        return data.currentDate > evento.date;
    })

    crearCheckBox(eventos);
    cards(eventos);
}

run();