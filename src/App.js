import React, { Fragment ,useState, useEffect} from 'react';
import Formulario from './componentes/Formulario';
import Cita from './componentes/Cita';

function App() {


  //citas en el locar storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if (!citasIniciales) {
    citasIniciales = [] ;

  }

  const [citas, guardarCitas] = useState(citasIniciales)

  //funcion que toma citas acctuales y agrega nuevas
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }
  //eliminar cita por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //useEfect para realziar ciertas operacion cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas))
  
    }else{
      localStorage.setItem('citas',JSON.stringify([]))
    }
  },[citas,citasIniciales])

  //mensaje titulo condicional
  const titulo = citas.length === 0 ? "Ho hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Admin pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario
              crearCita ={crearCita}
            />
          </div>
          <div className='one-half column'>
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita = {eliminarCita}
            />
          ))

          }
          </div>
        </div>
      </div>
    </Fragment>
  );
}



export default App;
