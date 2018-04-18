import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FormProducto extends Component {
    constructor(props) {
        super(props);
        this.state= {
            item: {
                _id: null,
                descripcion: '',
                precio: '',
                clasificacion: ''
            }
        };
        this.isEditing = true;
    };

    componentDidUpdate () {
        if (this.props.itemToEdit && this.isEditing){
            this.isEditing = false;
            var item = this.props.itemToEdit;
            this.setState({ item });
        } else {
            this.isEditing = true;
        }
	}

    handleOnHide = () => {
        console.log("hola")
        this.setState({ 
            item: {
                _id: null,
                descripcion: '',
                precio: '',
                clasificacion: ''
            }
        });
        this.props.handleClose(false);
    }

    handleSubmit = () => {
        var item = {
            _id: null,
            descripcion: this.desc.value,
            precio: parseInt(this.precio.value),
            clasificacion: this.clasf.value
        }
        if (this.props.itemToEdit){
            item._id = this.props.itemToEdit._id;    
        }
        this.props.formHandler(item);
    }

    render(){
        return (
        <div className="static-modal">
            <Modal show={this.props.show} onHide={() => this.handleOnHide}>
                <Modal.Header>
                    <Modal.Title>Añadir Producto al Menú</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form inline>
                    <FormGroup style={{ marginBottom: 20 }}>
                        <ControlLabel>Descripción:</ControlLabel>{' '}
                        <FormControl 
                            defaultValue={this.state.item.descripcion}
                            type='text'
                            placeholder='Descripción del producto...'
                            style={{ width: 475 }}
                            inputRef={ref => { this.desc = ref; }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Precio:</ControlLabel>{' '}
                        <FormControl 
                            defaultValue={this.state.item.precio}
                            type='text'
                            placeholder='Precio unitario...'
                            inputRef={ref => { this.precio = ref; }}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <ControlLabel>Clasificación:</ControlLabel>{' '}
                        <FormControl 
                            defaultValue={this.state.item.clasificacion}
                            componentClass="select"
                            placeholder="select"
                            style={{width: 210}}
                            inputRef={ref => { this.clasf = ref; }}>
                                <option value="Entrada">Entrada</option>
                                <option value="Comida">Comida</option>
                                <option value="Bebida">Bebida</option>
                                <option value="Complementos">Complementos</option>
                        </FormControl>
                    </FormGroup>
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => this.handleOnHide()}>Cancelar</Button>
                    <Button bsStyle={this.props.bsStyle} onClick={(item) => this.handleSubmit()}>{this.props.bsText}</Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
};

export default FormProducto;
