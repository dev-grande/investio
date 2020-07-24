// import { userConstants } from '../constants';
import { dataService } from '../../services';
import { alertActions } from '.';
import { findNonSerializableValue } from '@reduxjs/toolkit';

export const dataActions = {
    getAllData,
    uploadData,
    selectYear
};

function uploadData(user_id, raw_data) {
    return dispatch => {

        dataService.upload(user_id, raw_data)
            .then(
                updatedData => dispatch(update(updatedData)),
                error => {
                    console.log("error:  getAllData failed")
                }
            );
    };

    function update(data) { return { type: "UPLOAD_SUCCESS", data } }
}

function selectYear(selected_year) {
    return dispatch => {
        dispatch(select(selected_year))
    };

    function select(selected_year) { return { type: "SELECT_YEAR", selected_year } }
}


function getAllData(user_id) {
    return dispatch => {
        // dispatch(request());

        dataService.getData(user_id).then(
            data => dispatch(update(data)),
            error => {
                console.log("error:  getAllData failed")
            }
        );
    };

    // function request() { return { type: userConstants.GETALL_REQUEST } }
    function update(data) { 
        console.log(data);
        return { type: "GETALL_SUCCESS", data }; }
    // function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
