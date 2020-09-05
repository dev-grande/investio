import { dataService } from '../../services';

export const dataActions = {
    getDashboardData,
    getReportsData,
    uploadData,
    getYears,
    deleteYear,
    getStockDiv,
    getPortfolios,
    addPortfolio,
    deletePortfolio
};

function uploadData(user_id, raw_data, portfolio) {
    return dispatch => {
        dataService.upload(user_id, raw_data, portfolio)
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

function addPortfolio(user_id, portfolio) {
    return dispatch => {
        dataService.addPortfolio(user_id, portfolio)
            .then(
                updatedData => {
                    console.log(portfolio)
                    dispatch(update(portfolio));
                },
                error => {
                    console.log(error + "error:  getAllData failed")
                }
            );
    };
    function update(data) { return { type: "ADD_PORTFOLIO_SUCCESS", portfolio } 
}
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
}


function getDashboardData(user_id, portfolio) {
    return dispatch => {
        dispatch(request());

        dataService.getDashboardData(user_id, portfolio)            
        .then(data => {
                dispatch(update(data))
        }
            // error => console.log("error:  delete data failed")
        );
    };

    function request() { return { type: "GET_DASHBOARD_REQUEST" } }
    function update(data) { 
        return { type: "GET_DASHBOARD_SUCCESS", data }; }
}

function getReportsData(user_id) {
    return dispatch => {
        dispatch(request());

        dataService.getReportsData(user_id)            
        .then(data => {
                dispatch(update(data))
            }
            // error => console.log("error:  delete data failed")
        );
    };

    function request() { return { type: "GET_REPORTS_REQUEST" } }
    function update(data) { 
        return { type: "GET_REPORTS_SUCCESS", data }; }
    // function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getPortfolios(user_id) {
    return dispatch => {
        dataService.getPortfolios(user_id)            
        .then(data => {
                dispatch(update(data))
            }
        );
    };
    function update(data) { 
        return { type: "GET_PORTFOLIOS_SUCCESS", data }; }
}

function getYears(user_id, portfolio) {
    return dispatch => {
        dataService.getYears(user_id, portfolio)            
        .then(data => {
                dispatch(update(data))
            }
        );
    };
    function update(data) { 
        return { type: "GET_YEARS_SUCCESS", data }; }}


function deleteYear(id, year, portfolio) {
    return dispatch => {
        dataService.deleteYear(id, year, portfolio)
            .then(
                resp => {
                    dispatch(success(year)) },
            );
    };
    function success(year) { return { type: "DELETE_YEAR_SUCCESS", year } }
}

function deletePortfolio(id, portfolio) {
    return dispatch => {
        dataService.deletePortfolio(id, portfolio)
            .then(
                resp => {
                    dispatch(success(portfolio)) },
            );
    };
    function success(year) { return { type: "DELETE_PORTFOLIO_SUCCESS", portfolio } }
}