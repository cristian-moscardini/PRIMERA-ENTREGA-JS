/* =============== variables globales ================= */
let listaCocktails = [];
let cocktailsMostrados = [];
let carrito = [];
let divCont = document.getElementById("divcontenedor");
let contenedorCarrito = document.getElementById("carritoBody");
let fechaAcceso = document.getElementById("fechaAcceso");
let btnOrdenar = document.getElementById("btnOrdenar");
let btnFiltrar = document.getElementById("btnFiltrar");
let btnReset = document.getElementById("btnReset");
let DateTime = luxon.DateTime;
let sumatoria = document.getElementById("sumatoria");
let cantCockt = document.getElementById("cantCockt");
let badgeCarrito = document.getElementById("badgeCarrito");
let btnVaciar = document.getElementById("vaciarCarrito");
let btnComprar = document.getElementById("comprarCarrito");
const url = './js/db.json';

/* ===================================================== */

/* =============== Logica del codigo ================= */
document.addEventListener("DOMContentLoaded", () => {
  let guardados = [];

  const cargarBase = async () => {
    const resp = await fetch(url);
    guardados = await resp.json();
    guardados.forEach((elemento) => {
      const { nombre, precio, composicion, tipo, codigo, urlImg } = elemento; //desestructuramos el elemento
      let nuevoCockt = new Cocktail(nombre, precio, composicion, tipo, codigo, urlImg);
      listaCocktails.push(nuevoCockt);
    });

    //cargo la fecha de ultimo acceso
    let fecha = JSON.parse(localStorage.getItem("fechaAcc")) || "";
    if (fecha != "") {
      fechaAcceso.innerText = "Ultimo Acceso: " + fecha;
      let fechaNueva = DateTime.now();
      //actualiza la hora de ultimo acceso como la de hoy, para mostrarla la proxima vez
      localStorage.setItem(
        "fechaAcc",
        JSON.stringify(fechaNueva.toLocaleString())
      );
    } else {
      //si es la primera vez que se ingresa muestra como ultimo acceso la fecha actual
      let fechaNueva = DateTime.now();
      fechaAcceso.innerText = "Ultimo Acceso: " + fechaNueva.toLocaleString();
      localStorage.setItem(
        "fechaAcc",
        JSON.stringify(fechaNueva.toLocaleString())
      );
    }

    let gestor = new GestorCocktails();
    gestor.iniciar();

    btnOrdenar.onclick = function () {
      if (document.querySelector("#alfabeticamente").checked) {
        gestor.ordenarAlfabeticamente();
      } else {
        if (document.querySelector("#menorPrecio").checked) {
          gestor.ordenarMenorprecio();
        } else {
          if (document.querySelector("#mayorPrecio").checked) {
            gestor.ordenarMayorprecio();
          }
        }
      }
    };

    btnFiltrar.onclick = function () {
      if (document.querySelector("#clasicoFiltro").checked) {
        gestor.filtrarClasico();
      } else {
        if (document.querySelector("#tikiFiltro").checked) {
          gestor.filtrarTiki();
        } else {
          if (document.querySelector("#aperitivoFiltro").checked) {
            gestor.filtrarAperitivo();
          }
        }
      }
    };
    
    btnReset.onclick = function (){
      gestor.resetFiltros();
    }
  };

  cargarBase();
});


