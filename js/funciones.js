window.onload = () => {

let items = document.querySelector('#items');   
console.log(items)
let carrito = [];
let total = 0;
let carrito2 = document.querySelector('#carrito');
let Total2 = document.querySelector('#total');
let botonvaciar = document.querySelector('#boton-vaciar');

// Funcion de los Items
function crearItems() {
    for (let info of dbJSON) {
        
        let miObjeto = document.createElement('div');
        miObjeto.classList.add('card', 'col-sm-4');
        // Cuerpo
        let miObjetoCardBody = document.createElement('div');
        miObjetoCardBody.classList.add('card-body');
        // Titulo
        let miObjetoTitle = document.createElement('h5');
        miObjetoTitle.classList.add('card-title', 'titulo-objeto');
        miObjetoTitle.textContent = info['nombre'];
        // Foto
        let miObjetoImagen = document.createElement('img');
        miObjetoImagen.classList.add('img-fluid');
        miObjetoImagen.setAttribute('src', info['imagen']);
        // Precio
        let miObjetoPrecio = document.createElement('p');
        miObjetoPrecio.classList.add('card-text', 'precio');
        miObjetoPrecio.textContent = '$' + info['precio'];
         
        let miObjetoBoton = document.createElement('button');
        miObjetoBoton.classList.add('btn', 'btn-primary', );
        miObjetoBoton.textContent = '+';
        miObjetoBoton.setAttribute('marcador', info['id']);
        miObjetoBoton.addEventListener('click', addCarrito);
        
        miObjetoCardBody.appendChild(miObjetoImagen);
        miObjetoCardBody.appendChild(miObjetoTitle);
        miObjetoCardBody.appendChild(miObjetoPrecio);
        miObjetoCardBody.appendChild(miObjetoBoton);
        miObjeto.appendChild(miObjetoCardBody);
        items.appendChild(miObjeto);
    }
}

function addCarrito() {
    carrito.push(this.getAttribute('marcador'))
    calcularTotal(); 
    renderizarCarrito();
}

function renderizarCarrito() {
    carrito2.textContent = '';
    let carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach(function (item, indice) {
        
        let miItem = dbJSON.filter(function(itemdbJson) {
            return itemdbJson['id'] == item;
        });
        let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
            return itemId === item ? total += 1 : total;
        }, 0);
        let miObjeto = document.createElement('li');
        miObjeto.classList.add('list-group-item', 'text-right', 'mx-2');
        miObjeto.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - $ ${miItem[0]['precio']}`;
        
        //Borrar

        let miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'Quitar';
        miBoton.style.marginLeft = '1rem';
        miBoton.setAttribute('item', item);
        miBoton.addEventListener('click', borrarItemCarrito);
        
        miObjeto.appendChild(miBoton);
        carrito2.appendChild(miObjeto);
    })
}

function borrarItemCarrito() {
    let id = this.getAttribute('item');
    carrito = carrito.filter(function (carritoId) {
        return carritoId !== id;
    });
    renderizarCarrito();
    calcularTotal();
}

function calcularTotal() {
    total = 0;
    for (let item of carrito) {
        let miItem = dbJSON.filter(function(itemdbJson) {
            return itemdbJson['id'] == item;
        });
        total = total + miItem[0]['precio'];
    }
    Total2.textContent = total.toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    calcularTotal();
}

botonvaciar.addEventListener('click', vaciarCarrito);
crearItems();
}

 

