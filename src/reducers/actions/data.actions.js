import { dataService } from '../../services';

export const dataActions = {
    getAllData,
    uploadData,
    delete: _delete,
    getStockDiv
};

function uploadData(user_id, raw_data) {
    return dispatch => {

        dataService.upload(user_id, raw_data)
            .then(
                updatedData => {

                    console.log(updatedData);
                },
                error => {
                    console.log("error:  getAllData failed")
                }
            );
    };

    // function update(data) { return { type: "UPLOAD_SUCCESS", data } }
}

function getStockDiv(user_id, symbol) {
    return dispatch => {
        dispatch(request());

        dataService.getStockDiv(user_id, symbol).then(
            data => {
                dispatch(update(data));
            },
            error => {
                console.log("error:  getAllData failed")
            }
        );
    };

    function request() { return { type: "GET_STOCK_DIV_REQUEST" } }
    function update(data) { 
        return { type: "GET_STOCK_DIV_SUCCESS", data }; }
    // function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAllData(user_id) {
    return dispatch => {
        dispatch(request());

        dataService.getData(user_id).then(
            data => dispatch(update(data)),
            // error => {
            //     console.log("error:  getAllData failed")
            // }
        );
    };

    function request() { return { type: "GETALL_REQUEST" } }
    function update(data) { 
        return { type: "GETALL_SUCCESS", data }; }
    // function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}


function _delete(id, year) {
    console.log("deleting " + year);
    return dispatch => {
        dataService.delete(id, year)
            .then(
                data => {
                    dispatch(update(data))
                }
                // error => console.log("error:  delete data failed")
            );
    };

    function update(data) { 
        return { type: "DELETION_SUCCESS", data }; }
}
