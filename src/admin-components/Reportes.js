import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Panel, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import Chart from './Chart';

class Reportes extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedMonth: "",
        selectedYear: "",
        shouldDisplayChart: false,
        shouldDisplayChart2:false,
        chart2Month: 0
    }

    toggleChart2 = (month) => {
        this.setState({
            shouldDisplayChart2: true,
            chart2Month: month
        })
    }

    render() {

        const styles = {
            extPanelStyle: {
                padding: 20,
                margin: 20,
                height: '100%'
            }
        };

        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const currentYear = moment(Date.now()).year();
        let years = [];
        for (let i = currentYear; i === 2018; i--) {
            years.push(i)
        }
        let chart = this.state.shouldDisplayChart ? <Chart ventasMes={this.props.ventasMes} qty toggleChart2={this.toggleChart2}/> : false;
        let chart2 = this.state.shouldDisplayChart2 ? <Chart ventasMes={this.props.ventasMes} qty month={this.state.chart2Month} /> : false

        return (
            <Panel style={styles.extPanelStyle}>
                <Row className="text-center">
                    <h3>Selecciona Mes/Año o Año para generar un reporte</h3>
                </Row>
                <hr />
                <Row>

                    <Col mdOffset={4} md={4} xs={1} >
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Selecciona un Mes</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" onChange={(e) => this.setState({ selectedMonth: e.target.value })}>
                                <option value="none">Selecciona...</option>
                                {months.map((month, index) => <option key={index + 1} value={index + 1}>{month}</option>)}
                            </FormControl>
                            <ControlLabel>Selecciona un Año</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" onChange={(e) => this.setState({ selectedYear: e.target.value })}>
                                <option value="none">Selecciona...</option>
                                {years.map((year, index) => <option key={index} value={year}>{year}</option>)}

                            </FormControl>
                            <hr />
                            <Button bsStyle="success" onClick={() => {
                                this.setState({ shouldDisplayChart: true });
                                this.props.generateMonthReport(this.state.selectedMonth, this.state.selectedYear)
                                

                            }} block>Generar Reporte del Mes</Button>
                            <Button bsStyle="success" onClick={() => {this.setState({shouldDisplayChart: true}); this.props.generateYearReport(this.state.selectedMonth, this.state.selectedYear)
                            }} block >Generar Reporte Anual</Button>
                        </FormGroup>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={5} xs={1}>
                        <h3>Gráfica de Resumen</h3>
                        {chart}

                    </Col>
                    <Col md={6} xs={1}>
                        <h3>Detalle</h3>
                        {chart2}

                    </Col>
                </Row>
            </Panel>
        )
    }


}

export default Reportes;