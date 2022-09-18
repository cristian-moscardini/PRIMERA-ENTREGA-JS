class GestorCocktails {
    iniciar() {
      this.cargaDom(listaCocktails);
  
      cocktailsMostrados = listaCocktails;
      
      let carritoGuardado = JSON.parse(localStorage.getItem("keyCarrito")) || "";
      if (carritoGuardado != ""){
        carritoGuardado.forEach((elemento) =>
        {
          const { nombre, precio, composicion, tipo, codigo, urlImg,cantidad } = elemento;
          let nuevoCockt = new Cocktail(nombre,precio,composicion,tipo,codigo,urlImg);
          nuevoCockt.cantidad = cantidad;
          agregarCarrito(nuevoCockt);
  
        }
        )
      }
      btnVaciar.onclick = function (){
  
        Swal.fire({
          title: "Está que quiere vaciar el carrito?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, Vaciar",
          cancelButtonText: "No, volver",
        }).then((result) => {
          if (result.isConfirmed) {
            carrito = [];
            actualizarCarrito();
            Toastify({
              text: "Carrito Vacio!",
              duration: 3000,
              gravity: "bottom",
              position: "right",
              style: { background: "red" },
            }).showToast();
          } else {
            Toastify({
              text: "No se ha borrado nada",
              duration: 3000,
              gravity: "bottom",
              position: "right",
              style: { background: "green" },
            }).showToast();
          }
        });
      }
      btnComprar.onclick = function (){
        Swal.fire({
          title: "Funcion no disponible por ahora",
          icon: "warning",
          confirmButtonText: "Ok",
        })
  
      }
    }
  
    cargaDom(coleccion) {
      divCont.innerHTML = "";
      let fragment = document.createDocumentFragment();
      coleccion.forEach((element) => {
        let contenedor = document.createElement("div");
        const { nombre, precio, composicion, tipo, codigo, urlImg } = element; //desestructuramos el elemento
  
        contenedor.innerHTML = `<h3 class="fs-1">${nombre}</h3> 
                                <img src="${urlImg}" alt="" class="imgCocktail" >                          
                                <p>Precio: $${precio}</p> 
                                <p>Composición: ${composicion}</p>
                                <p>Tipo: ${tipo}</p>
                                <p>Código: ${codigo}</p>`;
        contenedor.className = "cocktail";
  
        let botonAgregar = document.createElement("button");
  
        botonAgregar.className = "boton";
        botonAgregar.innerHTML = "Agregar al Carrito";
  
        botonAgregar.onclick = function () {
          let cocktailNew = new Cocktail(nombre,precio,composicion,tipo,codigo,urlImg);
          agregarCarrito(cocktailNew);
          
          Toastify({
            text: element.nombre + " agregado!",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            className: "tostada", // XD
            style: { background: "#f9f5f0"},
            }).showToast();
  
        };
  
        contenedor.appendChild(botonAgregar);
  
        fragment.appendChild(contenedor);
      });
      divCont.appendChild(fragment);
    }
  
    ordenarAlfabeticamente(){
      cocktailsMostrados = cocktailsMostrados.sort((a,b)=>{
        if(a.nombre > b.nombre){
          return 1;
        }
        if(a.nombre < b.nombre){
          return -1;
        }
        return 0;
      })
      this.cargaDom(cocktailsMostrados);
    }
    ordenarMenorprecio(){
      cocktailsMostrados = cocktailsMostrados.sort((a,b)=>{
        if(a.precio > b.precio){
          return 1;
        }
        if(a.precio < b.precio){
          return -1;
        }
        return 0;
      })
      this.cargaDom(cocktailsMostrados);
  
    }
    ordenarMayorprecio(){
      cocktailsMostrados = cocktailsMostrados.sort((a,b)=>{
        if(a.precio < b.precio){
          return 1;
        }
        if(a.precio > b.precio){
          return -1;
        }
        return 0;
      })
      this.cargaDom(cocktailsMostrados);
    }
  
    filtrarClasico(){
      cocktailsMostrados = listaCocktails;
      cocktailsMostrados = cocktailsMostrados.filter(el => el.tipo == "Clásico");
      this.cargaDom(cocktailsMostrados);
    }
    filtrarTiki(){
      cocktailsMostrados = listaCocktails;
      cocktailsMostrados = cocktailsMostrados.filter(el => el.tipo == "Tiki");
      this.cargaDom(cocktailsMostrados);
    }
    filtrarAperitivo(){
      cocktailsMostrados = listaCocktails;
      cocktailsMostrados = cocktailsMostrados.filter(el => el.tipo == "Aperitivo");
      this.cargaDom(cocktailsMostrados);
    }
    resetFiltros(){
      cocktailsMostrados = listaCocktails;
      this.cargaDom(cocktailsMostrados);
    }
  }
  
  function agregarCarrito(elemento) {
    let bandera = carrito.some((cocktail) => cocktail.codigo == elemento.codigo);
  
    if (bandera) {
      let carritoActualizado = carrito.map((cockt) => {
        if (cockt.codigo == elemento.codigo) {
          cockt.cantidad++;
          return cockt;
        } else {
          return cockt;
        }
      });
      carrito = carritoActualizado;
    } else {
      carrito.push(elemento);
      
    }
    
    // totalCocktails++;
    console.log(listaCocktails);
    actualizarCarrito();
   
  }
  
  function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    localStorage.setItem("keyCarrito",JSON.stringify(carrito));
  
  
    carrito.forEach((cocktail) => {
      let contenedor = document.createElement("div");
      const { nombre, precio, composicion, tipo, codigo, urlImg, cantidad } = cocktail; //desestructuramos el elemento
  
      contenedor.innerHTML = `<div class="row mb-3 justify-content-around">
                                <div class="col-7 p-3">
                                  <h3 class="titulo_cockt_carrito">${nombre}</h3>                             
                                  <p class="descripcion_cockt_carrito">Precio: $${precio}</p> 
                                  <p class="descripcion_cockt_carrito">Cantidad: ${cantidad}</p>
                                </div>
                                <div class="col-5">
                                  <img src="${urlImg}" alt="" class="imgCarrito">
                                </div>
                              </div>`;
      contenedor.className = "cocktailCarrito cocktail";
  
      
      
      let botonBorrar = document.createElement("button");
      
      botonBorrar.className = "boton boton_carrito";
      botonBorrar.innerHTML = "Borrar";
  
     botonBorrar.onclick = function () {
        Swal.fire({
          title: "Está seguro de eliminar el Cocktail?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, borrar",
          cancelButtonText: "No, volver",
        }).then((result) => {
          if (result.isConfirmed) {
            contenedorCarrito.removeChild(contenedor);          
            carrito = carrito.filter(
              (el) => el.codigo != codigo
            );
            
            Toastify({
              text: nombre+" borrado!",
              duration: 3000,
              gravity: "bottom",
              position: "right",
              style: { background: "red" },
            }).showToast();
            actualizarCarrito();
          } else {
            Toastify({
              text: "No se ha borrado nada",
              duration: 3000,
              gravity: "bottom",
              position: "right",
              style: { background: "green" },
            }).showToast();
          }
        });
      };
      
      contenedor.appendChild(botonBorrar);
      contenedorCarrito.appendChild(contenedor);
    });
  
    let total = carrito.reduce(
      (acumulador, el) => acumulador + el.precio * el.cantidad,
      0
    );
    let totalCocktails = carrito.reduce(
      (acumulador, el) => acumulador + el.cantidad,
      0
    );
  
    badgeCarrito.innerHTML=totalCocktails;
    cantCockt.textContent = "Cantidad de Items: "+ totalCocktails;
    sumatoria.textContent = "Total: $" + total;
  
  }