import { Paper, IconButton, Stack, TextField, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDynamic } from '../contexts/DynamicContext';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const { 
        searchTerm,
        setSearchTerm } = useDynamic();
    
    const search = () => {
        console.log(searchTerm)
    }
    
    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase onChange={ (e)=>{ setSearchTerm(e.target.value) }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Posts"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
            onClick={ search }>
          <SearchIcon sx={{ color: '#9c27b0' }}/>
        </IconButton>
      </Paper>
    )
}
export default SearchBar

    //     <>
    //         <TextField onChange={ (e)=>{ setSearchTerm(e.target.value) }} sx={{ width: "400px" }} label='Search' placeholder='Search' fullWidth required/>
    //     </>