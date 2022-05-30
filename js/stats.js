
function calcularDatos(events, currentDate) {
    //tabla 1
    // ...events " copiar antes de ordenar para no cambiar el original"

    const eventosOrdenadosPorAttendance = [...events].sort((izq, der) => {
        return Number(izq.assistance) / Number(izq.capacity) - Number(der.assistance) / Number(der.capacity);
    });
    // izq - der = ascendente
    const eventosOrdenadosPorCapacity = [...events].sort((izq, der) => {
        return Number(izq.capacity) - Number(der.capacity);

    });

    const menorPorcentageDeAttendance = eventosOrdenadosPorAttendance[0];
    const mayorPorcentageDeAttendance = eventosOrdenadosPorAttendance[events.length - 1];
    const eventLargerCapacity = eventosOrdenadosPorCapacity[events.length - 1];
    document.getElementById('highest-attendance').innerText = mayorPorcentageDeAttendance.name
    document.getElementById('lowest-attendance').innerText = menorPorcentageDeAttendance.name
    document.getElementById('larger-capacity').innerText = eventLargerCapacity.name

    //tabla 2

    const upComingEvents = events.filter(evento => {
        return currentDate < evento.date;
    })

    // name, revenues, % attendance 
    let templateRow = ` <tr>
    <td>Categories</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
    </tr>`
    let categories = [...new Set(upComingEvents.map(e => e.category))]
    categories.forEach(c => {
        let eventos = upComingEvents.filter(e => e.category === c) // Todos los eventos de la categoria c
        let revenue = 0;
        let estimates = 0;
        let capacity = 0;

        eventos.forEach(e => {
            revenue += Number(e.price) * Number(e.estimate) // 
            estimates += Number(e.estimate)
            capacity += Number(e.capacity)
        })
        //totales r , e , c //
        templateRow += ` 
       <tr>
        <td>${c}</td>
        <td>$ ${revenue}</td>
        <td>${parseInt(estimates / capacity * 100)}%</td>
       </tr>`
    })

    document.getElementById('upComingStats').innerHTML = templateRow

    const pastEvents = events.filter(evento => {
        return currentDate > evento.date;
    })

    // name, revenues, % attendance 
    templateRow = ` <tr>
    <td>Categories</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
</tr>`
    categories = [...new Set(pastEvents.map(e => e.category))]
    categories.forEach(c => {
        let eventos = pastEvents.filter(e => e.category === c) // Todos los eventos de la categoria c
        let revenue = 0;
        let assistance = 0;
        let capacity = 0;

        eventos.forEach(e => {
            revenue += Number(e.price) * Number(e.assistance) // 
            assistance += Number(e.assistance)
            capacity += Number(e.capacity)
        })
        //totales r , e , c //
        templateRow += ` 
       <tr>
        <td>${c}</td>
        <td>$ ${revenue}</td>
        <td>${parseInt(assistance / capacity * 100)}%</td>
       </tr>`
    })

    document.getElementById('pastStats').innerHTML = templateRow

}

async function run() {

    try {
        const data = await getData();
        calcularDatos(data.events, data.currentDate);
    } catch (error) {
        console.log(error);
        contenedor.innerText = `Hubo un error en el servidor.`;
    }
}
run();
