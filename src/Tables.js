import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import TableGrid from './TableGrid';
import ResumenDia from './ResumenDia';
import DetalleMesa from './DetalleMesa';
import ResumenMesa from './ResumenMesa';
import ActivitySpinner from './ActivitySpinner';

class Tables extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isLoading = this.props.loading;
        const content = isLoading ? (
            <ActivitySpinner 
                loadingError={this.props.loadingError} />
        ) : (
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
        return (<div>
          {content}
          </div>
        );
    }
}

export default Tables;