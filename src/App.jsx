import { BrowserRouter } from 'react-router-dom';
// routes
import RutasRoles from './routers/RutasRoles';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/admin/dashboard/scroll-to-top';

import './App.css'

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";


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
