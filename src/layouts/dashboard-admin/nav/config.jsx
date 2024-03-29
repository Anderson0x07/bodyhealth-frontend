import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import StoreIcon from '@mui/icons-material/Store';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';


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
    title: 'planes',
    path: '/admin/dashboard/planes',
    icon: <AssignmentIcon/>,
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
    title: 'musculos',
    path: '/admin/dashboard/musculos',
    icon: <SportsGymnasticsIcon/>,
  },
  {
    title: 'ejercicios',
    path: '/admin/dashboard/ejercicios',
    icon: <FitnessCenterIcon/>,
  },
  {
    title: 'rutinas',
    path: '/admin/dashboard/rutinas',
    icon: <AssignmentTurnedInIcon/>,
  },
  {
    title: 'métodos de pago',
    path: '/admin/dashboard/metodospago',
    icon: <PaymentTwoToneIcon/>,
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
    title: 'horarios',
    path: '/admin/dashboard/horarios',
    icon: <PaymentTwoToneIcon/>,
  },
  {
    title: 'configuracion',
    path: '/admin/dashboard/configuracion',
    icon: <HandymanRoundedIcon/>,
  }
];

export default navConfig;
