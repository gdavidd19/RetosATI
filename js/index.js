const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || `ES`;

const conf = document.createElement('script');
conf.type = 'text/javascript';
conf.src = `conf/config${lang}.json`;
conf.onload = () => {
    const search = urlParams.get('search') || '';
    document.getElementsByTagName('title')[0].innerHTML = `${config.home}`;
    document.getElementsByClassName('titulo')[0].innerHTML = `${config.site[0]}<p id="ucv">${config.site[1]}</p>${config.site[2]}`;
    document.getElementsByClassName('enlaceLogo')[0].href = `index.html?lang=${lang}`;
    document.getElementById('campoBusqueda').placeholder = `${config.name}...`;
    if (search != '') {
        document.getElementById('campoBusqueda').value = `${search}`;
    }
    document.getElementById('botonBusqueda').innerHTML = `${config.search}`;

    const formulario = document.getElementById('busqueda');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        window.location.href = `index.html?lang=${lang}&search=${formulario.elements[0].value}`;
    });

    document.getElementsByTagName('footer')[0].innerHTML = `${config.copyRight}`;
    document.getElementById('semestre').innerHTML = `${config.semester}`;

    var cantPerfiles = profiles.length;
    var perfilesCreados = [];
    var contadorPerfil = 0;
    for (let i = 0; i < cantPerfiles; i++) {
        if (search == '' || profiles[i].name.includes(`${search}`)) {
            document.getElementById("perfiles").innerHTML +=
                `<div class="cajaPerfil">
                    <img src="${profiles[i].ci}/${profiles[i].ci}Big${profiles[i].image_ext}" id="fotoPerfilBig" class="fotoPerfil">
                    <img src="${profiles[i].ci}/${profiles[i].ci}Small${profiles[i].image_ext}" id="fotoPerfilSmall" class="fotoPerfil">
                    <div class="cajaNombrePerfil"><p class="nombrePerfil">${profiles[i].name}</p></div>
                    <hr class="lineaInferior">
                </div>`;
            perfilesCreados[contadorPerfil] = i;
            contadorPerfil++;
        }
    }
    if (contadorPerfil == 0) {
        document.getElementById("noEncontrado").innerHTML = `${config.no_found.replace("[query]", `&nbsp<b>${search}</b>`)}`;
    }

    perfiles = document.getElementsByClassName('cajaPerfil');
    for (let i = 0; i < cantPerfiles; i++) {
        perfiles[i].addEventListener("click", function () {
            window.location.href = `profile.html?lang=${lang}&ci=${profiles[perfilesCreados[i]].ci}`;
        });
    }
};
document.head.appendChild(conf);