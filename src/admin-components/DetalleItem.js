import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon, Jumbotron, Row } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';

class DetalleItem extends Component {

    renderFields() {
        const t = Object.keys(this.props.item).map(key => {
            return <h4 key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {this.props.item[key]}</h4>
        });
        return t;
    }

    render() {
        if (this.props.item) {
            const { item, onEdit, onDelete } = this.props;
            return (
                <Jumbotron style={styles.detalleStyle}>
                    {this.renderFields()}
                    <hr />
                    <Row className='text-center'>
                        <ButtonGroup bsSize='large'>
                            <Button bsStyle='warning' onClick={() => onEdit(item.id)}><Glyphicon glyph="edit" /> Editar</Button>
                            <Confirm
                                onConfirm={() => onDelete(item.id)}
                                body={'¿Está seguro de eliminar?'}
                                confirmText="Eliminar"
                                title="Eliminar Registro">
                                <Button bsStyle='danger'><Glyphicon glyph="ban-circle" /> Eliminar</Button>
                            </Confirm>
                        </ButtonGroup>
                    </Row>
                </Jumbotron>
            );
        } else {
            return <Jumbotron style={styles.detalleStyle} />;
        }        
    };
};

const styles = {
    detalleStyle:{
        padding: 10,
        backgroundColor: 'white'
    }
};

export default DetalleItem;
