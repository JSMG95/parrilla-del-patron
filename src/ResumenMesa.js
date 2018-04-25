import React, { Component } from 'react';
import { Col, Panel, Button, ListGroup, ListGroupItem, Glyphicon, ButtonGroup } from 'react-bootstrap';
class ResumenMesa extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let currentMesa = {};
        if (this.props.mesas) {
            currentMesa = this.props.mesas.find((mesa) => {
                return mesa.id == this.props.match.params.id
            });
        }

        
        let ventaMesa = this.props.currentVenta.filter((venta) => {
            return venta.mesa.id == currentMesa.id
        });

        return (
            <Col sm={4} md={4}>
                <Panel>
                    <Panel.Heading>
                        <h3 className="text-center"> {`Resumen mesa ${this.props.match.params.id}`}</h3>
                    </Panel.Heading>
                    <Panel.Body>
                        <ListGroup style={{ fontSize: '15px' }}>
                            {
                                ventaMesa.map((venta, index) =>

                                    <ListGroupItem key={index} className="text-justify">
                                        {`(cant: ${venta.cantidad}) - ${venta.descripcion} `}
                                        -----
                                    {` $${venta.cantidad * venta.precio}.00`}
                                        <ButtonGroup className="pull-right">
                                            <Button bsStyle="danger" bsSize="small" key={index} onClick={() => this.props.onVentaProductoDeleteHandler(venta.idProducto, this.props.match.params.id)}>
                                                <Glyphicon glyph="remove" />
                                            </Button>

                                        </ButtonGroup>
                                        <hr style={{ marginBottom: '0px' }} />

                                    </ListGroupItem>
                                )
                            }
                        </ListGroup>
                    </Panel.Body>
                    <Panel.Footer className="text-center">
                        <h4 >{`Total: $${this.props.calculateSubtotal(ventaMesa)}.00`}</h4>
                        <hr />

                        <Button bsStyle="info" bsSize="large" block onClick={() => { this.props.history.goBack() }}>
                            <Glyphicon glyph="circle-arrow-left" /> Regresar
                        </Button>

                        <Button bsStyle="success" bsSize="large" disabled={ventaMesa.length === 0} block onClick={() => { this.props.onFinishVentaHandler(currentMesa, this.props.history) }}>
                            <Glyphicon glyph="ok-circle" /> Finalizar Cuenta
                        </Button>
                    </Panel.Footer>
                </Panel>

            </Col>
        );
    }

}

export default ResumenMesa;