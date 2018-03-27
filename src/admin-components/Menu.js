import React, { Component } from 'react';
import { Button, ButtonGroup, Panel, ListGroup, ListGroupItem, Row, Col, Glyphicon } from 'react-bootstrap';
import DetalleProducto from './DetalleProducto';
import FormProducto from './FormProducto';
import data from '../Menu.json';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu: data,
            selectedProductId: null,
            formShow: false,
            itemToEdit: {
                id: null,
                descripcion: '',
                precio: '',
                clasificacion: ''
            }
        };
    }

    renderMenu() {
        return this.state.menu.map(producto => 
            <ListGroupItem
                key={producto.id}
                active={producto.id===this.state.selectedProductId} 
                onClick={() => this.setState({ selectedProductId: producto.id })}>
                {producto.descripcion}
            </ListGroupItem>
        );
    }

    renderDetail() {
        if (this.state.selectedProductId) {
            var prod = this.state.menu.find((producto) => producto.id === this.state.selectedProductId);
            return (
                <DetalleProducto 
                    delete={this.delete.bind(this)}
                    edit={this.edit.bind(this)}
                    producto={prod} 
                />
            );
        }
    }

    add(item) {
        item.id = this.state.menu.length + 1;
        var menu = this.state.menu;
        menu.push(item);
        this.setState({ menu: menu, formShow: false });
    }

    delete(key) {
        var menu = this.state.menu.filter((item) => item.id !== key);
        this.setState({ menu, selectedProductId: null });
    }

    edit(key) {
        console.log('Wants to edit key: ' + key);
        var item = this.state.menu.filter((item) => item.id === key);
        console.log(item);
        this.setState({ itemToEdit: item, formShow: true });
    }

    handleClose() {
        this.setState({ formShow: false });
    }

    render(){
        const {
            extPanelStyle,
            listGroupStyle,
            intPanelStyle
        } = styles;

        return(
            <div>
                <Panel style={extPanelStyle}>
                    <Row className='text-center'>
                        <Col mdOffset={4} md={4}>
                            <ButtonGroup bsSize='large'>
                                <Button bsStyle='success' onClick={() => this.setState({ formShow: true })}><Glyphicon glyph="cutlery" /> Añadir</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>  
                    <Row>
                        <Col md={6}>
                            <Panel style={intPanelStyle}>
                                <ListGroup style={listGroupStyle}>
                                    {this.renderMenu()}
                                </ListGroup>
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <Panel style= {intPanelStyle}>
                                {this.renderDetail()}
                            </Panel>
                        </Col>
                    </Row>
                </Panel>
                <FormProducto 
                    show={this.state.formShow}
                    handleClose={this.handleClose.bind(this)}
                    itemToEdit={this.state.itemToEdit}
                    formHandler={this.add.bind(this)}
                />
            </div>
        );
    }
}

const styles = {
    extPanelStyle: {
        padding: 20,
        margin: 20,
        height: '75vh'
    },
    listGroupStyle: {
        padding: 10,
    },
    intPanelStyle: {
        marginTop: 20,
        height: '57vh'
    }
};

export default Menu;