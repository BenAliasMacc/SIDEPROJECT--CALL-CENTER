import React from 'react';
import '../styles/mainTable.scss'
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const columns = [
  { 
    field: 'id', 
    headerName: 'Identifiant', 
    flex: 1,
    renderCell: (params) => (<Link to={`${params.value}`}>{params.value}</Link>)
  },
  { field: 'name', headerName: 'Prénom', flex: 1 },
  { field: 'username', headerName: 'Nom', flex: 1 },
  { field: 'company', headerName: 'Société', flex: 1 },
  { field: 'phone', headerName: 'Téléphone', flex: 1 },
  { 
    field: 'email', 
    headerName: 'Email', 
    flex: 2,
    renderCell: (params) => (<a href={`mailto:${params.value}`}>{params.value}</a>)
  },
  { 
    field: 'website', 
    headerName: 'Lien', 
    flex: 2,
    renderCell: (params) => (<a href={`${params.value}`}>{params.value}</a>)
      
  }
];

//----------------Mocked Data-------------------------------
const rows = [
  { id: 176360950 , name: 'REVAH', username: 'ROMAIN', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360951 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://google.com'},
  { id: 176360952 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://twitter.com'},
  { id: 176360953 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://facebook.com'},
  { id: 176360954 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://mui.com'},
  { id: 176360955 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
  { id: 176360956 , name: 'REVAH', username: 'MICKAEL', company: 'CARS DE FRANCE', phone: '054 444 3212' , email: 'michael@cars-de-france.com', website: 'https://client.cars-de-france.com/admin#'},
];
//-----------------------------------------------------

export default function QuickFilteringCustomizedGrid() {

  return (
    <>
      {/* {users !== undefined && */}
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            sx={{ color: 'white' }}
            // rows={users}
            rows={rows}
            columns={columns}
            pageSize={10}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            components={{ 
              Toolbar: GridToolbar, 
              Pagination: CustomPagination
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
      {/* } */}
    </>
  );
}