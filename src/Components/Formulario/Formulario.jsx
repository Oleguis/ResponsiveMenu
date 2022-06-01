import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router';
import './Formulario.css'


function Formulario({itemName}) {
  const [datos, setDatos] = useState({
    nombre: {valor:'',error: ''},
    correo: {valor:'',error: ''},
    celular: {valor:'+',error: ''},
    edad: {valor:'',error: ''},
  })
  const [mensajeModal, setMensajeModal] = useState('');
  const [classeModal, setClasseModal] = useState('divModalPpal')
  const navigate = useNavigate();

  console.log('this is a test')
  function desplegarMensaje(){
    setClasseModal('divModalPpal mostrarModal');
    setMensajeModal(`Datos enviados a ${itemName} correctamente`);
    const salida = setTimeout(()=>{
        setMensajeModal('');
        setClasseModal('divModalPpal');
        setDatos({
          nombre: {valor:'',error: ''},
          correo: {valor:'',error: ''},
          celular: {valor:'+',error: ''},
          edad: {valor:'',error: ''},
        })
        navigate("/");
      },5000);
  }

  function sendData(e){
    e.preventDefault();
    const newDatos = {...datos};
    let validacion = true;
    if (newDatos.nombre.valor === '' || /\d/.test(newDatos.nombre.valor)) {
      newDatos.nombre.error = 'Nombre inválido. No puede contener números o estar vacío';
      validacion = false;
    };
    if (!/^[-\wñÑáéíóú.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(newDatos.correo.valor) ) {
      newDatos.correo.error = 'Correo inválido. No puede estar vacío y debe ser de tipo email';
      validacion = false;
    };
    if (!/\+[0-9]{2}\([0-9]{3}\)[0-9]{7}/.test(newDatos.celular.valor)) {
      newDatos.celular.error = 'Número de célular inválido. Debe ser de esta forma "+12(123)1234567"'
      validacion = false;
    };
    if (newDatos.edad.valor < 18 || newDatos.edad.valor > 100) {
      newDatos.edad.error = 'Edad fuera de rango. Debe ser mayor de edad y menor de 100'
      validacion = false;
    };
    if (validacion){
      desplegarMensaje();
    }else{
      setDatos(newDatos)
    }
  }
  function onHandLetChange(e){
    const campo = e.target.name;
    const newDatos={...datos} 
    if (campo === 'edad' && !/^\d*$/.test(e.target.value)) return
    if (campo === 'celular'){
      if ((!/^\d*$/.test(e.target.value.slice(-1)) && !'()+'.includes(e.target.value.slice(-1))) || e.target.value.length === 16 ) return
      if (e.target.value.length === 1 && e.target.value !== '+') newDatos[campo].valor = '+' + e.target.value;
      else if (e.target.value.length === 3 && /^\d*$/.test(e.target.value.slice(-1))) newDatos[campo].valor = e.target.value + '(';
      else if (e.target.value.length === 7  && /^\d*$/.test(e.target.value.slice(-1))) newDatos[campo].valor = e.target.value + ')';
      else newDatos[campo].valor = e.target.value;
    }else newDatos[campo].valor = e.target.value;
    newDatos[campo].error = '';
    setDatos({...newDatos})
  }


  useEffect(() => {
    console.log('entro')
    return () => {
      setDatos({nombre: {valor:'',error: ''},
        correo: {valor:'',error: ''},
        celular: {valor:'+',error: ''},
        edad: {valor:'',error: ''}})
    }
  }, [itemName])
  
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