import React, { Component } from 'react';
import {  Row, Col } from 'react-bootstrap';
import Producto from './Producto';
class DetalleMesa extends Component {

    renderProductos = (productos) => {
        const clasificaciones = this.getClasificaciones(productos);
        return (
            clasificaciones.map((clasificacion, index) => {
                return (
                    <Row key={index}>
                        <h3>{clasificacion}</h3>
                        {
                            productos.map((producto, index) => {
                                if (producto.clasificacion === clasificacion) {
                                    console.log("Producto", producto);
                                    return (<Producto onNewVentaProductoHandler={this.props.onNewVentaProductoHandler} getMesaId={this.getMesaId} key={index} detalle={producto} />);
                                } else {
                                    return ""
                                }
                            })
                        }
                    </Row>
                )

            }))
    }

    getClasificaciones = (productos) => {
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        // usage example:
        const clasificaciones = productos.map((producto, index) => {
            return producto.clasificacion
        });
        return clasificaciones.filter(onlyUnique); // returns ['a', 1, 2, '1']

    }

    getMesaId = () => this.props.match.params.id

    render() {
        this.getClasificaciones(this.props.productos);

        return (
            <Col sm={8} md={8} >

                {this.renderProductos(this.props.productos)}


            </Col>
        );
    }

}

export default DetalleMesa;