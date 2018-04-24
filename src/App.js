import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Tables from './Tables';
import AdminPanel from './AdminPanel';
import NotFound from './NotFound';
import { CurrentVenta } from './mock/currentVenta';
import { Mesas } from './mock/mesas2';
import { Productos } from './mock/productos';

class App extends Component {
  state = {
    mesas: Mesas,
    productos: [],
    venta: [],
    currentVenta: CurrentVenta,
    subtotal: 0,
    adminControl: {
      selectedId: null,
      formShow: false,
      itemToEdit: null
    },
    adminVentas: [],
    loading: true,
    loadingError: false
  }
  lastVentaId = 7;
  ip = '10.33.206.175';

  componentDidMount() {
    this.setState({ loading: true, loadingError: false });
    axios.get(`http://${this.ip}:3001/api/productos`)
      .then((response) => {
        this.setState({ productos: response.data, loading: false, loadingError: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingError: true });
      });
  }

  newVentaId = () => {
    const id = this.lastVentaId;
    this.lastVentaId += 1;
    return id;
  };


  onFinishVentaHandler2 = (mesa, browserHistory) => {
    console.log(mesa.id);
    let foundIndex = this.state.mesas.findIndex((mesa2) => mesa2.id == mesa.id)
    let newMesasState = [...this.state.mesas];
    newMesasState[foundIndex].status = "AVAILABLE";
    let newCurrentVenta = { ...this.state.currentVenta };
    console.log(JSON.parse(JSON.stringify(this.state.currentVenta.filter((venta) => venta.mesa.id == mesa.id))));
    let tmp = JSON.parse(JSON.stringify(this.state.currentVenta.filter((venta) => venta.mesa.id == mesa.id)));
    //let tmp = this.state.currentVenta.filter((venta) => venta.mesa.id == mesa.id);
    tmp.forEach((venta) => {
      delete venta.mesa
    })
    console.log(tmp);
    this.setState({
      venta: [
        ...this.state.venta,
        {
          venta:[...tmp],
          mesa: this.state.mesas.filter((_mesa)=> _mesa.id == mesa.id)
        }
      ],
      currentVenta: this.state.currentVenta.filter((venta) => venta.mesa.id != mesa.id),
      mesas: newMesasState
    });
    browserHistory.goBack();
  }

  onFinishVentaHandler = (mesa, browserHistory) => {

    this.setState({
      venta: [
        ...this.state.venta,
        { detalle: [...mesa.venta], id: mesa.id, tipo: mesa.tipo, total: this.calculateSubtotal(mesa.venta) }
      ]
    });
    var foundIndex = this.state.mesas.findIndex(mesa2 => mesa2.id == mesa.id);
    let stateToEmpty = [...this.state.mesas];
    console.log(stateToEmpty)
    stateToEmpty[foundIndex].venta.length = 0;
    stateToEmpty[foundIndex].status = "AVAILABLE";
    console.log(stateToEmpty)

    this.setState({ mesas: [...stateToEmpty] })
    browserHistory.goBack();

  }

  calculateSubtotal = (venta) => {
    let subtotal = 0;
    console.log(venta);
    if (venta && venta.length > 0) {
      venta.map((producto, index) => {
        if (producto) {
          console.log(producto, producto.cantidad)
          subtotal += producto.cantidad * producto.precio;
        }
      });

    }

    return subtotal;
  }

  calculateTotal2 = () => {
    let total = 0;
    if (this.state.venta && this.state.venta.length > 0) {
      this.state.venta.forEach((ventaMesa) => {
        ventaMesa.venta.forEach((producto) => {
          if (producto) {
            total += producto.precio * producto.cantidad;
          }
        });
      });
    }
    return total;
  }

