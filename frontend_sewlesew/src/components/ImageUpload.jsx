import React, { useState } from 'react'
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { useDynamic } from "../contexts/DynamicContext";

const uploader = Uploader({ apiKey: "public_W142hox9pRsEr3S9Hgu1oC8hMao3" });
const uploaderOptions = {
  multi: false,
  styles: {
    colors: {
      primary: "#377dff"
    }
  }
}

// --------------------------
// Create an upload button...
// --------------------------

const MyUploadButton = ({setFiles, message}) =>
  <UploadButton uploader={uploader}
                options={uploaderOptions}
                onComplete={setFiles}>
    {({onClick}) =>
      <button onClick={onClick}>
        {message}
      </button>
    }
  </UploadButton>

// -----------------------------
// Display the uploaded files...
// -----------------------------

const MyUploadedFiles = ({files,
                          message,
                          setImageNewPost,
                          setVideoNewPost,
                          setDocumentNewPost}) => files.map(file => {
    // Tip: save 'filePath' to your DB (not 'fileUrl').
    const filePath = file.filePath 
    const fileUrl  = uploader.url(filePath, "raw") // "raw" for un-transformed file.
    return (
      <p key={fileUrl}>
        <a href={fileUrl} target="_blank">{fileUrl}</a>
        {message==="Upload an image ..."?setImageNewPost(fileUrl):null}
        {message==="Upload a video ..."?setVideoNewPost(fileUrl):'https://upcdn.io/W142hox/raw/uploads/2023/04/25/sample_video-6Wht.mp4'}
        {message==="Upload a document ..."?setDocumentNewPost(fileUrl):'https://upcdn.io/W142hox/raw/uploads/2023/04/25/TestTextFile.txt'}
      </p>
    );
  })

const ImageUpload = ({message}) => {
    const {
        setImageNewPost,
        setVideoNewPost,
        setDocumentNewPost,
        // imageNewPost,
        // videoNewPost
    } = useDynamic();
    const [files, setFiles] = useState([])
    return (
        <>    
            {files.length 
                ? <MyUploadedFiles files={files}
                                   message={message}
                                   setImageNewPost={setImageNewPost}
                                   setVideoNewPost={setVideoNewPost}
                                   setDocumentNewPost={setDocumentNewPost}/> 
                : <MyUploadButton setFiles={setFiles} message={message}/>
            }
        </>
    )
}

export default ImageUpload