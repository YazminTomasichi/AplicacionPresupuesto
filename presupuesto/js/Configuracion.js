// ARREGLOS ----------------------------------------------------->
let ingresos = [
    new Ingreso('Sueldo', 30000),
    new Ingreso('Venta 1', 500),
    new Ingreso('Venta 2', 200)
];

let egresos = [
    new Egreso('Renta', 3500),
    new Egreso('Servicio Agua', 800),
    new Egreso('Servicio Luz', 800),
];
// ARREGLOS ----------------------------------------------------->

// FORMATO DE MONEDA Y PORCENTAJE ------------------------------->
const formatoMoneda = (valor) => {
    return (valor.toLocaleString('es-MX', {style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })+'MXN');
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 });
};
// FORMATO DE MONEDA Y PORCENTAJE ------------------------------->

const totalIngresos = () => {
    let totalIngreso = 0;
    for (const c of ingresos) {
    totalIngreso += c.valor;
    }
    return totalIngreso;
};

const totalEgresos = () => {
    let totalEgreso = 0;
    for (const c of egresos) {
    totalEgreso += c.valor;
    }
    return totalEgreso;
};

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
        console.log(ingreso._descripcion);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    const ingresoHTML = 
    `<div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso._descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso._valor)}</div>            
                <button class="elemento_eliminar_btn" onclick="eliminarIngreso(${ingreso._id})">
                    <ion-icon name="close-circle-outline"/>
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>`;
    return ingresoHTML;
}
    
const cargarEgresos = () => {
    let egresosHTML = '';
    for (const egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
        console.log(egreso._descripcion);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    const PresupuestoTotalElemento = document.getElementById('ingresos');
    const PresupuestoTotal = parseFloat(PresupuestoTotalElemento.textContent.replace(/[^\d.-]/g, ''));
    const PorcentajeIndividual = formatoPorcentaje((egreso._valor / PresupuestoTotal));
    const egresoHTML = 
    `<div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso._descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso._valor)}</div>
                <div class="elemento_porcentaje">${PorcentajeIndividual}</div>
                <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn" onclick="eliminarEgreso(${egreso._id})">
                    <ion-icon name="close-circle-outline"/>
                </button>
                </div>
            </div>
            </div>
        </div>
    </div>`;
    return egresoHTML;
}

const miApp = new App();
miApp.cargarApp();

let app = new App();

const eliminarIngreso = (id) => {
    const indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    miApp.cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    const indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    miApp.cargarCabecero();
    cargarEgresos();
}