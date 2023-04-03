import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// ----------------------------------------------------------------------

const Busqueda = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

TableBuscar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

function TableBuscar({ filterName, onFilterName }) {
  return (

        <Busqueda
          value={filterName}
          onChange={onFilterName}
          placeholder="Buscar..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          }
        />
      
  );
}

export default TableBuscar;