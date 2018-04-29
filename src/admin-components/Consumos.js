import React, { Component } from 'react';
import ListaDetalleItems from './ListaDetalleItems';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import FormProducto from './FormProducto';
import { Col, Panel, Row, Form, Button, Glyphicon, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import data from '../Ventas.json';

class Consumos extends Component {
    constructor(props) {
        super(props);
        this.formBtnStyle = 'success';
    }

    render(){
        let consumo = {};
        if (this.props.adminVentas.ventas) {
            consumo = this.props.adminVentas.ventas.find((consumo) => {
                return consumo._id == this.props.location.pathname.split('/').pop()
            });
        }
        consumo.fecha = moment(consumo.fecha);
        //console.log(consumo)
        return(
            <div>
                <Col md={12}>
                    <Panel style={styles.extPanelStyle}>
                    <Row>
                        <Col md={9} className='text-center'>
                            <h4 className='text-info'>{`Consumos del día ${consumo.fecha.format("dddd, MMMM Do YYYY")} | Importe: $${consumo.importe}.00`}</h4>
                        </Col>
                        <Col md={3} className='text-center'>
                            <Button bsStyle='info' bsSize='large' onClick={() => this.props.history.goBack()}><Glyphicon glyph="chevron-left" /> Regresar</Button>
                        </Col>
                    </Row>
                        <ListaDetalleItems {...this.props}
                            items={consumo.detalle}
                            onDelete={(key) => console.log('Delete: ' + key)}
                            onEdit={(key) => console.log('Edit: ' + key)}
                            loading={this.props.loading}
                            adminControl={this.props.adminControl}
                            adminControlSelectItem={this.props.adminControlSelectItem}
                            calculateSubtotal={this.props.calculateSubtotal}
                            entity={'consumos'}
                        />
                    </Panel>
                </Col>
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

export default Consumos;