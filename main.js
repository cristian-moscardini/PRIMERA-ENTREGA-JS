let cocktail = prompt("Ingresa un cocktail y te mostraré su composición y costo\nCarta:\n- Gin Tonic\n- Caipirinha\n- Mojito \n(Escribe 'Exit' para salir)");
precio=0;
const IVA=1.21;

while(cocktail!='Exit'){
    switch(cocktail){
        case "Gin Tonic":
            precioConIva=parseInt((precio+300)*IVA);
            alert("Composición: Gin, Agua tónica, hielo, piel de limón\nCosto: $"+precioConIva);
            verificarMetodoPago();
            break;
            
        case "Caipirinha":
            precioConIva=parseInt((precio+500)*IVA);
            alert("Composición: CachaÇa, exprimido de lima, syrup de lima, hielo\nCosto: $"+precioConIva);
            verificarMetodoPago();
            break;
        
        case "Mojito":
            precioConIva=parseInt((precio+600)*IVA);
            alert("Composición: Ron, exprimido de lima, azucar, hojas de menta, hielo molido, gotas de Angostura\nCosto: $"+precioConIva);
            verificarMetodoPago();
            break;
        
        default:
            alert("Ese cocktail no se encuentra en la carta");
            break;
        
        function verificarMetodoPago(){
            let metodoDePago=prompt("Ingresa un método de pago");
            if(metodoDePago=="Visa"){
                let precioConDesc=calcularDescuento(precioConIva,20);
                alert("Precio con descuento: $"+precioConDesc);
            
            }else{
                alert("No posee descuento.\nEl costo final es: $"+precioConIva);
            }
        }

        function calcularDescuento(precioConIva,descuento){
            let desc=(precioConIva*descuento)/100;
            let totConDesc = precioConIva - desc;
            return totConDesc;
        }
    }
    cocktail = prompt("Ingresa un cocktail y te mostraré su composición y costo \n(Escribe 'Exit' para salir)");
    
}
        
        

