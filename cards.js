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
            <a href="/details.html?id=${eventos[i].id}" class="card-link">Ver mas</a>
        </div>
    </div>`
    }
    document.querySelector('.caja3').innerHTML = templateCards
}
