import * as React from 'react';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { Button, Grid, Link, Stack, Typography } from '@mui/material';
import { useDynamic } from '../contexts/DynamicContext';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../utils/getUserData';
import { deletePendingDonation } from '../utils/deletePendingDonation';
import { toast } from 'react-toastify';

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 100 },
  {
    id: 'promised',
    label: 'Promised',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'raised',
    label: 'Raised',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'del',
    label: 'Delete',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  }
];

function createData(id, title, category, promised, raised, edit, del) {
  // const density = population / size;
  return { id, title, category, promised, raised, edit, del };
}


// const editPendingDonation = async() => {

// }
// const deletePendingDonation = async() => {
//   // Get the id of the pending donation

// }

const title = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
const edit = <>
             {/* <Stack direction="row"> */}
              <Button>
                <Edit />
              </Button>
             {/* </Stack> */}
            </>
const del = <>
              {/* <Stack direction="row"> */}
                <Button>
                  <DeleteIcon />
                </Button>
              {/* </Stack> */}
            </>

export default function StickyHeadTableForUserPendingDonations() {
  // Used to navigate to post details
  // when a row is clicked
  const navigate = useNavigate();

  const handleClick = async(pendingDonationId, column, row) => {
    if (column === 'edit') {
      toast('edit clicked')
    }
    else if (column === 'del') {
      const url = `http://localhost:5000/api/v1/pending-donations/${pendingDonationId}`;
      const headers = {"session_id": sessionToken};
      await deletePendingDonation(url, headers)
      .then((response)=>{
        console.log("In here")
        toast.success(response);
      })
      .catch((error) => {
        console.log(error)
        toast.error(error);
      })
    }
    else {
      navigate(`/posts/${row.id}`)
    }
  }

  const {
    sessionToken,
    setSessionToken,
    setUsername,
    userPendingDonations,
    setUserPendingDonations,
    isLoggedIn,
    pendingDonationCounter,
    } = useDynamic();

  // // Lifecycle hook
  // useEffect(() => {
  //   const url = 'http://localhost:5000/api/v1/users/donations';
  //   const headers = {"session_id": sessionToken};
  //   getUserData(url, headers)
  //   .then((response) => { 
  //     setUserDonations(response.data);
  //   })
  //   .catch((error) => { alert(error) });
  //   },[]);
  
  
  // // Importing posts state
  // const {
  //   posts
  // } = useDynamic();

  // Fetching user pending donations from api
  // // Lifecycle hook
  // const fetchUserPendingDonations = async () => {
  //   const url = 'http://localhost:5000/api/v1/users/pending-donations';
  //   const headers = {"session_id": sessionToken};
  //   await getUserData(url, headers)
  //   .then((response) => {
  //     setUserPendingDonations(response.data);
  //   })
  //   .catch((error) => { alert(error) });
  // }
  
  // useEffect(() => {
  //   fetchUserPendingDonations()
  // },[pendingDonationCounter, isLoggedIn])

  // // Saving userDonations to session storage
  // useEffect(() => {
  //   sessionStorage.setItem('userPendingDonations', JSON.stringify(userPendingDonations));
  // }, [userPendingDonations]);

  const rows = userPendingDonations.map((userPendingDonation) => {
    return createData(userPendingDonation.id,
      userPendingDonation.Post.title,
      userPendingDonation.Post.category,
      userPendingDonation.amount,
      `${Math.floor((userPendingDonation.Post.totalRaised / userPendingDonation.Post.amount) * 100)} %`,
      edit,
      del)
  })
  // const rows = [
  //   createData(title, 'IN', 1324171354, 3287263, options),
  // ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                    // <TableRow onClick={()=>{navigate(`/posts/${row.id}`)}} hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} onClick={()=>{handleClick(row.id, column.id, row)}}>
                          {/* // <TableCell key={column.id} align={column.align} onClick={()=>{value === 'modify'? console.log('modify'):console.log('No')}}> */}
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}