const form = document.querySelector('form');
const presupuesto = parseInt(prompt('Presupuesto Semanal'));
const presupuestoDiv = document.querySelector('.presupuesto');
const saldoDiv = document.querySelector('.saldo');
presupuestoDiv.innerHTML = `
<div class="div-total">
  <h4>Presupuesto: </h4><p>$ ${presupuesto}</p><br>
</div`;


function guardarDatos(e) {
  let gasto = document.querySelector('#gasto').value;
  let cantidad = parseInt(document.querySelector('#cantidad').value);
  
  const detalle = {
    gasto, cantidad
  };

  if(!localStorage.getItem('detalles')) {
    let detalles = [];
    detalles.push(detalle);
    localStorage.setItem('detalles', JSON.stringify(detalles));
  }
  else {
    let detalles = JSON.parse(localStorage.getItem('detalles'));
    detalles.push(detalle);
    localStorage.setItem('detalles', JSON.stringify(detalles));
  }
  obtenerDatos();
  saldo();
  form.reset();
  e.preventDefault();
}

function obtenerDatos() {
  const detalles = JSON.parse(localStorage.getItem('detalles'));
  const listDiv = document.querySelector('.cantidad');
  listDiv.innerHTML = '';

  if(detalles) {
    for(let i = 0; i < detalles.length; i++) {
      let gasto = detalles[i].gasto;
      let cantidad = detalles[i].cantidad;
      listDiv.innerHTML += `
        <div class="detalle">
          <li>${gasto}</li><p>$ ${cantidad}</p><br>
        </div`;
    }
  }
  saldo();
}

function saldo() {
  let detalles =  JSON.parse(localStorage.getItem('detalles'));
  let gastoTotal = 0;
  if(detalles) {
    detalles.map(i => {
      gastoTotal += i.cantidad;
    });
  }

  let saldo = presupuesto - gastoTotal;
  if (saldo < 0) {
    saldoDiv.innerHTML = `
    <div class="div-total">
      <h4>Saldo Negativo: </h4><p style="color: red;">$ ${saldo}</p><br>
    </div`;
  }
  else {
    saldoDiv.innerHTML = `
    <div class="div-total">
      <h4>Saldo: </h4><p style="color: black">$ ${saldo}</p><br>
    </div`;
  }
}


obtenerDatos();
saldo();

form.addEventListener('submit', guardarDatos);

const btn = document.querySelector('.btn-borrar')
.addEventListener('click', () => {
  if(localStorage.getItem('detalles')) {
    localStorage.removeItem('detalles');
  }
  obtenerDatos();
});