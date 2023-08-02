import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDynamic } from '../contexts/DynamicContext';

export default function StandardVideoListToPost({ height }) {
  const { videoFiles, setVideoFiles } = useDynamic()
  const btn={  background: 'None',
               color: '#9c27b0',
               border: 'None',
               borderRadius: '10px',
            }
  const removeFile = (name) => {
    setVideoFiles(videoFiles => videoFiles.filter(file => file.name !== name))
  }
  return (
    <ImageList sx={{ width: 500, height: height }} cols={3} rowHeight={300}>
      {videoFiles.map((item) => (
        <ImageListItem key={item.name} sx={{marginLeft:'5px',marginRight:'5px', paddingTop: '20px'}}>
          <video style={{margin: '5px', width: '200px'}}
            src={`${item.video}`}
            srcSet={`${item.video}`}
            alt={item.title}
            loading="lazy"
            onLoad={() =>
              URL.revokeObjectURL(item.video)
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
