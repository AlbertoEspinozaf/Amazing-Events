function cards(eventos) {
    let templateCards = ""
    for (i = 0; i < eventos.length; i++) {
        templateCards += `<div class="card zoom">
        <div class="card-image">
            <img src='${eventos[i].image}' class="card-img-top" alt="cine">
        </div>
        <div class="card-body">
            <h5 class="card-title">${eventos[i].name}</h5>
            <p class="card-text">${eventos[i].description}</p>
            <p class="card-text">Fecha: ${eventos[i].date}</p>
        </div>
        <div class="content-card">
            <p>$ ${eventos[i].price}</p>
            <a href="/details.html?id=${eventos[i]._id}" class="card-link">Ver mas</a>
        </div>
    </div>`
    }
    document.querySelector('.caja3').innerHTML = templateCards
}

function getData() {
    return fetch('https://amazing-events.herokuapp.com/api/events')
        .then(response => response.json());
}

function crearCheckBox(todosLosEventos) {
    let checkboxes = document.getElementById('checkboxes')
    let cardscheck = todosLosEventos.map(c => c.category) // Crear un arreglo con algo especifico que necesito.
    let newcheckboxes = new Set(cardscheck)    // Para que no se duplique la categoria.
    let finalcheckboxes = [...newcheckboxes]
    let print = ''

    finalcheckboxes.forEach( //recorrer el arreglo
        everyElement => (print += ` <input type="checkbox" id="${everyElement}" name="${everyElement}" value="${everyElement}">
         <label for="${everyElement}">${everyElement}</label>`)
    )
    checkboxes.innerHTML = print

    let textQuery = "";
    let checkboxesElementos = document.querySelectorAll('input[type=checkbox]')
    let checked = []

    function eventosCheckbox() {
        return todosLosEventos.filter((evento) => {
            return checked.includes(evento.category);
        });
    }

    for (i = 0; i < checkboxesElementos.length; i++) {
        checkboxesElementos[i].addEventListener('click', (evento) => {
            if (evento.target.checked) {
                checked.push(evento.target.value)
            } else {
                checked = checked.filter(cadaCheck => cadaCheck !== evento.target.value)
            }
            const eventos = eventosFiltrados();
            cards(eventos);
        })
    }

    function eventosFiltrados() {
        let eventos = eventosCheckbox();
        if (eventos.length === 0) {
            eventos = todosLosEventos;
        }

        if (textQuery.length === 0) {
            return eventos;
        }

        return eventos.filter((evento) => {
            if (evento.name.toLowerCase().includes(textQuery)) {
                return true;
            } else {
                return false;
            }
        });
    }

    let inputSearch = document.getElementById('search')
    inputSearch.addEventListener('keyup', (evento) => {
        const query = evento.target.value.trim();
        textQuery = query;
        const eventos = eventosFiltrados();
        if (textQuery.length !== 0 && eventos.length === 0) {
            document.querySelector('.caja3').innerText = "No hay resultados";
        } else {
            cards(eventos);
        }
    })
}