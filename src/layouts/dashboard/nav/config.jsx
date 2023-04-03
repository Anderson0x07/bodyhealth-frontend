import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import StoreIcon from '@mui/icons-material/Store';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';


const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard/home',
    icon: <HomeIcon/> ,
  },
  {
    title: 'clientes',
    path: '/admin/dashboard/clientes',
    icon: <PeopleAltIcon/>,
  },
  {
    title: 'entrenadores',
    path: '/admin/dashboard/entrenadores',
    icon: <SportsKabaddiIcon/>,
  },
  {
    title: 'maquinas',
    path: '/admin/dashboard/maquinas',
    icon: <FitnessCenterIcon/>,
  },
  {
    title: 'productos',
    path: '/admin/dashboard/productos',
    icon: <StoreIcon/>,
  },
  {
    title: 'proveedores',
    path: '/admin/dashboard/proveedores',
    icon: <PeopleAltTwoToneIcon/>,
  },
  {
    title: 'fact. pedidos',
    path: '/admin/dashboard/fact-pedidos',
    icon: <ReceiptTwoToneIcon/>,
  },
  {
    title: 'fact. planes',
    path: '/admin/dashboard/fact-planes',
    icon: <ReceiptTwoToneIcon/>,
  },
  {
    title: 'configuracion',
    path: '/admin/dashboard/configuracion',
    icon: <HandymanRoundedIcon/>,
  }
];

export default navConfig;
