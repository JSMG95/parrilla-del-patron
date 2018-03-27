import React from 'react';
import { Button, ButtonGroup, Glyphicon, Jumbotron } from 'react-bootstrap';

const DetalleProducto = (props) => {
    const { id, descripcion, precio, clasificacion } = props.producto;
    return (
        <Jumbotron style={styles.detalleStyle}>
            <h3><b>ID:</b> {id}</h3>
            <h3><b>Descripción:</b> {descripcion}</h3>
            <h3><b>Precio:</b> ${precio}.00</h3>
            <h3><b>Clasificación:</b> {clasificacion}</h3>
            <ButtonGroup bsSize='large'>
                <Button bsStyle='warning' onClick={() => props.edit(id)}><Glyphicon glyph="edit" /> Editar</Button>
                <Button bsStyle='danger' onClick={() => props.delete(id)}><Glyphicon glyph="ban-circle" /> Eliminar</Button>
            </ButtonGroup>
        </Jumbotron>
    );
};

const styles = {
    detalleStyle:{
        padding: 30,
        height: '57vh'
    }
};

export default DetalleProducto;
