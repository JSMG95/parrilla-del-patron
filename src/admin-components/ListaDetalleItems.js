import React, {Component} from 'react';
import { ListGroup, ListGroupItem, Row, Col, Panel } from 'react-bootstrap';
import DetalleItem from './DetalleItem';
import ActivitySpinner from '../ActivitySpinner';

class ListaDetalleItems extends Component {
    constructor(props) {
        super(props);
    };

    renderList() {
        if (this.props.loading) {
            return <ActivitySpinner />;
        } else {
            return this.props.items.map(item => 
                <ListGroupItem
                    key={item._id}
                    active={item._id === this.props.adminControl.selectedId} 
                    onClick={() => this.props.adminControlSelectItem(item._id)}>
                    {item.descripcion}
                </ListGroupItem>
            );
        }
    }

    renderDetail() {
        if (this.props.adminControl.selectedId) {
            var prod = this.props.items.find((item) => item._id === this.props.adminControl.selectedId);
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