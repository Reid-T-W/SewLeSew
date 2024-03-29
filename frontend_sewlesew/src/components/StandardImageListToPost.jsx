import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDynamic } from '../contexts/DynamicContext';

export default function StandardImageListToPost({ height }) {
  const { files, setFiles } = useDynamic() 
  const btn={  background: 'None',
               color: '#9c27b0',
               border: 'None',
               borderRadius: '10px',
            }
  const removeFile = (name) => {
    setFiles(files => files.filter(file => file.name !== name))
  }
  return (
    <ImageList sx={{ width: 500, height: height }} cols={3} rowHeight={300}>
      {files.map((item) => (
        <ImageListItem key={item.img} sx={{marginLeft:'5px', marginRight:'5px', paddingTop: '20px'}}>
          <img style={{margin: '5px'}}
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt={item.title}
            loading="lazy"
            onLoad={() =>
              URL.revokeObjectURL(item.img)
          }
          />
          <button style={btn} 
            onMouseEnter={(e) => {e.target.style.color='#DDD5F3'}}
            onMouseLeave={(e) => {e.target.style.color='#9c27b0'}}
            type='button'
            onClick={() => removeFile(item.name)}
          >
            <DeleteOutlineIcon />
          </button>
        </ImageListItem>
        
      ))}
    </ImageList>
  );
}
