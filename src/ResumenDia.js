import React, { Component } from 'react';
import { Col, Panel, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap'
import ActivitySpinner from './ActivitySpinner';

class ResumenDia extends Component {

    renderContent() {
        if (this.props.loading) {
            return <ActivitySpinner />;
        } else {
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
                        <h4>{`Total: $${this.props.calculateTotal()}.00`}</h4>
                        <hr />
                        <Confirm
                                onConfirm={() => { this.props.onFinishDayHandler() }}
                                body={'¿Está seguro que desea finalizar la venta del día?'}
                                confirmText="Aceptar"
                                title="Finalizar Venta"
                                confirmBSStyle="success">
                                <Button bsStyle="primary" bsSize="large" block >
                                    <Glyphicon glyph="ok-circle" /> Finalizar Cuenta
                                </Button>
                        </Confirm>
                    </Panel.Footer>
                </Panel>
            </Col>
            );
        }
    }

    render() {
        const finishButtonStyle = {
            backgroundColor: 'darkorange',
            borderColor: 'darkorange'
        }

        return (
            this.renderContent()
        );
    }

}

export default ResumenDia;