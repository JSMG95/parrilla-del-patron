import React, { Component } from 'react';
import { Button, Panel, Row, Col, Glyphicon } from 'react-bootstrap';
import ListaDetalleItems from './ListaDetalleItems';
import FormProducto from './FormProducto';

class Menu extends Component {
    constructor(props){
        super(props);
        this.formBtnStyle = 'success';
    }

    render(){
        const {
            extPanelStyle
        } = styles;
        return(
            <div>
                <Col md={12}>
                <Panel style={extPanelStyle}>
                    <Row className='text-center'>
                        <Col mdOffset={4} md={4}>
                            <Button bsSize='large' bsStyle='success' onClick={() => this.props.adminHandleClose(true)}><Glyphicon glyph="cutlery" /> Añadir</Button>
                        </Col>
                    </Row>  
                    <ListaDetalleItems 
                        items={this.props.menu}
                        onDelete={this.props.adminDeleteItemHandler}
                        onEdit={this.props.adminShowEditFormHandler}
                        loading={this.props.loading}
                        adminControl={this.props.adminControl}
                        adminControlSelectItem={this.props.adminControlSelectItem}
                    />
                </Panel>
                </Col>
                <FormProducto 
                    show={this.props.adminControl.formShow}
                    handleClose={this.props.adminHandleClose}
                    itemToEdit={this.props.adminControl.itemToEdit}
                    formHandler={this.props.adminSaveItemHandler}
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

export default Menu;