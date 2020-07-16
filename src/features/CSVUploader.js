import React from 'react'
import { useDispatch } from 'react-redux'
import { CSVReader } from 'react-papaparse'
import { parse } from './chartDataSlice'
import { Button } from 'react-bootstrap'

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

export function CSVUploader() {
    const dispatch = useDispatch()
    return (
      <CSVReader
      ref={buttonRef}
      onFileLoad={(data, fileInfo) => dispatch(parse(data))}
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
}