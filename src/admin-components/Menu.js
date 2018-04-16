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
        this.formBtnStyle = 'success';
    }

    saveItemHandler(item) {
        var menu = this.state.menu;
        if (item.id != null){
            //editing
            let foundIndex = menu.findIndex(element => element.id === item.id);
            menu.splice(foundIndex, 1, item);
        } else {
            //adding
            item.id = this.state.menu.length + 1;
            menu.push(item);
        }
        this.setState({ menu: menu, formShow: false, itemToEdit: null });
        //this.setState({...this.state, menu});
    }

    deleteItemHandler(key) {
        var menu = this.state.menu.filter((item) => item.id !== key);
        this.setState({ menu, selectedProductId: null });
    }

    showEditFormHandler(key) {
        var item = this.state.menu.filter((item) => item.id === key);
        this.formBtnStyle = 'warning';
        this.setState({ itemToEdit: item[0], formShow: true });
    }

    handleClose(show = false) {
        this.formBtnStyle = 'success';
        this.setState({ formShow: show, itemToEdit: null });
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
                            <Button bsSize='large' bsStyle='success' onClick={() => this.handleClose(true)}><Glyphicon glyph="cutlery" /> Añadir</Button>
                        </Col>
                    </Row>  
                    <ListaDetalleItems 
                        items={this.state.menu}
                        onDelete={this.deleteItemHandler.bind(this)}
                        onEdit={this.showEditFormHandler.bind(this)}
                    />
                </Panel>
                </Col>
                <FormProducto 
                    show={this.state.formShow}
                    handleClose={this.handleClose.bind(this)}
                    itemToEdit={this.state.itemToEdit}
                    formHandler={this.saveItemHandler.bind(this)}
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

export default Menu;