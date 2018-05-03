import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
//var BarChart = require("react-chartjs").Bar;

class Chart extends Component {

    constructor(props) {
        super(props);
    }

    getMonthTotal(mes) {
        let total = 0;
        if (mes) {
            Object.keys(mes).forEach(key => {
                console.log(mes[key]);   // the value of the current key.
                total += parseInt(mes[key].total)
            });
        }
        return total;
    }

    barClick = () => {

    }

    render() {

        let labels = [];
        let datasets = [];
        let data = [];
        let options = {};
        let shouldAddEvent = false;

        if (this.props.ventasMes.length <= 1 && this.props.ventasMes[0]) {
            Object.keys(this.props.ventasMes[0]).forEach(key => {
                console.log(this.props.ventasMes[0][key]);   // the value of the current key.
                if (this.props.qty) {
                    data.push(this.props.ventasMes[0][key].qty);
                } else {
                    data.push(this.props.ventasMes[0][key].total);
                }
            });
            options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 5
                        }
                    }]
                }
            }
            labels = Object.keys(this.props.ventasMes[0]);
            datasets.push({
                label: "Detalle del Mes",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data
            })
        } else if (this.props.month) {
            Object.keys(this.props.ventasMes[this.props.month]).forEach(key => {
                console.log(this.props.ventasMes[this.props.month][key]);   // the value of the current key.
                if (this.props.qty) {
                    data.push(this.props.ventasMes[this.props.month][key].qty);
                } else {
                    data.push(this.props.ventasMes[this.props.month][key].total);
                }
            });
            options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 5
                        }
                    }]
                }
            }
            labels = Object.keys(this.props.ventasMes[this.props.month]);
            datasets.push({
                label: "Detalle del Mes",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data
            })
        }
        else {
            this.shouldAddEvent = true;
            console.log(this.props.ventasMes)
            labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            datasets.push({
                label: "Resumen Año",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: this.props.ventasMes.map((mes) => this.getMonthTotal(mes))
            })
        }

        let chartData = {
            labels,
            datasets

        }
        return <Bar data={chartData} options={options} onElementsClick={(bar) => { console.log(bar); if(this.shouldAddEvent) this.props.toggleChart2(bar[0]._index) }} />
    }

}

export default Chart