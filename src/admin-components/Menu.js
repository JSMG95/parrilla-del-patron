import React, { Component } from 'react';
import { Button, Panel, Row, Col, Glyphicon } from 'react-bootstrap';
import ListaDetalleItems from './ListaDetalleItems';
import FormProducto from './FormProducto';
import data from '../Menu.json';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu: data,
            selectedProductId: null,
            formShow: false,
            itemToEdit: null
        };
    }

    add(item) {
        var menu = this.state.menu;
        if (item.id != null){
            let foundIndex = menu.findIndex(element => element.id === item.id);
            menu.splice(foundIndex, 1, item);
        } else {
            item.id = this.state.menu.length + 1;
            menu.push(item);
        }
        this.setState({ menu: menu, formShow: false, itemToEdit: null });
    }

    delete(key) {
        var menu = this.state.menu.filter((item) => item.id !== key);
        this.setState({ menu, selectedProductId: null });
    }

    edit(key) {
        var item = this.state.menu.filter((item) => item.id === key);
        this.setState({ itemToEdit: item[0], formShow: true });
    }

    handleClose() {
        this.setState({ formShow: false, itemToEdit: null });
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
                            <Button bsSize='large' bsStyle='success' onClick={() => this.setState({formShow: true, itemToEdit: null})}><Glyphicon glyph="cutlery" /> Añadir</Button>
                        </Col>
                    </Row>  
                    <ListaDetalleItems 
                        items={this.state.menu}
                        onDelete={this.delete.bind(this)}
                        onEdit={this.edit.bind(this)}
                    />
                </Panel>
                </Col>
                <FormProducto 
                    show={this.state.formShow}
                    handleClose={this.handleClose.bind(this)}
                    itemToEdit={this.state.itemToEdit}
                    formHandler={this.add.bind(this)}
                    bsText={'Aceptar'}
                    bsStyle={'warning'}
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

export default Menu;