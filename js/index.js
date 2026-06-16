var search = '';
var ciActual = -1;
const appContainer = document.getElementsByTagName('section')[0];

function renderizar(contenidoHTML) {
    appContainer.innerHTML = contenidoHTML;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

async function cargar(archivo) {
    const response = await fetch(archivo);
    return await response.json();
}

async function cargarVistaPerfiles() {
    const config = await cargar('get-config');
    const profiles = await cargar('data/index.json');
    var cantPerfiles = profiles.length;
    var perfilesCreados = [];
    var contadorPerfil = 0;
    var htmlPerfiles = `<h2 id="semestre">${config.semester}</h2>
                    <div id="perfiles">`;
    const regex = new RegExp(`[A-Za-z]*${search}[A-Za-z]*`, 'i');
    for (let i = 0; i < cantPerfiles; i++) {
        if (search == '' || regex.test(profiles[i].name)) {
            htmlPerfiles += `<div class="cajaPerfil">
        <img src="${profiles[i].ci}/${profiles[i].ci}Big${profiles[i].image_ext}" id="fotoPerfilBig" class="fotoPerfil">
            <img src="${profiles[i].ci}/${profiles[i].ci}Small${profiles[i].image_ext}" id="fotoPerfilSmall" class="fotoPerfil">
                <div class="cajaNombrePerfil"><p class="nombrePerfil">${profiles[i].name}</p></div>
                <hr class="lineaInferior">
                </div>`;
            perfilesCreados[contadorPerfil] = i;
            contadorPerfil++;
        }
    }

    htmlPerfiles += `</div>`;
    if (contadorPerfil == 0) {
        htmlPerfiles += `<p id="noEncontrado">${config.no_found.replace("[query]", `&nbsp<b>${search}</b>`)}</p>`;
    }

    renderizar(htmlPerfiles);

    perfiles = document.getElementsByClassName('cajaPerfil');
    for (let i = 0; i < cantPerfiles; i++) {
        perfiles[i].addEventListener("click", function () {
            ciActual = `${profiles[perfilesCreados[i]].ci}`
            cargarVistaPerfil(ciActual);
            search = '';
            document.getElementById('campoBusqueda').value = '';
            document.getElementById('campoBusquedaMini').value = '';
        });
    }
}

async function cargarVistaPerfil(ci) {
    const config = await cargar('get-config');
    const profile = await cargar(`${ci}/profile.json`);

    document.getElementsByTagName('title')[0].innerHTML = `${profile.name}`;

    var htmlPerfil = `
            <div id="cajaPerfil">
                <div id="cajaFotoPerfil">
                    <img id="fotoPerfilBig" class="fotoPerfilPrincipal" src="${ci}/${ci}Big${profile.image_ext}">
                    <img id="fotoPerfilSmall" class="fotoPerfilPrincipal" src="${ci}/${ci}Small${profile.image_ext}">
                </div>
            <div id="cajaTexto">
                <h1 id="nombre">${profile.name}</h1>
                <p><i id="descripcion">${profile.description}</i></p>
                <table> 
                    <tr>
                        <td class="primeraColumna">${config.color}:</td>
                        <td class="segundaColumna">${profile.color}</td>
                    </tr>
                    <tr>`;

    if (profile.book.length > 1) {
        htmlPerfil += `<td class="primeraColumna">${config.book[1]}:</td>`;
    } else {
        htmlPerfil += `<td class="primeraColumna">${config.book[0]}:</td>`;
    }
    htmlPerfil += `<td class="segundaColumna">`;
    for (let i = 0; i < profile.book.length - 1; i++) {
        htmlPerfil += `${profile.book[i]}, `;
    }
    htmlPerfil += `${profile.book[profile.book.length - 1]}</td></tr><tr>`;

    if (profile.music.length > 1) {
        htmlPerfil += `<td class="primeraColumna">${config.music[1]}:</td>`;
    } else {
        htmlPerfil += `<td class="primeraColumna">${config.music[0]}:</td>`;
    }
    htmlPerfil += `<td class="segundaColumna">`;
    for (let i = 0; i < profile.music.length - 1; i++) {
        htmlPerfil += `${profile.music[i]}, `;
    }
    htmlPerfil += `${profile.music[profile.music.length - 1]}</td></tr><tr>`;

    if (profile.video_game.length > 1) {
        htmlPerfil += `<td class="primeraColumna">${config.video_game[1]}:</td>`;
    } else {
        htmlPerfil += `<td class="primeraColumna">${config.video_game[0]}:</td>`;
    }
    htmlPerfil += `<td class="segundaColumna">`;
    for (let i = 0; i < profile.video_game.length - 1; i++) {
        htmlPerfil += `${profile.video_game[i]}, `;
    }
    htmlPerfil += `${profile.video_game[profile.video_game.length - 1]}</td></tr><tr>
                    <td class="primeraColumna">${config.language}:</td>
                    <td class="segundaColumna">`;
    for (let i = 0; i < profile.language.length - 1; i++) {
        htmlPerfil += `${profile.language[i]}, `;
    }
    let textoCorreo = config.email.replace("[email]", `<a id="correo" href="mailto:${profile.email}">${profile.email}</a>`);
    htmlPerfil += `${profile.language[profile.language.length - 1]}</td></tr></table>
                    <p id="textoCorreo">${textoCorreo}</p>
                    </div>
                    </div>`;

    renderizar(htmlPerfil);
}

async function inicializar() {
    const config = await cargar('get-config');

    document.getElementsByTagName('title')[0].innerHTML = config.home;
    document.getElementsByClassName('titulo')[0].innerHTML = `${config.site[0]}<p id="ucv">${config.site[1]}</p>${config.site[2]}`;

    document.getElementById('campoBusqueda').placeholder = `${config.name}...`;
    document.getElementById('campoBusquedaMini').placeholder = `${config.name}...`;
    if (search != '') {
        document.getElementById('campoBusqueda').value = search;
        document.getElementById('campoBusquedaMini').value = search;
    }

    if (ciActual != -1) {
        cargarVistaPerfil(ciActual);
    } else {
        cargarVistaPerfiles();
    }

    document.getElementById('botonBusqueda').innerHTML = config.search;
    document.getElementById('botonBusquedaMini').innerHTML = config.search;
    document.getElementById('myProfile').innerHTML = config.profile;

    document.getElementsByTagName('footer')[0].innerHTML = config.copyRight;
}

document.getElementById("menu").addEventListener("click", function () {
    if (document.getElementById("listaMenu").style.display == 'none') {
        document.getElementById("listaMenu").style.display = 'flex';
    } else {
        document.getElementById("listaMenu").style.display = 'none';
    }
});

document.getElementsByClassName("titulo")[0].addEventListener("click", function () {
    search = '';
    document.getElementById('campoBusqueda').value = '';
    document.getElementById('campoBusquedaMini').value = '';
    ciActual = -1;
    cargarVistaPerfiles();
});

document.getElementById("circuloIconoUsuario").addEventListener("click", function () {
    cargarVistaPerfil(32412330);
    ciActual = 32412330;
    search = '';
    document.getElementById('campoBusqueda').value = '';
    document.getElementById('campoBusquedaMini').value = '';
});

document.getElementById("contenedorUsuarioMini").addEventListener("click", function () {
    cargarVistaPerfil(32412330);
    ciActual = 32412330;
    search = '';
    document.getElementById('campoBusqueda').value = '';
    document.getElementById('campoBusquedaMini').value = '';
});

const formulario = document.getElementById('busqueda');
formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    search = `${formulario.elements[0].value}`;
    ciActual = -1;
    cargarVistaPerfiles();
});

const formularioMini = document.getElementById('busquedaMini');
formularioMini.addEventListener('submit', function (event) {
    event.preventDefault();
    search = `${formularioMini.elements[0].value}`;
    ciActual = -1;
    cargarVistaPerfiles();
});

inicializar();