import React, { Component } from 'react';
import { Col, Panel, Button, ListGroup, ListGroupItem } from 'react-bootstrap';



class Table extends Component {


    handleClick = e => {
        e.preventDefault();
        let path = `mesas/${this.props.detalle.id}`;
        this.props.history.push(path);
    }

    getButtonOnStatus = (status) => {
        switch (status) {
            case "AVAILABLE":
                return <Button bsStyle="success" onClick={this.handleClick}>Iniciar Cuenta</Button>
                break;
            case "PENDING":
                return <Button bsStyle="warning" onClick={this.handleClick}>Editar Cuenta</Button>
                break;
            case "FINISHED":
                return <Button bsStyle="danger" onClick={this.handleClick}>Finalizar Cuenta</Button>
                break;
            default:
                return <Button bsStyle="success" onClick={this.handleClick}>Iniciar Cuenta</Button>
        }
    }



    render() {

        const tableHeadingStyle = {
            margin: '5px'
        }
        let ventaMesa = this.props.currentVenta.filter((venta) => {
            return venta.mesa.id == this.props.detalle.id
        }
        )

        return (
            <Col sm={6} md={3}>
                <Panel >
                    <Panel.Heading className="text-center"><h3 style={tableHeadingStyle}>{`${this.props.detalle.tipo} ${this.props.detalle.id}`}</h3></ Panel.Heading>
                    <Panel.Body>
                        <ListGroup>
                            {
                                ventaMesa.map((venta, index) =>
                                    <ListGroupItem key={index}>{`(${venta.cantidad}) - ${venta.descripcion}`}</ListGroupItem>
                                )
                            }
                            {/* {
                                this.props.detalle.venta.map((venta, index) =>
                                    <ListGroupItem key={index}>{`(${venta.cantidad}) - ${venta.descripcion}`}</ListGroupItem>
                                )
                            } */}
                        </ListGroup>
                        <h4 className="text-center">{`$${this.props.calculateSubtotal(ventaMesa)}.00`}</h4>
                    </ Panel.Body>
                    <Panel.Footer className="text-center">{this.getButtonOnStatus(this.props.detalle.status)}</ Panel.Footer>
                </Panel>
            </Col>
        );
    }
}

export default Table;