document.getElementById('imprimirArray').innerHTML = JSON.stringify(data, ['name'], 2)

let data = JSON.stringify(data, ['name'], 2)

console.log(JSON.parse(data))