class Cocktail {
  constructor(nombre, precio, composicion, codigo) {
    this.nombre = nombre;
    this.precio = precio;
    this.composicion = composicion;
    this.codigo = codigo;      
  }
}


let listaCocktails = [];

let cocktail1 = new Cocktail(
  "Gin Tonic",
  300,
  "Gin, Agua Tónica, Hielo, piel de Limón",
  "C1"
);
let cocktail2 = new Cocktail(
  "Caipirinha",
  500,
  "CachaÇa, Exprimido de Lima, Syrup de lima, Hielo",
  "C2"
);
let cocktail3 = new Cocktail(
  "Mojito",
  600,
  "Ron, Exprimido de Lima, Azucar, Hojas de menta, Hielo molido, Gotas de Angostura",
  "C3"
);

listaCocktails.push(cocktail1);
listaCocktails.push(cocktail2);
listaCocktails.push(cocktail3);

let divCont = document.getElementById("divcontenedor");
let fragment = document.createDocumentFragment();



for (const elemento of listaCocktails) {
  fragment.appendChild(cocktailDom(elemento));
}
divCont.appendChild(fragment);

let btnAgregar = document.getElementById("btnSubmit");
btnAgregar.onclick = function () {
  let nombre = document.getElementById("inputNombre").value.trim().toUpperCase();
  let precio = parseFloat(document.getElementById("inputPrecio").value.trim());
  let composicion = document.getElementById("inputComposicion").value.trim().toUpperCase();
  let codigo = document.getElementById("inputCodigo").value.trim().toUpperCase();
  let cocktailNuevo = new Cocktail(nombre.toUpperCase(), precio, composicion, codigo);

  if (nombre != "" && precio > 0 && composicion != "" && codigo != "") {
   listaCocktails.push(cocktailNuevo);
    divCont.appendChild(cocktailDom(cocktailNuevo));

    document.getElementById("inputNombre").value = "";
    document.getElementById("inputPrecio").value = "";
    document.getElementById("inputComposicion").value = "";
    document.getElementById("inputCodigo").value = "";
  }
};

let btnEliminar = document.getElementById("btnEliminar");
btnEliminar.onclick = eliminaSeleccion;

function cocktailDom(elemento) {
  let contenedor = document.createElement("div");
  contenedor.innerHTML = `<h3>Cocktail: ${elemento.nombre}</h3> 
                         <p>Precio: $${elemento.precio}</p> 
                         <p>Composición: ${elemento.composicion}</p> 
                         <p>Codigo: ${elemento.codigo}</p>`;
  contenedor.className = "cocktailFinal";
  contenedor.ondblclick = function () {
    divCont.removeChild(contenedor);
   listaCocktails = listaCocktails.filter(
      (el) => el.id != elemento.id
    );
  };
  contenedor.onclick = function () {
    contenedor.classList.toggle("color");
  };

  return contenedor;
}

function eliminaSeleccion() {
  let produs = document.getElementsByClassName("cocktailFinal");
  for (let i = 0; i < produs.length; i++) {
    if (produs[i].classList.contains("color")) {
      divCont.removeChild(produs[i]);
      i--; //esto lo hago porque al remover un elemento del array, se hace un corrimiento de indices, y tengo q volver a iterar en el mismo indice el proximo ciclo
    }
  }
}







//****************************************************** */
//ESTO SE UTILIZARÁ EN OTRA FUNCIÓN DE LA APP







/* let mensaje =
  "Ingresa un cocktail y te mostraré su composición y costo\n(Escribe 'Exit' para salir)\nCarta:";

for (const elemento of listaCocktails) {
  mensaje += "\n- " + elemento.nombre;
  
}


let cocktail = prompt(mensaje);


const IVA = 1.21;
let precioConIva=0;

while (cocktail != "Exit") {
  switch (cocktail) {
    case "Gin Tonic":
      precioConIva = parseInt(listaCocktails[0].precio * IVA);
      alert(
        "Composición: "+ listaCocktails[0].composición +"\nCosto: $" +
          precioConIva
      );
      
      let tarjetas=document.getElementById("tarjetas");
      let tarjeta=document.createElement("div");
      tarjeta.className="card col-md-5"
      tarjeta.innerHTML=`
        <img src="https://coctelia.com/wp-content/uploads/2018/06/gin-tonic-limon-500x500.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-center">Cocktail: ${listaCocktails[0].nombre}</h5>
          <p class="card-text text-center">Precio: ${listaCocktails[0].precio}</p>
        </div>
      `;
      tarjetas.append(tarjeta);

      verificarMetodoPago();
      break;

    case "Caipirinha":
      precioConIva = parseInt(listaCocktails[1].precio * IVA);
      alert(
        "Composición: "+ listaCocktails[1].composición +"\nCosto: $" +
          precioConIva
      );
      
      verificarMetodoPago();
      break;

    case "Mojito":
      precioConIva = parseInt(listaCocktails[2].precio * IVA);
      alert(
        "Composición: "+ listaCocktails[2].composición +"\nCosto: $" +
          precioConIva
      );
      
      verificarMetodoPago();
      break;
    
      //La "clave" ADMINISTRADOR la utiliza solo el dueño para incrementar los precios de la carta, por eso no aparece en el mensaje
    case "Administrador":
        let aumento=parseInt(prompt("Indique el porcentaje de aumento: "));
        porc=aumento/100;
      listaCocktails=listaCocktails.map(
          (el)=>{
              let cocktailAumentado=new Cocktail(el.nombre,el.composición,parseInt(el.precio*(1+porc)));
              return cocktailAumentado;
            }
            
        )
        let preciosAumentados="Los nuevos precios para los cocktails son: \n";
        for(const objeto of listaCocktails){
            preciosAumentados+=objeto.nombre+" - $"+objeto.precio+"\n";

        }
        alert (preciosAumentados);
        break;


    default:
      alert("Ese cocktail no se encuentra en la carta");
      break;

    }
    cocktail = prompt(mensaje);
}

function verificarMetodoPago() {
  let metodoDePago = prompt("Ingresa un método de pago");
  if (metodoDePago == "Visa") {
    let precioConDesc = calcularDescuento(precioConIva, 20);
    alert("Precio con descuento: $" + precioConDesc);
  } else {
    alert("No posee descuento.\nEl costo final es: $" + precioConIva);
  }
}
function calcularDescuento(precioConIva, descuento) {
  let desc = (precioConIva * descuento) / 100;
  let totConDesc = precioConIva - desc;
  return totConDesc;
}
 */
