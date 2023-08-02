import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { StandardImageListToPost, StandardVideoListToPost } from '.'
import { useDynamic } from '../contexts/DynamicContext';
import { Typography } from '@mui/material';

const Dropzone = () => {
  const { videoFiles, setVideoFiles } = useDynamic()
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
        setVideoFiles(previousFiles => [
            ...previousFiles,
            ...acceptedFiles.map(file =>
                Object.assign(file, { video: URL.createObjectURL(file), title: file.name })
            )
        ])
    }
  },[])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
        'video/*': []
    }
})

  return (
    <form>
        <div {...getRootProps(
            {className: 'upload-container'}
        )}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the video here ...</p>
            ) : (
                <p>Drag and drop the video here, or click to select file</p>
            )}
        </div>
        <Typography variant="subtitle" component="div" sx={{ flexGrow: 1 }}>
            {videoFiles && <span class="gray-color logo" >Accepted Video</span>}
        </Typography>
        { videoFiles.length !== 0 && <StandardVideoListToPost height={250}/>}
    </form>
  )
}

export default Dropzone