  onNewVentaProductoHandler2 = (producto, mesaId) => {
    let mesaIndex = this.state.mesas.findIndex((mesa) => mesa.id == mesaId);
    let productoIndex = this.state.currentVenta.findIndex((venta) => venta.idProducto === producto._id && mesaId == venta.mesa.id);

    let newMesasState = [...this.state.mesas];
    newMesasState[mesaIndex].status = "PENDING";

    if (productoIndex !== -1) {
      let newCurrentVenta = [...this.state.currentVenta];
      newCurrentVenta[productoIndex].cantidad++;
      this.setState({
        currentVenta: newCurrentVenta
      })
    } else {
      let id = this.newVentaId();
      this.setState({
        currentVenta: [
          ...this.state.currentVenta,
          {
            id,
            idProducto: producto._id,
            descripcion: producto.descripcion,
            precio: producto.precio,
            clasificacion: producto.clasificacion,
            cantidad: 1,
            mesa: this.state.mesas[mesaIndex]
          },
        ],
        mesas: newMesasState
      })
    }
  }

  onVentaProductoDeleteHandler2 = (index, mesaId) => {
    let foundIndex = this.state.currentVenta.findIndex((venta) => venta.idProducto === index && mesaId == venta.mesa.id);
    if (this.state.currentVenta[foundIndex].cantidad <= 1) {
      const newVentasList = [
        ...this.state.currentVenta.slice(0, foundIndex),
        ...this.state.currentVenta.slice(foundIndex + 1)
      ];
      this.setState({
        currentVenta: newVentasList
      })
    } else {
      let newCurrentVenta = [...this.state.currentVenta]
      newCurrentVenta[foundIndex].cantidad--;
      this.setState({
        currentVenta: newCurrentVenta
      });
    }
  }
  

  //------- ADMIN HANDLERS ------
  adminSaveItemHandler = (item) => {
    this.setState({ loading: true, loadingError: false });
    if (item._id != null){
      axios.put(`http://${this.ip}:3001/api/productos`, { item, type:'Update' })
      .then((res) => {
        this.setState({ productos: res.data, loading: false, loadingError: true })
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingError: true });
      });
    } else {
      axios.post(`http://${this.ip}:3001/api/productos`, item)
      .then((res) => {
        this.setState({ productos: res.data, loading: false, loadingError: true })
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingError: true });
      });
    }
    var adminControl = {...this.state.adminControl, formShow: false, itemToEdit: null };
    this.setState({ adminControl });
  }

  adminDeleteItemHandler = (key) => {
    this.setState({ loading: true, loadingError: false });
    axios.put(`http://${this.ip}:3001/api/productos`, { item: { _id: key }, type:'Delete' })
      .then((res) => {
        this.setState({ productos: res.data, loading: false, loadingError: true })
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingError: true });
      });
    var adminControl = {...this.state.adminControl, selectedId: null};
    this.setState({ adminControl });
  }

  adminShowEditFormHandler = (key) => {
    var item = this.state.productos.filter((item) => item._id === key);
    var adminControl = {...this.state.adminControl, itemToEdit: item[0], formShow: true};
    this.setState({ adminControl });
  }

  adminHandleClose = (show = false) => {
    var adminControl = {...this.state.adminControl, formShow: show, itemToEdit: null };
    this.setState({ adminControl });
  }

  adminControlSelectItem = (id) => {
    var adminControl = { ...this.state.adminControl, selectedId: id };
    this.setState({ adminControl });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to={`/mesas`} />} />
            <Route path="/mesas" render={(props) => <Tables {...props}
              productos={this.state.productos}
              mesas={this.state.mesas}
              venta={this.state.venta}
              currentVenta={this.state.currentVenta}
              subtotalHandler={this.setSubtotal}
              onNewVentaProductoHandler={this.onNewVentaProductoHandler2}
              onVentaProductoDeleteHandler={this.onVentaProductoDeleteHandler2}
              onFinishVentaHandler={this.onFinishVentaHandler2}
              calculateSubtotal={this.calculateSubtotal}
              calculateTotal={this.calculateTotal2}
              loading={this.state.loading}
              loadingError={this.state.loadingError} />}
               />
            <Route path="/admin" render={(props) => <AdminPanel {...props}
              menu={this.state.productos}
              adminControl={this.state.adminControl}
              adminSaveItemHandler={this.adminSaveItemHandler}
              adminDeleteItemHandler={this.adminDeleteItemHandler}
              adminShowEditFormHandler={this.adminShowEditFormHandler}
              adminHandleClose={this.adminHandleClose}
              adminControlSelectItem={this.adminControlSelectItem}
              loading={this.state.loading}
            />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
