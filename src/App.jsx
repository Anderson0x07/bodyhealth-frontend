import { BrowserRouter } from 'react-router-dom';
// routes
import RutasRoles from './routers/RutasRoles';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/admin/dashboard/scroll-to-top';

import './App.css'


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <RutasRoles />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
