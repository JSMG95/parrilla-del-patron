import React, { Component } from 'react';
import ListaDetalleItems from './ListaDetalleItems';
import data from '../Usuarios.json';

class Usuarios extends Component {

    render(){
        return(
            <ListaDetalleItems 
                items={data}
                onDelete={(key) => console.log('Delete: ' + key)}
                onEdit={(key) => console.log('Edit: ' + key)}
                loading={this.props.loading}
                adminControl={this.props.adminControl}
                adminControlSelectItem={this.props.adminControlSelectItem}
            />
        );
    }
}

export default Usuarios;