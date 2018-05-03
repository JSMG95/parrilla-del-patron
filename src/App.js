import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
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
    currentVenta: [],
    subtotal: 0,
    adminControl: {
      selectedId: null,
      formShow: false,
      itemToEdit: null,
      startDate: moment().startOf('month'),
      endDate: moment().endOf('day')
    },
    adminVentas: [],
    loading: true,
    loadingError: false
  }
  lastVentaId = 7;
  ip = 'localhost';

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
    let foundIndex = this.state.mesas.findIndex((mesa2) => mesa2.id == mesa.id)
    //let newMesasState = [...this.state.mesas];
    let newMesasState = JSON.parse(JSON.stringify(this.state.mesas));
    if (foundIndex > 0){
      newMesasState[foundIndex].status = "AVAILABLE";
    }
    let newCurrentVenta = { ...this.state.currentVenta };
    let tmp = JSON.parse(JSON.stringify(this.state.currentVenta.filter((venta) => venta.mesa.id == mesa.id)));
    tmp.forEach((venta) => {
      delete venta.mesa
    })
    if (mesa.tipo === "Domicilio" || mesa.tipo === "Bar") {
      newMesasState = newMesasState.filter((mesa_) => mesa.id != mesa_.id);
    }
    browserHistory.goBack();
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
    stateToEmpty[foundIndex].venta.length = 0;
    stateToEmpty[foundIndex].status = "AVAILABLE";


    this.setState({ mesas: [...stateToEmpty] })
    browserHistory.goBack();

  }

  calculateSubtotal = (venta) => {
    let subtotal = 0;
    if (venta && venta.length > 0) {
      venta.map((producto, index) => {
        if (producto) {
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

  onFinishDayHandler = () => {
    if (this.state.currentVenta.length > 0){
      alert('Debe finalizar primero todas las ventas');
    } else {
    let data = {
      fecha: moment().subtract(5, 'hour'),
      importe: this.calculateTotal2(),
      detalle: this.state.venta
    }
    this.setState({ loading: true, loadingError: false });
    axios.post(`http://${this.ip}:3001/api/ventas`, data)
      .then((res) => {
        this.setState({ ...this.state, venta: [], loading: false  })
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingError: true });
      })
    }
  }

  onAddPedido = (type = "Bar") => {
    this.setState({mesas: [...this.state.mesas, {
        id: this.state.mesas.length + 1,
        status: 'AVAILABLE',
        tipo: type
      }] 
    });
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
    //this.formBtnStyle = 'success';
    var adminControl2 = {...this.state.adminControl, formShow: show, itemToEdit: null };
    this.setState({ adminControl: adminControl2 });
  }

  adminControlSelectItem = (id) => {
    var adminControl = { ...this.state.adminControl, selectedId: id };
    this.setState({ adminControl });
  }

  adminLoadVentas = () => {
    const { startDate, endDate } = this.state.adminControl;
    if (startDate > endDate) {
      alert('La fecha inicial es mayor que la fecha final');
      this.setState({adminVentas: [], loading: false, loadingError: false});
    } else {
      this.setState({ loading: true, loadingError: false });
      let dates = { startDate, endDate };
      axios.get(`http://${this.ip}:3001/api/ventas`, { params: { dates }})
      .then((response) => {
        this.setState({adminVentas: response.data, loading: false, loadingError: false});
      })
      .catch((error) => {
        console.log(error);
        this.setState({loadingError: true});
      })
    }
  }

  adminVentasSetDateHandler = (date, x = 'start') => {
    var adminControl;
    switch(x) {
      case 'end':
        adminControl = { ...this.state.adminControl, endDate: moment(date).endOf('day') };
        break;
      case 'start':
        adminControl = { ...this.state.adminControl, startDate: moment(date).startOf('day') };
        break;
    }
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
              onFinishDayHandler={this.onFinishDayHandler}
              onAddPedido={this.onAddPedido}
              calculateSubtotal={this.calculateSubtotal}
              calculateTotal={this.calculateTotal2}
              loading={this.state.loading}
              loadingError={this.state.loadingError} />}
               />
            <Route path="/admin" render={(props) => <AdminPanel {...props}
              menu={this.state.productos}
              adminControl={this.state.adminControl}
              adminVentas={{
                ventas: this.state.adminVentas,
                setDateHandler: this.adminVentasSetDateHandler,
                loadVentas: this.adminLoadVentas
              }}
              adminSaveItemHandler={this.adminSaveItemHandler}
              adminDeleteItemHandler={this.adminDeleteItemHandler}
              adminShowEditFormHandler={this.adminShowEditFormHandler}
              adminHandleClose={this.adminHandleClose}
              adminControlSelectItem={this.adminControlSelectItem}
              calculateSubtotal={this.calculateSubtotal}
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
