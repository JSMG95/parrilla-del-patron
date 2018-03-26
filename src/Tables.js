import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class Tables extends Component {


    render() {
        return (
            <Grid>
                <Col sm={9} md={9}>
                    
                        <Row>
                            <Col sm={6} md={3}>
                                <Panel>
                                    <h2>Mesa 1</h2>
                                    <Button bsStyle="success">Iniciar Cuenta</Button>
                                </Panel>
                            </Col>
                            <Col sm={6} md={3}>
                                <Panel>
                                    <h2>Mesa 2</h2>
                                    <Button bsStyle="success">Iniciar Cuenta</Button>
                                </Panel>
                            </Col>
                        </Row>
                    
                </Col>
                <Col sm={3} md={3}>
                    <Panel>
                        <h3> Resumen del Dia</h3>
                    </Panel>
                </Col>
            </Grid>
        );
    }
}

export default Tables;