import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FormProducto extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            item: this.props.itemToEdit
        }
    }

    descChange(e) {
        var item = this.state.item;
        item.descripcion = e.target.value;
        this.setState({ item });
    }

    precioChange(e) {
        var item = this.state.item;
        item.precio = e.target.value;
        this.setState({ item });
    }

    clasChange(e) {
        var item = this.state.item;
        item.clasificacion = e.target.value;
        this.setState({ item });
    }

    handleOnHide() {
        this.emptyItem();
        this.props.handleClose();
    }

    handleOnSubmit() {
        this.props.formHandler(this.state.item);
        this.emptyItem();
    }

    emptyItem() {
        this.setState({ 
            item: {
                id: null,
                descripcion: '',
                precio: '',
                clasificacion: ''
            }
        });
    }

    render(){
        return (
        <div className="static-modal">
            <Modal show={this.props.show} onHide={this.handleOnHide.bind(this)}>
                <Modal.Header>
                    <Modal.Title>Añadir Producto al Menú</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form inline>
                    <FormGroup style={{ marginBottom: 20 }}>
                        <ControlLabel>Descripción:</ControlLabel>{' '}
                        <FormControl 
                            type='text'
                            placeholder='Orden de carne asada 250 gr'
                            value={this.state.item.descripcion}
                            style={{ width: 475 }}
                            onChange={this.descChange.bind(this)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Precio:</ControlLabel>{' '}
                        <FormControl 
                            type='text'
                            placeholder='120.00'
                            value={this.state.item.precio}
                            onChange={this.precioChange.bind(this)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <ControlLabel>Clasificación:</ControlLabel>{' '}
                        <FormControl 
                            componentClass="select"
                            placeholder="select"
                            style={{width: 220}}
                            value={this.state.item.clasificacion}
                            onChange={this.clasChange.bind(this)}>
                                <option value="Entrada">Entrada</option>
                                <option value="Platillo">Platillo</option>
                                <option value="Bebida">Bebida</option>
                                <option value="Postre">Postre</option>
                        </FormControl>
                    </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleOnHide.bind(this)}>Cancelar</Button>
                    <Button bsStyle="success" onClick={this.handleOnSubmit.bind(this)}>Añadir</Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
};

export default FormProducto;
