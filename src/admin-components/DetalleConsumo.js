import React, { Component } from 'react';
import moment, { isMoment } from 'moment';
import { Button, ButtonGroup, Glyphicon, Jumbotron, Row, Table } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';

class DetalleConsumo extends Component {

    renderButtonGroup() {
        return (
            <ButtonGroup bsSize='large'>
                <Button bsStyle='primary' onClick={() => console.log('reporte pdf')}><Glyphicon glyph="save-file" /> Reporte PDF</Button>
                <Button bsStyle='default' onClick={() => console.log('reporte csv')}><Glyphicon glyph="list-alt" /> Reporte CSV</Button>
            </ButtonGroup>
        );
    }
    renderTable() {
        const t = Object.keys(this.props.item).map((row, index) => {
            return (
                <tr key={index}> 
                    <td>{this.props.item[row].descripcion}</td>
                    <td>{this.props.item[row].clasificacion}</td>
                    <td className='text-center'>{this.props.item[row].cantidad}</td>
                    <td className='text-center'>{Number(this.props.item[row].precio).toFixed(2)}</td>
                    <td className='text-center'>{Number(this.props.item[row].precio * this.props.item[row].cantidad).toFixed(2)}</td>
                </tr>
            );
        });
        return t;
    }

    render() {
        if (this.props.item) {
            return (
                <Jumbotron style={styles.detalleStyle}>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th className='col-md-6'>Descripción</th>
                            <th>Clasificación</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTable()}
                        </tbody>
                    </Table>
                    
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

export default DetalleConsumo;
