import React from 'react'
import { useDispatch } from 'react-redux'
import { CSVReader } from 'react-papaparse'
import { parse } from './chartDataSlice'

function handleOnError(err, file, inputElem, reason){
  console.log(err)
}

function handleOnRemoveFile(data){
  console.log('---------------------------')
  console.log(data)
  console.log('---------------------------')
}

export function CSVUploaderDrag() {
    const dispatch = useDispatch();
    return (
      <div>
      <CSVReader
        onDrop={data => dispatch(parse(data))}
        onError={e => handleOnError(e.err, e.file, e.inputElem, e.reason)}
        addRemoveButton
        onRemoveFile={data => handleOnRemoveFile(data)}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      </div>
    )
  
}