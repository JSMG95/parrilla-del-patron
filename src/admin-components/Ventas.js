import React, { Component } from 'react';
import ListaDetalleItems from './ListaDetalleItems';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import FormProducto from './FormProducto';
import { Col, Panel, Row, Form, Button, Glyphicon, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import data from '../Ventas.json';

class Ventas extends Component {
    constructor(props) {
        super(props);
        this.formBtnStyle = 'success';
    }

    render(){
        return(
            <div>
                <Col md={12}>
                    <Panel style={styles.extPanelStyle}>
                    <Row>
                        <Col md={2} style={{ marginLeft: '2.5%' }} className='text-center'>
                        <Glyphicon glyph="calendar" />
                        {' Fecha Inicial:'}
                        <DatePicker
                            selected={this.props.adminControl.startDate}
                            onChange={(date) => this.props.adminVentas.setDateHandler(date)}
                            todayButton={'Hoy'}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className='text-center'
                        />
                        </Col>
                        <Col md={2} className='text-center'>
                        <Glyphicon glyph="calendar" />
                        {' Fecha Final:'}
                        <DatePicker
                            selected={this.props.adminControl.endDate}
                            onChange={(date) => this.props.adminVentas.setDateHandler(date, 'end')}
                            todayButton={'Hoy'}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className='text-center'
                        />
                        </Col>
                        <Col md={2} className='text-center'>
                            <Button bsStyle='primary' bsSize='large' onClick={() => this.props.adminVentas.loadVentas()}><Glyphicon glyph="search" /> Consultar</Button>
                        </Col>
                    </Row>
                    <ListaDetalleItems {...this.props}
                        items={this.props.adminVentas.ventas}
                        onDelete={(key) => console.log('Delete: ' + key)}
                        onEdit={(key) => console.log('Edit: ' + key)}
                        loading={this.props.loading}
                        adminControl={this.props.adminControl}
                        adminControlSelectItem={this.props.adminControlSelectItem}
                        entity={'ventas'}
                    />
                    </Panel>
                </Col>
                <FormProducto 
                    show={this.props.adminControl.formShow}
                    handleClose={(this.props.adminHandleClose)}
                    itemToEdit={this.props.adminControl.itemToEdit}
                    formHandler={() => console.log('Wants to add/edit')}
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
        height: '100%'
    }
};

export default Ventas;