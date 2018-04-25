import React, { Component } from 'react';
import { Row, Col, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import Table from './Table';

class TableGrid extends Component {

    constructor(props) {
        super(props);
    }

    renderTable(index, array){
        if (index+1 % 4 === 0) {
            return(
                <Row>
                    {array.slice(0,index).map((mesa) => <Table {...this.props} key={index} currentVenta={this.props.currentVenta} detalle={mesa} calculateSubtotal={this.props.calculateSubtotal}/>)}
                </Row>
            )
         }

        
    }

    render() {
        let tables =[];
        let tablesRow = [];
        let rowNumber = 0;
        this.props.mesas.forEach((mesa, index) => {
            if (!tables[rowNumber]){
                tables[rowNumber] = new Array();
            }
            tables[rowNumber].push(<Table {...this.props} key={index} currentVenta={this.props.currentVenta} detalle={mesa} calculateSubtotal={this.props.calculateSubtotal}/>)
            if ((index + 1) % 4 == 0){
                rowNumber++;
                console.log(tables);
            }
            
        })
        

        return (
            <Col sm={9} md={9}>
                <Row className='text-center'>
                    <ButtonGroup bsSize="large">
                        <Button 
                            style={{ backgroundColor: 'salmon', color: '#fff' }}
                            onClick={() => {this.props.onAddPedido('Domicilio')}}    
                        ><Glyphicon glyph="plus" /> Pedido Domicilio</Button>
                        <Button
                            style={{ backgroundColor: 'salmon', color: '#fff' }}
                            onClick={() => {this.props.onAddPedido('Bar')}}
                        ><Glyphicon glyph="plus" /> Pedido Bar</Button>
                    </ButtonGroup>
                </Row>
                <hr />
                
                    {
                        tables.map((row, index) => <Row key={index}>{row}</Row>)
                        //this.props.mesas.map((mesa, index, array) => 
                            //<Table {...this.props} key={index} currentVenta={this.props.currentVenta} detalle={mesa} calculateSubtotal={this.props.calculateSubtotal}/>
                            //tablesRow
                        //)
                        
                    }
                
            </Col>
        );
    }

}

export default TableGrid;