import { authHeader } from '../helpers';
const config =  {
    apiUrl: 'http://localhost:4000'
}

export const dataService = {
    getData, 
    parse,
    upload,
    delete: _delete
};

function getData(user_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        body: JSON.stringify({ user_id })
    };

    return fetch(`${config.apiUrl}/data`, requestOptions).then(handleResponse);
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
    var wanted_values =['DATE', 'TRANSACTION ID', 'AMOUNT',  'DESCRIPTION', 'SYMBOL', 'QUANTITY', 'PRICE', 'REG FEE' ];

    
    raw_data.slice(1).forEach(function (value, index) {
        //  DATE,  AMOUNT,  DESCRIPTION, SYMBOL
        var rows = raw_data[index+1].data;

        if (rows && rows.length > 1 ) {
            var data =  rows.reduce(function(data, field, index) {
                data['user_id'] = user_id;
                if (wanted_values.find(val => val === columns[index])  && field) {
                    if (columns[index] === "DESCRIPTION") {
                        data['type'] = "dividend";
                    }
                    else if (columns[index] === "DATE") {
                        var date_array = field.split('/');
                        data['date'] = date_array[2] + "-" + date_array[0] + "-" + date_array[1];
                    }
                    else if (columns[index] === "AMOUNT" || columns[index] === 'TRANSACTION ID') {
                        data[columns[index].toLowerCase().replace(/ /g,"_")] = Number(field);;
                    }
                    else {
                        data[columns[index].toLowerCase().replace(/ /g,"_")] = field;
                    }
                }
                return data;
            }, {});
            full_data.push(data);
        }
    });

    // for (var val in full_data) {
    //     console.log(Object.values(full_data[val]));
    // }

    return { full_data };
}


