import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSVReader } from 'react-papaparse'
import { Button } from 'react-bootstrap'
import { dataActions } from '../reducers/actions';

const buttonRef = React.createRef()

function handleOnError(err){
  console.log(err)
}

function handleOpenDialog(e){
  // Note that the ref is set async, so it might be null at some point 
  if (buttonRef.current) {
    buttonRef.current.open(e)
  }
}


export function CSVUploader() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user.id);
    return (
      <CSVReader
      ref={buttonRef}
      
      onFileLoad={(data) => dispatch( dataActions.uploadData(user, data) )}
      onError={e => handleOnError(e.err, e.file, e.inputElem, e.reason)}
      noClick
      noDrag
      noProgressBar
    >
      {() => (
         <Button variant="info" onClick={(e) => handleOpenDialog(e)}>
           Upload
         </Button>
       )}
    </CSVReader>  )
}