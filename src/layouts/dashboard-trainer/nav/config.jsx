import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


const navConfig = [
  {
    title: 'dashboard',
    path: '/entrenador/dashboard/home',
    icon: <HomeIcon/> ,
  },
  {
    title: 'clientes',
    path: '/entrenador/dashboard/clientes',
    icon: <PeopleAltIcon/>,
  },
  {
    title: 'musculos',
    path: '/entrenador/dashboard/musculos',
    icon: <SportsGymnasticsIcon/>,
  },
  {
    title: 'ejercicios',
    path: '/entrenador/dashboard/ejercicios',
    icon: <FitnessCenterIcon/>,
  },
  {
    title: 'rutinas',
    path: '/entrenador/dashboard/rutinas',
    icon: <AssignmentTurnedInIcon/>,
  },
  {
    title: 'configuracion',
    path: '/entrenador/dashboard/configuracion',
    icon: <HandymanRoundedIcon/>,
  }
];

export default navConfig;
