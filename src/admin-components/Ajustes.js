import React, {Component} from 'react';
import { Panel, Row, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Ajustes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: 'La Parrilla del Patrón',
            mesas: 1
        };
        this.isEditing = true;
    }

    onMesasChange(e) {
        this.setState({ mesas: e.target.value });
    }

    onNombreChange(e) {
        this.setState({ nombre: e.target.value });
    }

    render() {
        return (
            <Panel style={styles.extPanelStyle}>
                <Row>
                    <h4>&nbsp;Ajustes de aplicación</h4>
                    <hr/>
                </Row>
                <Form>
                    <FormGroup style={{ marginBottom: 20 }}>
                        <ControlLabel>Nombre Restaurant:</ControlLabel>{' '}
                        <FormControl
                            value={this.state.nombre}
                            type='text'
                            placeholder='Nombre del restaurant...'
                            style={{ width: 200 }}
                            onChange={this.onNombreChange.bind(this)}
                            inputRef={ref => { this.nombre = ref; }}/>
                    </FormGroup>
                    <FormGroup style={{ marginBottom: 20 }}>
                        <ControlLabel>No. de mesas:</ControlLabel>{' '}
                        <FormControl
                            value={this.state.mesas}
                            type='number'
                            placeholder='Mesas...'
                            min='1'
                            style={{ width: 100 }}
                            onChange={this.onMesasChange.bind(this)}
                            inputRef={ref => { this.mesas = ref; }}/>
                    </FormGroup>
                </Form>
            </Panel>
        );
    }
}

const styles = {
    extPanelStyle: {
        padding: 20,
        margin: 20,
        height: '73vh'
    }
};

export default Ajustes;