

document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById("searchButton");
    search.addEventListener("click", function(){
        // Aquí vamos a hacer la petición a la API y renderizar los videos que coincidan con el texto de búsqueda.
        const URL = "https://www.scorebat.com/video-api/v3/feed/?token=MTgzNzQ2XzE3MzAwOTg4MThfZjE0ZmI4YzkxM2I4YWJjYjE3ZDY2ZTNhMTY1OGZiY2I3OTU4NTI0MQ"
        let videos = [];
        const dataContainer = document.getElementById("container")

        fetch(URL)
        .then(response => response.json())
        .then(data => {
            videos = data.response;
            //estamos en el response

            const texto = document.getElementById("searchInput").value.toLowerCase();
            if(texto === "") {
                //debe escribir algo
                alert("Por favor, escriba algo para buscar");
                return;
            }
            let teams = [];
            //separamos para buscar mejor
            if(texto.includes(' vs ')){
                teams = texto.split(' vs ');
            } else if(texto.includes(' - ')) {
                teams = texto.split(' - ');
                    } else if(texto.includes(' versus ')) {
                        teams = texto.split(' versus ');
                            } else if(texto.includes(' ')){
                                //q solo separe con el primer espacio
                                teams = texto.split(/ (.+)/);
                                }
            if(teams.length >= 2) {
                //buscamos ambos equipos
                filtrados = videos.filter(video => video.title.toLowerCase().includes(teams[0]) && video.title.toLowerCase().includes(teams[1]));
            } else if(teams.length === 1) {
                    //si tiene un espacio al final, pero solo un team. le sacamos el espacio del final
                    teams[0] = teams[0].slice(0, teams[0].length -1)
                    filtrados = videos.filter(video => video.title.toLowerCase().includes(teams[0]));
                } else {
                    // solo especificaron un team
                    filtrados = videos.filter(video => video.title.toLowerCase().includes(texto));
                }

            if(filtrados.length === 0) {
                alert("No hay resultados para su búsqueda");
                console.log(filtrados);
                return;
            }
            // Limpiamos el contenido anterior y renderizamos los videos filtrados.
            dataContainer.innerHTML = '';
            filtrados.forEach(video => {
                const item = `
                <div class="video-item">
                    <h2 class="title2">${video.title}</div>
                    <a href=${video.matchviewUrl} class="url">Match view</a>
                    <a href=${video.competitionUrl} class="url">Competition</a>
                    ${video.videos[0].embed}
                </div>
                
                `;
                dataContainer.innerHTML += item;
            });
        })
        .catch(error => {
            console.error('Error al cargar los videos:', error);
            dataContainer.innerHTML = 'Hubo un error al cargar los videos.';
        });
    });

});
