import {Route,Routes} from 'react-router-dom'
import {Tablero} from '../pages/tablero'
import {Maquinas} from '../pages/maquinas'
import {Rutinas} from '../pages/rutinas'
import {Musculo} from '../pages/Musculo'

export  function Myroutes() {
 
  return(
  
   
    <Routes>
      <Route path="/" element={<Tablero/>}/>
      <Route path="/maquinas" element={<Maquinas/>}/>
      <Route path="/rutinas" element={<Rutinas/>}/>
      <Route path="/musculos" element={<Musculo/>}/>
    </Routes>
    
  
  )
}
