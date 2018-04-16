export const Mesas = [
    {
        id: 1,
        status: "PENDING",
        venta: 
        [
            {id: 2, descripcion: "Picaña", precio: 120, clasificacion: "Comida", cantidad: 2},
            {id: 1, descripcion: "Costillas", precio: 110, clasificacion: "Comida", cantidad: 1}
        ],
        tipo: "Mesa",
        total: 0.00
    },
    {
        id: 2,
        status: "FINISHED",
        venta: 
        [
            {id: 2, descripcion: "Picaña", precio: 120, clasificacion: "Comida", cantidad: 2},
        ],
        tipo: "A domicilio",
        total: 0.00
    },
    {
        id: 3,
        status: "PENDING",
        venta:
        [
            {id: 1, descripcion: "Costillas", precio: 110, clasificacion: "Comida", cantidad: 1}
        ],
        tipo: "Bar",
        total: 0.00
    },
    {
        id: 4,
        status: "AVAILABLE",
        venta: 
        [

        ],
        tipo: "Mesa",
        total: 0.00
    }
]