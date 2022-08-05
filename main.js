

class Cocktail {
  constructor(nombre, composición, precio) {
    this.nombre = nombre;
    this.composición = composición;
    this.precio = precio;       
  }

}
let listaCocktails = [];

let cocktail1 = new Cocktail(
  "Gin Tonic",
  "Gin, Agua Tónica, Hielo, piel de Limón",
  300
);
let cocktail2 = new Cocktail(
  "Caipirinha",
  "CachaÇa, Exprimido de Lima, Syrup de lima, Hielo",
  500
);
let cocktail3 = new Cocktail(
  "Mojito",
  "Ron, Exprimido de Lima, Azucar, Hojas de menta, Hielo molido, Gotas de Angostura",
  600
);

listaCocktails.push(cocktail1);
listaCocktails.push(cocktail2);
listaCocktails.push(cocktail3);

let mensaje =
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