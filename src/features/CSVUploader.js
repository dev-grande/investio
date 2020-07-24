import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSVReader } from 'react-papaparse'
// import { parse } from '../reducers/chartDataSlice'
import { Button } from 'react-bootstrap'

// import { dataService } from "../services/data.service"
import { dataActions } from '../reducers/actions';

const buttonRef = React.createRef()

function handleOnError(err, file, inputElem, reason){
  console.log(err)
}

function handleOpenDialog(e){
  // Note that the ref is set async, so it might be null at some point 
  if (buttonRef.current) {
    buttonRef.current.open(e)
  }
}

// onFileLoad={(data, fileInfo) => dispatch(parse(data))}

export function CSVUploader() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user.id);
    return (
      <CSVReader
      ref={buttonRef}
      
      onFileLoad={(data, fileInfo) => dispatch( dataActions.uploadData(user, data) )}
      onError={e => handleOnError(e.err, e.file, e.inputElem, e.reason)}
      noClick
      noDrag
      noProgressBar
    >
      {({ file }) => (
         <Button variant="info" onClick={(e) => handleOpenDialog(e)}>
           Upload
         </Button>
       )}
    </CSVReader>  )
};