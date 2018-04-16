import React, { Component } from 'react';
import ListaDetalleItems from './ListaDetalleItems';
import FormProducto from './FormProducto';
import { Col, Panel } from 'react-bootstrap';
import data from '../Ventas.json';

class Ventas extends Component {
    constructor(props){
        super(props);
        this.state = {
            ventas: data,
            selectedItemId: null,
            formShow: false,
            itemToEdit: null
        };
        this.formBtnStyle = 'success';
    }

    handleClose() {
        this.setState({ formShow: false, itemToEdit: null });
    }
    
    render(){
        return(
            <div>
                <Col md={12}>
                    <Panel style={styles.extPanelStyle}>
                    <ListaDetalleItems 
                        items={data}
                        onDelete={(key) => console.log('Delete: ' + key)}
                        onEdit={(key) => console.log('Edit: ' + key)}
                    />
                    </Panel>
                </Col>
                <FormProducto 
                    show={this.state.formShow}
                    handleClose={(this.handleClose.bind(this))}
                    itemToEdit={this.state.itemToEdit}
                    formHandler={() => console.log('Wants to add/edit')}
                    bsText={'Aceptar'}
                    bsStyle={this.formBtnStyle}
                />
            </div>
        );
    }
}

const styles = {
    extPanelStyle: {
        paddingTop: 20,
        marginTop: 20,
        height: '73vh'
    }
};

export default Ventas;