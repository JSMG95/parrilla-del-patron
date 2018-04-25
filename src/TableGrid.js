import React, { Component } from 'react';
import { Row, Col, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import Table from './Table';

class TableGrid extends Component {

    constructor(props) {
        super(props);
    }


    render() {


        return (
            <Col sm={9} md={9}>
                <Row className='text-center'>
                    <ButtonGroup bsSize="large">
                        <Button 
                            style={{ backgroundColor: 'salmon', color: '#fff' }}
                            onClick={() => {this.props.onAddPedido('Domicilio')}}    
                        ><Glyphicon glyph="plus" /> Pedido Domicilio</Button>
                        <Button
                            style={{ backgroundColor: 'salmon', color: '#fff' }}
                            onClick={() => {this.props.onAddPedido('Bar')}}
                        ><Glyphicon glyph="plus" /> Pedido Bar</Button>
                    </ButtonGroup>
                </Row>
                <hr />
                <Row>
                    {
                        this.props.mesas.map((mesa, index) => 
                            <Table {...this.props} key={index} currentVenta={this.props.currentVenta} detalle={mesa} calculateSubtotal={this.props.calculateSubtotal}/>
                        )
                    }
                </Row>
            </Col>
        );
    }

}

export default TableGrid;