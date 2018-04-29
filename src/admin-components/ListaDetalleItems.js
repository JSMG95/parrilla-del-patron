import React, {Component} from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem, Row, Col, Panel, Glyphicon } from 'react-bootstrap';
import DetalleItem from './DetalleItem';
import DetalleConsumo from './DetalleConsumo';
import ActivitySpinner from '../ActivitySpinner';

class ListaDetalleItems extends Component {
    constructor(props) {
        super(props);
    };

    renderList() {
        if (this.props.loading) {
            return <ActivitySpinner />;
        } else {
            if (this.props.items.length !== 0) {
                return this.props.items.map((item, index) => {
                    let line;
                    switch(this.props.entity) {
                        case 'productos':
                            line = <p><Glyphicon glyph="cutlery" /> {item.descripcion}</p>;
                        break;
                        case 'ventas':
                            line = <p><Glyphicon glyph="usd" /> {moment(item.fecha).locale('es').format("dddd, MMMM Do YYYY")}</p>;
                        break;
                        case 'consumos':
                            item._id = index + 1;
                            line = <p><Glyphicon glyph="tag" /> {`Consumo: ${index} Tipo: ${item.mesa[0].tipo} Total: $${this.props.calculateSubtotal(item.venta)}.00`}</p>
                        break;
                    }
                    return (
                        <ListGroupItem
                            key={item._id}
                            active={item._id === this.props.adminControl.selectedId} 
                            onClick={() => this.props.adminControlSelectItem(item._id)}
                        >
                            {line}
                        </ListGroupItem>
                    );
                });
            } else {
                return <h4>No existen datos para mostrar.</h4>
            }
        }
    }

    renderDetail() {
        if (this.props.adminControl.selectedId) {
            if (this.props.entity === 'consumos') {
                const { selectedId } = this.props.adminControl;
                console.log('cero', this.props.items[0]);
                return (
                    <DetalleConsumo {...this.props}
                        onDelete={this.props.onDelete}
                        onEdit={this.props.onEdit}
                        item={this.props.items[selectedId - 1].venta} 
                        entity={this.props.entity}
                    />
                );
            }
            var prod = this.props.items.find((item) => item._id === this.props.adminControl.selectedId);
            return (
                <DetalleItem {...this.props}
                    onDelete={this.props.onDelete}
                    onEdit={this.props.onEdit}
                    item={prod} 
                    entity={this.props.entity}
                />
            );
        }
    }

    render() {
        const {
            listGroupStyle,
            intLeftPanelStyle,
            intRightPanelStyle
        } = styles;
        const isLoading = this.props.loading;
        const content = isLoading ? (
            <ActivitySpinner />
        ) : (
            <ListGroup style={listGroupStyle}>
                {this.renderList()}
            </ListGroup>
        );
        return (
            <Row>
                <Col md={6} xs={6}>
                    <Panel style={intLeftPanelStyle}>
                        {content}
                    </Panel>
                </Col>
                <Col md={6} xs={6}>
                    <Panel style= {intRightPanelStyle}>
                        {this.renderDetail()}
                    </Panel>
                </Col>
            </Row>
        );
    };
};

const styles = {
    listGroupStyle: {
        padding: 10,
    },
    intLeftPanelStyle: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 0,
        marginBottom: 20,
        padding: 10,
        height: '100%'
    },
    intRightPanelStyle: {
        marginTop: 20,
        marginLeft: 0,
        marginRight: 20,
        marginBottom: 20,
        padding: 10,
        height: '100%'
    }
};

export default ListaDetalleItems;