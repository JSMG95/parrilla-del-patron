import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Ventas from './admin-components/Ventas';
import Menu from './admin-components/Menu';
import Usuarios from './admin-components/Usuarios';
import Ajustes from './admin-components/Ajustes';


class AdminPanel extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <Nav bsStyle="tabs" activeKey="1">
                    <LinkContainer to={`${this.props.match.url}/settings`}><NavItem eventKey="1" >Ajustes</NavItem></LinkContainer>
                    <LinkContainer to={`${this.props.match.url}/ventas`}><NavItem eventKey="2" >Ventas</NavItem></LinkContainer>
                    <LinkContainer to={`${this.props.match.url}/menu`}><NavItem eventKey="3">Menú</NavItem></LinkContainer>
                    <LinkContainer to={`${this.props.match.url}/usuarios`}><NavItem eventKey="4">Usuarios</NavItem></LinkContainer>
                </Nav>

                
                <Route exact path={this.props.match.path} render={() => <Redirect to={`${this.props.match.path}/ventas`} />} />
                <Route path={`${this.props.match.path}/settings`} component={Ajustes} />
                <Route path={`${this.props.match.path}/ventas`} component={Ventas} />
                <Route path={`${this.props.match.path}/menu`} component={Menu} />
                <Route path={`${this.props.match.path}/usuarios`} component={Usuarios} />


            </div>
        );
    }
}

export default AdminPanel;