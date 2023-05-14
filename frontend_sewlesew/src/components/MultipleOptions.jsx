import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React from 'react'
import { useDynamic } from '../contexts/DynamicContext';

const MultipleOptions = ({category, options}) => {
  const {
    setCategoryNewPost,
    categoryNewPost,
} = useDynamic();
  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
            labelId="select-label"
            id="simple-select"
            value={categoryNewPost}
            label="Category"
            onChange={(e)=>{setCategoryNewPost(e.target.value)}}
        >
    {options.map((option) => {
        return (
            <MenuItem value={option}>{option}</MenuItem>
        )
    })}
    {/* // <MenuItem value={10}>{options[0]}</MenuItem>
    // <MenuItem value={20}>Twenty</MenuItem>
    // <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>
</FormControl>
  )
}

export default MultipleOptions