import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import './NavBar.css';


function NavBar({listaRutas}) {
  return (
    <>
    <Link to="/">
      <div className='divLogo'> 
        <img src={logo} className="App-logo" alt="logo" />
        <p>Logo</p>
      </div>
    </Link>
    <div className="navbarMenu">
      {listaRutas.map(linea => {
        return (
          <Link to={`/${linea.name.replace(/ /g,'')}`} key={linea.name.replace(/ /g,'')}>
            {linea.name}
					</Link>
        )})}
    </div>
    </>
  )
}

export default NavBar