import { BrowserRouter } from 'react-router-dom';
// routes
import RoutesAdmin from './routers/RoutesAdmin';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/admin/dashboard/scroll-to-top';

import './App.css'


function App() { //Pinta solo el index de la pagina.
  return (
    //ADMIN
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <RoutesAdmin />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
