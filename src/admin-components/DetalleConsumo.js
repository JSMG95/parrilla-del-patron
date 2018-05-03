import React, { Component } from 'react';
import moment, { isMoment } from 'moment';
import { Button, ButtonGroup, Glyphicon, Jumbotron, Row, Table } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';

class DetalleConsumo extends Component {

    convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                    line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }

    exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }
        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);
        var csv = this.convertToCSV(jsonObject);
        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    download() {
        var headers = {
            cantidad: 'Cantidad'.replace(/,/g, ''), // remove commas to avoid errors
            descripcion: "Descripcion",
            clasificacion: "Clasificacion",
            precio: "Precio",
            importe: 'Importe'
        };
        var itemsFormatted = [];
        this.props.item.forEach((item) => {
            itemsFormatted.push({
                cantidad: item.cantidad,
                descripcion: item.descripcion,
                clasificacion: item.clasificacion,
                precio: Number(item.precio).toFixed(2),
                importe: Number(item.precio * item.cantidad).toFixed(2)
            });
        });
        var fileTitle = 'detalle_consumo'; // or 'my-unique-title'
        this.exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
    }

    renderButtonGroup() {
        return (
            <ButtonGroup bsSize='large'>
                <Button bsStyle='primary' onClick={() => console.log('reporte csv')}><Glyphicon glyph="save-file" /> Descargar PDF</Button>
                <Button bsStyle='default' onClick={() => this.download()}><Glyphicon glyph="list-alt" /> Descargar CSV</Button>
            </ButtonGroup>
        );
    }
    renderTable() {
        const t = Object.keys(this.props.item).map((row, index) => {
            return (
                <tr key={index}> 
                    <td>{this.props.item[row].descripcion}</td>
                    <td>{this.props.item[row].clasificacion}</td>
                    <td className='text-center'>{this.props.item[row].cantidad}</td>
                    <td className='text-center'>{Number(this.props.item[row].precio).toFixed(2)}</td>
                    <td className='text-center'>{Number(this.props.item[row].precio * this.props.item[row].cantidad).toFixed(2)}</td>
                </tr>
            );
        });
        return t;
    }

    render() {
        if (this.props.item) {
            return (
                <Jumbotron style={styles.detalleStyle}>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th className='col-md-6'>Descripción</th>
                            <th>Clasificación</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTable()}
                        </tbody>
                    </Table>
                    
                    <hr />
                    <Row className='text-center'>
                        {this.renderButtonGroup()}
                    </Row>
                </Jumbotron>
            );
        } else {
            return <Jumbotron style={styles.detalleStyle} />;
        }        
    };
};

const styles = {
    detalleStyle:{
        padding: 10,
        backgroundColor: 'white'
    }
};

export default DetalleConsumo;
