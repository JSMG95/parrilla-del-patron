import React, { Component } from 'react';
import ListaDetalleItems from './ListaDetalleItems';
import FormProducto from './FormProducto';
import { Col, Panel } from 'react-bootstrap';
import data from '../Ventas.json';

class Ventas extends Component {
    constructor(props){
        super(props);
        this.formBtnStyle = 'success';
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
                        loading={this.props.loading}
                        adminControl={this.props.adminControl}
                        adminControlSelectItem={this.props.adminControlSelectItem}
                    />
                    </Panel>
                </Col>
                <FormProducto 
                    show={this.props.adminControl.formShow}
                    handleClose={(this.props.adminHandleClose)}
                    itemToEdit={this.props.adminControl.itemToEdit}
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
        height: '100%'
    }
};

export default Ventas;