import React, { Component } from 'react';
import { Col, Panel, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';

class ResumenDia extends Component {



    render() {
        const finishButtonStyle = {
            backgroundColor: 'darkorange',
            borderColor: 'darkorange'
        }

        return (
            <Col sm={3} md={3}>
                <Panel className="text-center">
                    <Panel.Heading>
                        <h3> Resumen del Dia</h3>
                    </Panel.Heading>
                    <ListGroup style={{ fontSize: '15px' }}>
                        {

                            this.props.venta.map((ventaMesa, index) =>
                                //ventaMesa.venta.map((venta, index) =>
                                <ListGroupItem key={index} className="text-center">
                                    {`Venta: ${ventaMesa.mesa[0].tipo} `}
                                    -----
                                    {` $${this.props.calculateSubtotal(ventaMesa.venta)}.00`}

                                </ListGroupItem>
                                )
                            //)
                        }
                    </ListGroup>
                    <Panel.Footer>
                        <h4>{`Total: $${this.props.calculateTotal(this.props.mesas)}.00`}</h4>
                        <hr />
                        <Button style={finishButtonStyle} bsStyle="success" bsSize="large" block onClick={() => { this.props }}>
                            <Glyphicon glyph="ok-circle" /> Finalizar Cuenta
                        </Button>
                    </Panel.Footer>
                </Panel>
            </Col>
        );
    }

}

export default ResumenDia;