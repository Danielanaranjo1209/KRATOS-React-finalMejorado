import { useState } from 'react'
import PageTitle from '../components/PageTitle.jsx'
import Modal from '../components/Modal.jsx'
import Tabs from '../components/Tabs.jsx'
import Accordion from '../components/Accordion.jsx'
import Dropdown from '../components/Dropdown.jsx'
import Toast from '../components/Toast.jsx'

export default function Componentes(){
 const [modal,setModal]=useState(false); const [toast,setToast]=useState(''); const [accion,setAccion]=useState('Ninguna')
 const items=[{titulo:'Objetivo',contenido:<p>Planifica tu actividad física y construye hábitos de forma gradual.</p>},{titulo:'Recomendación',contenido:<p>Elige actividades de acuerdo con tu nivel y respeta tus descansos.</p>}]
 const preguntas=[{pregunta:'¿Qué es KRATOS?',respuesta:'Una aplicación académica para explorar actividades y organizar una rutina semanal.'},{pregunta:'¿Se guarda mi planificación?',respuesta:'Sí. Se conserva en el almacenamiento local del navegador.'},{pregunta:'¿Necesita backend?',respuesta:'No para esta demostración; los datos se almacenan localmente.'}]
 return <main className="container"><PageTitle title="Componentes interactivos" description="Demostración de Modal, Tabs, Acordeón, Dropdown y Toast para la sustentación."/>
 <div className="showcase-grid"><section className="panel"><h2>Modal</h2><p>Ventana emergente con cierre por botón o tecla Escape.</p><button className="button" onClick={()=>setModal(true)}>Abrir modal</button></section>
 <section className="panel"><h2>Tabs</h2><Tabs items={items}/></section>
 <section className="panel"><h2>Acordeón</h2><Accordion items={preguntas}/></section>
 <section className="panel"><h2>Dropdown</h2><Dropdown opciones={['Ver perfil','Editar preferencias','Cerrar']} onSeleccionar={op=>{setAccion(op);setToast(`Seleccionaste: ${op}`)}}/><p>Acción seleccionada: <strong>{accion}</strong></p></section>
 <section className="panel"><h2>Toast</h2><p>Notificación temporal de confirmación.</p><button className="button" onClick={()=>setToast('¡Tu acción se realizó correctamente!')}>Mostrar Toast</button></section></div>
 <Modal abierto={modal} cerrar={()=>setModal(false)} titulo="Bienvenida a KRATOS"><p>Este es un ejemplo de modal interactivo. Puedes cerrarlo con la X, fuera de la ventana o con Escape.</p><button className="button" onClick={()=>setModal(false)}>Entendido</button></Modal><Toast mensaje={toast} cerrar={()=>setToast('')} tipo="success"/>
 </main>
}
