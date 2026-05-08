document.getElementsByTagName('title')[0].innerHTML = `${config.home}`;
document.getElementsByClassName('titulo')[0].innerHTML = `${config.site[0]}<p id="ucv">${config.site[1]}</p>${config.site[2]}`;
document.getElementById('campoBusqueda').placeholder = `${config.name}...`;
document.getElementById('botonBusqueda').innerHTML = `${config.search}`;
document.getElementsByTagName('footer')[0].innerHTML = `${config.copyRight}`;
document.getElementById('semestre').innerHTML = `${config.semester}`;

var cantPerfiles = profiles.length;
for (let i = 0; i < cantPerfiles; i++) {
    document.getElementById("perfiles").innerHTML +=
        `<div class="cajaPerfil">
            <img src="${profiles[i].ci}/${profiles[i].ci}Big${profiles[i].image_ext}" id="fotoPerfilBig" class="fotoPerfil">
            <img src="${profiles[i].ci}/${profiles[i].ci}Small${profiles[i].image_ext}" id="fotoPerfilSmall" class="fotoPerfil">
            <div class="cajaNombrePerfil"><p class="nombrePerfil">${profiles[i].name}</p></div>
            <hr class="lineaInferior">
        </div>`;
}
perfiles = document.getElementsByClassName('cajaPerfil');
for (let i = 0; i < cantPerfiles; i++) {
    perfiles[i].addEventListener("click", function () {
        window.location.href = `profile.html?ci=${profiles[i].ci}`;
    });
}