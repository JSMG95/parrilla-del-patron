import React, { Component } from 'react';
import moment, { isMoment } from 'moment';
import { Button, ButtonGroup, Glyphicon, Jumbotron, Row } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';

class DetalleItem extends Component {

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
        var fileTitle = 'venta del dia'; // or 'my-unique-title'
        this.exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
    }

    goToDetail(id) {
        let path = `ventas/${id}`;
        this.props.history.push(path);
        this.props.adminControlSelectItem(1);
    }

    renderButtonGroup() {
        const { item, onEdit, onDelete } = this.props;
        switch(this.props.entity) {
            case 'ventas':
                return (
                    <ButtonGroup bsSize='large'>
                        <Button bsStyle='primary' onClick={() => this.goToDetail(item._id)}><Glyphicon glyph='paste' /> Ver Detalle</Button>
                        <Button bsStyle='danger' onClick={() => console.log('reporte pdf')}><Glyphicon glyph="save-file" /> Reporte PDF</Button>
                        <Button bsStyle='success' onClick={() => console.log('reporte csv')}><Glyphicon glyph="list-alt" /> Reporte CSV</Button>
                    </ButtonGroup>
                );
            break;
            case 'productos':
                return (
                    <ButtonGroup bsSize='large'>
                        <Button bsStyle='warning' onClick={() => onEdit(item._id)}><Glyphicon glyph="edit" /> Editar</Button>
                        <Confirm
                            onConfirm={() => onDelete(item._id)}
                            body={'¿Está seguro de eliminar?'}
                            confirmText="Eliminar"
                            title="Eliminar Registro">
                            <Button bsStyle='danger'><Glyphicon glyph="minus-sign" /> Deshabilitar</Button>
                        </Confirm>
                    </ButtonGroup>
                );
            break;
        }
    }

    renderFields() {
        const t = Object.keys(this.props.item).map(key => {
            switch (key) {
                case '_id':
                    break;
                case '__v':
                    break;
                case 'detalle':
                    break;
                case 'precio':
                    return <h4 key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {`$${Number(this.props.item[key]).toFixed(2)}`}</h4>
                    break;
                case 'importe':
                    return <h4 key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {`$${Number(this.props.item[key]).toFixed(2)}`}</h4>
                    break;  
                case 'fecha':
                    break;
                default:
                    return <h4 key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {this.props.item[key]}</h4>
            }
        });
        return t;
    }

    render() {
        if (this.props.item) {
            const { item, onEdit, onDelete } = this.props;
            return (
                <Jumbotron style={styles.detalleStyle}>
                    {this.renderFields()}
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

export default DetalleItem;
