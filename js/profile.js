const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || `ES`;

const conf = document.createElement('script');
conf.type = 'text/javascript';
conf.src = `conf/config${lang}.json`;
conf.onload = () => {
    document.getElementsByTagName('title')[0].innerHTML = `${config.home}`;
    document.getElementsByClassName('titulo')[0].innerHTML = `${config.site[0]}<p id="ucv">${config.site[1]}</p>${config.site[2]}`;
    document.getElementsByClassName('enlaceLogo')[0].href = `index.html?lang=${lang}`;
    document.getElementById('campoBusqueda').placeholder = `${config.name}...`;
    document.getElementById('campoBusquedaMini').placeholder = `${config.name}...`;
    document.getElementById('botonBusqueda').innerHTML = `${config.search}`;
    document.getElementById('botonBusquedaMini').innerHTML = `${config.search}`;
    document.getElementById('myProfile').innerHTML = `${config.profile}`;

    const formulario = document.getElementById('busqueda');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        window.location.href = `index.html?lang=${lang}&search=${formulario.elements[0].value}`;
    });

    const formularioMini = document.getElementById('busquedaMini');
    formularioMini.addEventListener('submit', function (event) {
        event.preventDefault();
        window.location.href = `index.html?lang=${lang}&search=${formularioMini.elements[0].value}`;
    });

    document.getElementsByTagName('footer')[0].innerHTML = `${config.copyRight}`;

    const primeraColumna = document.getElementsByClassName('primeraColumna');
    const segundaColumna = document.getElementsByClassName('segundaColumna');

    const ci = urlParams.get('ci');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `${ci}/profile.json`;
    script.onload = () => {
        document.getElementById('fotoPerfilBig').src = `${ci}/${ci}Big${profile.image_ext}`;
        document.getElementById('fotoPerfilSmall').src = `${ci}/${ci}Small${profile.image_ext}`;
        document.getElementById('nombre').innerHTML = `${profile.name}`;
        document.getElementById('descripcion').innerHTML = `${profile.description}`;
        document.getElementById('descripcion').innerHTML = `${profile.description}`;

        primeraColumna[0].innerHTML = `${config.color}:`;
        segundaColumna[0].innerHTML = `${profile.color}`;

        if (profile.book.length > 1) {
            primeraColumna[1].innerHTML = `${config.book[1]}:`;
        } else {
            primeraColumna[1].innerHTML = `${config.book[0]}:`;
        }
        for (let i = 0; i < profile.book.length - 1; i++) {
            segundaColumna[1].innerHTML += `${profile.book[i]}, `;
        }
        segundaColumna[1].innerHTML += `${profile.book[profile.book.length - 1]}`;

        if (profile.music.length > 1) {
            primeraColumna[2].innerHTML = `${config.music[1]}:`;
        } else {
            primeraColumna[2].innerHTML = `${config.music[0]}:`;
        }
        for (let i = 0; i < profile.music.length - 1; i++) {
            segundaColumna[2].innerHTML += `${profile.music[i]}, `;
        }
        segundaColumna[2].innerHTML += `${profile.music[profile.music.length - 1]}`;

        if (profile.video_game.length > 1) {
            primeraColumna[3].innerHTML = `${config.video_game[1]}:`;
        } else {
            primeraColumna[3].innerHTML = `${config.video_game[0]}:`;
        }
        for (let i = 0; i < profile.video_game.length - 1; i++) {
            segundaColumna[3].innerHTML += `${profile.video_game[i]}, `;
        }
        segundaColumna[3].innerHTML += `${profile.video_game[profile.video_game.length - 1]}`;

        primeraColumna[4].innerHTML = `${config.language}:`;
        for (let i = 0; i < profile.language.length - 1; i++) {
            segundaColumna[4].innerHTML += `${profile.language[i]}, `;
        }
        segundaColumna[4].innerHTML += `${profile.language[profile.language.length - 1]}`;

        let textoCorreo = config.email.replace("[email]", `<a id="correo" href="mailto:${profile.email}">${profile.email}</a>`);
        document.getElementById('textoCorreo').innerHTML = textoCorreo;
    };
    document.head.appendChild(script);
};
document.head.appendChild(conf);

document.getElementById("menu").addEventListener("click", function () {
    if (document.getElementById("listaMenu").style.display == 'none') {
        document.getElementById("listaMenu").style.display = 'flex';
    } else {
        document.getElementById("listaMenu").style.display = 'none';
    }
});

document.getElementById("circuloIconoUsuario").addEventListener("click", function () {
    window.location.href = `profile.html?lang=${lang}&ci=32412330`;
});

document.getElementById("contenedorUsuarioMini").addEventListener("click", function () {
    window.location.href = `profile.html?lang=${lang}&ci=32412330`;
});