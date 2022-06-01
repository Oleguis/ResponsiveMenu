import React, {useState} from 'react'
import {useNavigate} from 'react-router';
import './Formulario.css'

const initialState = {
  nombre: {valor:'',error: ''},
  correo: {valor:'',error: ''},
  celular: {valor:'+',error: ''},
  edad: {valor:'',error: ''},
}

function Formulario({itemName}) {
  const variable = itemName.replace(/ /g,'');
  const [datos, setDatos] = useState({[variable]:initialState})
  const [mensajeModal, setMensajeModal] = useState('');
  const [classeModal, setClasseModal] = useState('divModalPpal')
  const navigate = useNavigate();


  function desplegarMensaje(){
    setClasseModal('divModalPpal mostrarModal');
    setMensajeModal(`Datos enviados a ${itemName} correctamente`);
    setTimeout(()=>{
        setMensajeModal('');
        setClasseModal('divModalPpal');
        setDatos(()=>initialState)
        navigate("/");
      },5000);
  }

  function sendData(e){
    e.preventDefault();
    let validacion = true;
    if (datos.nombre.valor === '' || /\d/.test(datos.nombre.valor)) {
      datos.nombre.error = 'Nombre inválido. No puede contener números o estar vacío';
      validacion = false;
    };
    if (!/^[-\wñÑáéíóú.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(datos.correo.valor) ) {
      datos.correo.error = 'Correo inválido. No puede estar vacío y debe ser de tipo email';
      validacion = false;
    };
    if (!/\+[0-9]{2}\([0-9]{3}\)[0-9]{7}/.test(datos.celular.valor)) {
      datos.celular.error = 'Número de célular inválido. Debe ser de esta forma "+12(123)1234567"'
      validacion = false;
    };
    if (datos.edad.valor < 18 || datos.edad.valor > 100) {
      datos.edad.error = 'Edad fuera de rango. Debe ser mayor de edad y menor de 100'
      validacion = false;
    };
    if (validacion){
      console.table({
        nombre:datos.nombre.valor,
        email:datos.correo.valor,
        celular: datos.celular.valor,
        edad: datos.edad.valor
      })
      setDatos({nombre: {valor:'',error: ''},
      correo: {valor:'',error: ''},
      celular: {valor:'+',error: ''},
      edad: {valor:'',error: ''},})
      desplegarMensaje();
    }else{
      setDatos({...datos})
    }
 
  }

  function onHandLetChange(e){
    const campo = e.target.name;
    if (campo === 'edad' && !/^\d*$/.test(e.target.value)) return
    if (campo === 'celular'){
      if ((!/^\d*$/.test(e.target.value.slice(-1)) && !'()+'.includes(e.target.value.slice(-1))) || e.target.value.length === 16 ) return
      if (e.target.value.length === 1 && e.target.value !== '+') datos[campo].valor = '+' + e.target.value;
      else if (e.target.value.length === 3 && /^\d*$/.test(e.target.value.slice(-1))) datos[campo].valor = e.target.value + '(';
      else if (e.target.value.length === 7  && /^\d*$/.test(e.target.value.slice(-1))) datos[campo].valor = e.target.value + ')';
      else datos[campo].valor = e.target.value;
    }else datos[campo].valor = e.target.value;
    datos[campo].error = '';
    setDatos({...datos})
  }


  return (
    <>
    <form className='formulario' onSubmit={sendData}>
      <p className='tituloForm'>
        Hola, bienvenido, sabemos que quieres viajar en<strong>{` ${itemName} `}</strong>, por favor diligencia el siguiente formulario:</p>
      <div className="divItemForm">
        <div className="divLabelForm">
          <label htmlFor="nombre">Nombre <strong>*</strong></label>
        </div>
        <div className={"divInputForm"}>
          <input 
            className={datos.nombre.error ? 'inputError': 'valido'} 
            type="text" 
            id="nombre" 
            name="nombre" 
            placeholder="Indique su nombre y apellido" 
            onChange={onHandLetChange} 
            value={datos.nombre.valor}
          />
          <label className='errorMessage'>{datos.nombre.error}</label>
        </div>
      </div>
      <div className="divItemForm">
        <div className="divLabelForm">
          <label htmlFor="lname">Correo<strong>*</strong></label>
        </div>
        <div className={"divInputForm"}>
          <input 
            className={datos.correo.error ? 'inputError': 'valido'} 
            type="text" 
            id="correo" 
            name="correo" 
            placeholder="Indique su correo electrónico" 
            onChange={onHandLetChange} 
            value={datos.correo.valor}
          />
          <label className='errorMessage'>{datos.correo.error}</label>
        </div>
      </div>
      <div className="divItemForm">
        <div className="divLabelForm">
          <label htmlFor="celular">Celular<strong>*</strong></label>
        </div>
        <div className={"divInputForm"}>
          <input 
            className={datos.celular.error ? 'inputError': 'valido'}
            type="text"
            id="celular"
            name="celular"
            placeholder="Célular # ejemplo: +12(123)1234567"
            onChange={onHandLetChange}
            value={datos.celular.valor}
          />
          <label className='errorMessage'>{datos.celular.error}</label>
        </div>
      </div>
      <div className="divItemForm">
        <div className="divLabelForm">
          <label htmlFor="edad">Edad<strong>*</strong></label>
        </div>
        <div className={"divInputForm"}>
          <input 
            className={datos.edad.error ? 'inputError': 'valido'} 
            type="text" 
            id="edad" 
            name="edad" 
            placeholder="Indique su Edad. Debe ser mayor de edad" 
            onChange={onHandLetChange} 
            value={datos.edad.valor}
          />
          <label className='errorMessage'>{datos.edad.error}</label>
        </div>
      </div>
      <p className='infoForm'><strong>*</strong>{` Todos los campos son requeridos`}</p>
      <div className="divItemForm divBtnForm">
        <input type="submit" value="Enviar" />
      </div>
    </form>
    <div className={classeModal}>
      <div className='mensajeModal'>{mensajeModal}</div>
    </div>
    </>
  )
}

export default Formulario