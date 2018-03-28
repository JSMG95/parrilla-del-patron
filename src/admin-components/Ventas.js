import React, { Component } from 'react';
import ListaDetalleItems from './ListaDetalleItems';
import data from '../Ventas.json';

class Ventas extends Component {
    
    render(){
        return(
            <ListaDetalleItems 
                items={data}
                onDelete={(key) => console.log('Delete: ' + key)}
                onEdit={(key) => console.log('Edit: ' + key)}
            />
        );
    }
}

export default Ventas;