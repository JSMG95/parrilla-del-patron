import React, { Component } from 'react';
import { Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class ResumenDia extends Component {



    render() {

        return (
            <Col sm={3} md={3}>
                <Panel className="text-center">
                    <Panel.Heading>
                        <h3> Resumen del Dia</h3>
                    </Panel.Heading>
                    <ListGroup style={{ fontSize: '15px' }}>
                        {

                            this.props.venta.map((venta, index) =>

                                <ListGroupItem key={index} className="text-center">
                                    {`Venta: ${venta[0].mesa.tipo} `}
                                    -----
                                    {` $${this.props.calculateSubtotal(venta)}.00`}

                                </ListGroupItem>
                            )
                        }
                    </ListGroup>
                    <Panel.Footer>
                        <h4>{`Total: $${this.props.calculateTotal(this.props.mesas)}.00`}</h4>
                    </Panel.Footer>
                </Panel>
            </Col>
        );
    }

}

export default ResumenDia;