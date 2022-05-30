async function run() {
    try {
        const data = await getData();

        let idParam = (location.search.split("=")[1]);
        console.log(idParam);
        let evento = data.events.find((evento) => evento._id == idParam);
        console.log(evento);

        let contenedorDetails = document.getElementById('eventoDetail')
        let card = `<div class="image-container">
<img src="${evento.image}" class="card-img-top" alt="fiesta de disfraces">
</div>

<div class="card">

<div class="card-body">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text"><small class="text-muted">${evento.date}</small></p>
    <p class="card-text">${evento.description}</p>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"><b>Place:</b>${evento.place}</li>
        <li class="list-group-item"><b>Category:</b>${evento.category}</li>
        <li class="list-group-item"><b>Capacity:</b>${evento.capacity}</li>
    </ul>
</div>
</div>`

        contenedorDetails.innerHTML = card;

    } catch (error) {
        console.log(error);
        alert(`Hubo un error en el servidor.`)
    }
}

run();


