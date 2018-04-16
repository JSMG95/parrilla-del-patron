import React, {Component} from 'react';
import { ListGroup, ListGroupItem, Row, Col, Panel } from 'react-bootstrap';
import DetalleItem from './DetalleItem';

class ListaDetalleItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        };
    };

    selectItem(id) {
        this.setState({ selectedItem: id });
    }

    renderList() {
        return this.props.items.map(item => 
            <ListGroupItem
                key={item.id}
                active={item.id===this.selectedItem} 
                onClick={() => this.selectItem(item.id)}>
                {item.descripcion}
            </ListGroupItem>
        );
    }

    renderDetail() {
        if (this.state.selectedItem) {
            var prod = this.props.items.find((item) => item.id === this.state.selectedItem);
            return (
                <DetalleItem 
                    onDelete={this.props.onDelete}
                    onEdit={this.props.onEdit}
                    item={prod} 
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
        return (
            <Row>
                <Col md={6} xs={6}>
                    <Panel style={intLeftPanelStyle}>
                    <ListGroup style={listGroupStyle}>
                        {this.renderList()}
                    </ListGroup>
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
        height: '56vh'
    },
    intRightPanelStyle: {
        marginTop: 20,
        marginLeft: 0,
        marginRight: 20,
        marginBottom: 20,
        padding: 10,
        height: '56vh'
    }
};

export default ListaDetalleItems;