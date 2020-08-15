import { authHeader } from '../helpers';
const config =  {
    apiUrl: 'http://localhost:4000'
}

export const dataService = {
    getData, 
    parse,
    upload,
    delete: _delete,
    getStockDiv
};

function getData(user_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/data/${user_id}`, requestOptions).then(handleResponse);
}

function upload(user_id, raw_data) {
    var upload_data = parse(raw_data, user_id);
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ upload_data })
    };

    return fetch(`${config.apiUrl}/data/upload`, requestOptions)
        .then(handleResponse)
        .then(updatedData => {
            return updatedData;
        });
}

function getStockDiv(user_id, symbol) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ user_id, symbol })
    };

    return fetch(`${config.apiUrl}/data/dividend`, requestOptions)
        .then(handleResponse)
        .then(updatedData => {
            var new_data = updatedData;
            new_data.selected_stock = symbol;
            return new_data;
        });
}

getStockDiv(1, 'KO');

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, year) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify({ id, year })
    };

    return fetch(`${config.apiUrl}/data`, requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });

}



function parse(raw_data, user_id) {

    var columns = raw_data[0].data;
    var full_data = [];

    raw_data.slice(1).forEach(function (value, index) {
        var rows = raw_data[index+1].data;

        if (rows && rows.length > 1 ) {
            var data =  rows.reduce(function(data, field, index) {
                data['user_id'] = user_id;
                if (field) {
                    if (columns[index] === "DESCRIPTION") {
                        if (field.includes("DIVIDEND") || field.includes("Dividend")) {
                            data['type'] = "dividend";
                        }
                        else if (field.includes("Bought")) {
                            data['type'] = "buy";
                        }
                        else if (field.includes("Sold")) {
                            data['type'] = "sell";
                        }
                        else if (field.includes("CHECK RECEIPT")) {
                            data['type'] = "deposit";
                        }
                        else if (field.includes("MISC")) {
                            data['type'] = "misc";
                        }
                        else if (field.includes("REDEMPTION")) {
                            data['type'] = "redemption";
                        }
                        else if (field.includes("TRANSFER")) {
                            data['type'] = "transfer";
                        }
                        else {
                            data['type'] = "other";
                        }
                    }
                    else if (columns[index] === "DATE") {
                        var date_array = field.split('/');
                        data['date'] = date_array[2] + "-" + date_array[0] + "-" + date_array[1];
                    }
                    else  if (columns[index] === 'SYMBOL'){
                        data[columns[index].toLowerCase().replace(/ /g,"_")] = field;
                    }
                    else if (data['type'] === "sell" && columns[index] === 'QUANTITY'){
                        data[columns[index].toLowerCase().replace(/ /g,"_")] = -1*Number(field);;
                    }
                    else {
                        data[columns[index].toLowerCase().replace(/ /g,"_")] = Number(field);;
                    }
                }
                 return data;
            }, {});
            full_data.push(data);
        }
    });

    return { full_data };
}


