import './App.css';
import Formulario from './Components/Formulario/Formulario';
import NavBar from './Components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';

const listaRutas = [
  {id:1, name: 'Vivair'},
  {id:2, name: 'Avianca'},
  {id:3, name: 'American Air Line'},
  {id:6, name: 'Satena'},
];



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar listaRutas={listaRutas} />
      </header>
      <section className='App-Seccion'>
        <Routes>
          <Route path='/'>
          {listaRutas.map(linea => {
            return (
            <Route 
              exact path = {`/${linea.name.replace(/ /g,'')}`} 
              element = {<Formulario itemName={linea.name} />}
              key = {'rut-' + linea.name.replace(/ /g,'')}>
            </Route>)
          })}
            <Route path='/' element={<h1>Home Page</h1>}></Route>
          </Route>
        </Routes>
      </section>
      </div>
  );
}

export default App;
