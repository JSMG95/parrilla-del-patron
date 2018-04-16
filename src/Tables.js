import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import TableGrid from './TableGrid';
import ResumenDia from './ResumenDia';
import DetalleMesa from './DetalleMesa';
import ResumenMesa from './ResumenMesa';


class Tables extends Component {


    render() {
        return (
            <Grid>
                <Route exact path={this.props.match.path}
                             render={(props) => <TableGrid {...props}
                                                    calculateSubtotal={this.props.calculateSubtotal} 
                                                    currentVenta={this.props.currentVenta} mesas={this.props.mesas} 
                                                    subtotalHandler={this.props.subtotalHandler}
                                                />} />

                <Route path={`${this.props.match.path}/:id`}
                        render={(props) =>  <DetalleMesa {...props}
                                                productos={this.props.productos}
                                                currentVenta={this.props.currentVenta} 
                                                onNewVentaProductoHandler={this.props.onNewVentaProductoHandler}
                                            />} />

                <Route exact path={this.props.match.path} 
                             render={() => <ResumenDia 
                                                venta={this.props.venta} 
                                                mesas={this.props.mesas} 
                                                calculateTotal={this.props.calculateTotal} 
                                                calculateSubtotal={this.props.calculateSubtotal}
                                            />} />
                <Route path={`${this.props.match.path}/:id`} 
                        render={(props) => <ResumenMesa {...props} 
                                                mesas={this.props.mesas} 
                                                currentVenta={this.props.currentVenta} 
                                                calculateSubtotal={this.props.calculateSubtotal} 
                                                onFinishVentaHandler={this.props.onFinishVentaHandler} 
                                                onVentaProductoDeleteHandler={this.props.onVentaProductoDeleteHandler}
                                            />} />
            </Grid>
        );
    }
}

export default Tables;