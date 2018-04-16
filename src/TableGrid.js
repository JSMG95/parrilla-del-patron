import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Table from './Table';

class TableGrid extends Component {

    constructor(props) {
        super(props);
    }


    render() {


        return (
            <Col sm={9} md={9}>
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