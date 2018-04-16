import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';

class Producto extends Component {


    render() {
        console.log("Detalle", this.props.detalle)
        const panelStyle = {
            boxShadow: '0px 6px 0px rgba(131,144,154,1), 0px 3px 15px rgba(0,0,0,.4)',
            
        }

        return (
            <Col sm={6} md={3}>
                <Panel style={panelStyle} onClick={() => this.props.onNewVentaProductoHandler(this.props.detalle, this.props.getMesaId())}>
                    <Panel.Body className="text-center">
                        <h4>{this.props.detalle.descripcion}</h4>
                        <p>{`$${this.props.detalle.precio}.00`}</p>
                    </Panel.Body>
                </Panel>
            </Col>
        );
    }
}

export default Producto;