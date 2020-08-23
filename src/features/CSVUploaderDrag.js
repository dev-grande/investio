import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSVReader } from 'react-papaparse'
import { dataActions } from '../reducers/actions';

function handleOnError(err){
  console.log(err)
}

function handleOnRemoveFile(data){
  // console.log('---------------------------')
  // console.log(data)
  // console.log('---------------------------')
}

function handleUpload(user_id, data, dispatch)
{
  dispatch( dataActions.uploadData(user_id, data) );
  dispatch(dataActions.getYears(user_id));
}

export function CSVUploaderDrag() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user.id);

    return (
      <div>
      <CSVReader
        onDrop={data => handleUpload(user, data, dispatch)}
        onError={e => handleOnError(e.err, e.file, e.inputElem, e.reason)}
        addRemoveButton
        onRemoveFile={data => handleOnRemoveFile(data)}
      >
        <span>Drop CSV file here to upload.</span>
      </CSVReader>
      </div>
    )
  
}