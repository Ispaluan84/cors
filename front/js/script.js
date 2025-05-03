function getRickAndMorty() {

    const nombrePersonaje = document.getElementById('personaje');
    const infoPersonaje = document.getElementById('infoPersonaje');
    
    const charactersName = nombrePersonaje.value.toLocaleLowerCase();

    fetch(`https://rickandmortyapi.com/api/character/?name=${charactersName}`)

        .then(response => response.json())
        .then(data => {
            const character = data.results[0]
            const {name, status, species, gender, origin, image} = character
            infoPersonaje.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${image}"/>
            <p>${status}</p>
            <p>${species}</p>
            <p>${gender}</p>
            <p>${origin.name}</p>
            `
        }) .catch(error => infoPersonaje.innerHTML = `<p>Imposible acceder al Personaje</p>`)


}