import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { StandardImageListToPost } from '.'
import { useDynamic } from '../contexts/DynamicContext';
import { Typography } from '@mui/material';

const Dropzone = () => {
  const { files, setFiles } = useDynamic()
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
        setFiles(previousFiles => [
            ...previousFiles,
            ...acceptedFiles.map(file =>
                Object.assign(file, { img: URL.createObjectURL(file), title: file.name })
            )
        ])
    }
  },[])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
        'image/*': []
    }
})

  return (
    <form>
        <div {...getRootProps(
            {className: 'upload-container'}
        )}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the images here ...</p>
            ) : (
                <p>Drag and drop some images here, or click to select files</p>
            )}
        </div>
        <Typography variant="subtitle" component="div" sx={{ flexGrow: 1 }}>
            {files && <span class="gray-color logo" >Accepted Images</span>}
        </Typography>
        { files.length !== 0 && <StandardImageListToPost height={250}/>}
    </form>
  )
}

export default Dropzone