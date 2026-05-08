document.getElementsByTagName('title')[0].innerHTML = `${config.home}`;
document.getElementsByClassName('titulo')[0].innerHTML = `${config.site[0]}<p id="ucv">${config.site[1]}</p>${config.site[2]}`;
document.getElementById('campoBusqueda').placeholder = `${config.name}...`;
document.getElementById('botonBusqueda').innerHTML = `${config.search}`;
document.getElementsByTagName('footer')[0].innerHTML = `${config.copyRight}`;
document.getElementById('semestre').innerHTML = `${config.semester}`;
