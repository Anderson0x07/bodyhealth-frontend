import {Route,Routes} from 'react-router-dom'
import {Tablero} from '../pages/tablero'
import {Maquinas} from '../pages/maquinas'
import {Rutinas} from '../pages/rutinas'

export  function Myroutes() {
 
  return(
  
   
    <Routes>
      <Route path="/" element={<Tablero/>}/>
      <Route path="/maquinas" element={<Maquinas/>}/>
      <Route path="/rutinas" element={<Rutinas/>}/>
    </Routes>
    
  
  )
}
