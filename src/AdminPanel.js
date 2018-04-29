import React, { Component } from 'react';
import { Nav, NavItem, Grid } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Ventas from './admin-components/Ventas';
import Menu from './admin-components/Menu';
import Usuarios from './admin-components/Usuarios';
import Ajustes from './admin-components/Ajustes';
import Consumos from './admin-components/Consumos';

class AdminPanel extends Component {
    
    render() {
        return (
            <div>
                <Nav bsStyle="tabs" activeKey="1">
                    <LinkContainer to={`${this.props.match.url}/settings`}><NavItem eventKey="1" >Ajustes</NavItem></LinkContainer>
                    <LinkContainer to={`${this.props.match.url}/ventas`}><NavItem eventKey="2" >Ventas</NavItem></LinkContainer>
                    <LinkContainer to={`${this.props.match.url}/menu`}><NavItem eventKey="3">Menú</NavItem></LinkContainer>
                    <LinkContainer to={`${this.props.match.url}/usuarios`}><NavItem eventKey="4">Usuarios</NavItem></LinkContainer>
                </Nav>
                
                <Route exact path={this.props.match.path} render={() => <Redirect to={`${this.props.match.path}/menu`} />} />
                <Route exact path={`${this.props.match.path}/settings`} component={Ajustes} />
                <Route exact path={`${this.props.match.path}/ventas`} render={() => <Ventas {...this.props}
                                                                                adminControl={this.props.adminControl}
                                                                                adminVentas={this.props.adminVentas}
                                                                                loading={this.props.loading}
                                                                                loadingError={this.props.loadingError}
                                                                                adminControlSelectItem={this.props.adminControlSelectItem}
                                                                                />} />
                <Route path={`${this.props.match.path}/ventas/:id`} render={() => <Consumos {...this.props}
                                                                                adminControl={this.props.adminControl}
                                                                                adminVentas={this.props.adminVentas}
                                                                                loading={this.props.loading}
                                                                                loadingError={this.props.loadingError}
                                                                                calculateSubtotal={this.props.calculateSubtotal}
                                                                                adminControlSelectItem={this.props.adminControlSelectItem}
                                                                                />} />
                <Route exact path={`${this.props.match.path}/menu`} render={(props) => <Menu {...this.props}
                                                                                menu={this.props.menu}
                                                                                adminControl={this.props.adminControl}
                                                                                adminSaveItemHandler={this.props.adminSaveItemHandler}
                                                                                adminDeleteItemHandler={this.props.adminDeleteItemHandler}
                                                                                adminShowEditFormHandler={this.props.adminShowEditFormHandler}
                                                                                adminHandleClose={this.props.adminHandleClose}
                                                                                adminControlSelectItem={this.props.adminControlSelectItem}
                                                                                loading={this.props.loading}
                                                                                loadingError={this.props.loadingError}
                                                                                />} />
                <Route exact path={`${this.props.match.path}/usuarios`} render={() => <Usuarios {...this.props}
                                                                                adminControl={this.props.adminControl}
                                                                                loading={this.props.loading}
                                                                                loadingError={this.props.loadingError}
                                                                                adminControlSelectItem={this.props.adminControlSelectItem}
                                                                                />} />
            </div>
        );
    }
}

export default AdminPanel;