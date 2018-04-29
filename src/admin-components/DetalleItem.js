import React, { Component } from 'react';
import moment, { isMoment } from 'moment';
import { Button, ButtonGroup, Glyphicon, Jumbotron, Row } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';

class DetalleItem extends Component {

    goToDetail(id) {
        let path = `ventas/${id}`;
        this.props.history.push(path);
        this.props.adminControlSelectItem(1);
    }

    renderButtonGroup() {
        const { item, onEdit, onDelete } = this.props;
        switch(this.props.entity) {
            case 'ventas':
                return (
                    <ButtonGroup bsSize='large'>
                        <Button bsStyle='primary' onClick={() => this.goToDetail(item._id)}><Glyphicon glyph='paste' /> Ver Detalle</Button>
                        <Button bsStyle='danger' onClick={() => console.log('reporte pdf')}><Glyphicon glyph="save-file" /> Reporte PDF</Button>
                        <Button bsStyle='success' onClick={() => console.log('reporte csv')}><Glyphicon glyph="list-alt" /> Reporte CSV</Button>
                    </ButtonGroup>
                );
            break;
            case 'productos':
                return (
                    <ButtonGroup bsSize='large'>
                        <Button bsStyle='warning' onClick={() => onEdit(item._id)}><Glyphicon glyph="edit" /> Editar</Button>
                        <Confirm
                            onConfirm={() => onDelete(item._id)}
                            body={'¿Está seguro de eliminar?'}
                            confirmText="Eliminar"
                            title="Eliminar Registro">
                            <Button bsStyle='danger'><Glyphicon glyph="minus-sign" /> Deshabilitar</Button>
                        </Confirm>
                    </ButtonGroup>
                );
            break;
        }
    }

    renderFields() {
        const t = Object.keys(this.props.item).map(key => {
            switch (key) {
                case '_id':
                    break;
                case '__v':
                    break;
                case 'detalle':
                    break;
                case 'precio':
                    return <h4 key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {`$${Number(this.props.item[key]).toFixed(2)}`}</h4>
                    break;
                case 'importe':
                    return <h4 key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {`$${Number(this.props.item[key]).toFixed(2)}`}</h4>
                    break;  
                case 'fecha':
                    break;
                default:
                    return <h4 key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {this.props.item[key]}</h4>
            }
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
                        {this.renderButtonGroup()}
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
