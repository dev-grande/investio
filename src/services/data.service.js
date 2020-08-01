import config from 'config';
import { authHeader } from '../helpers';

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
    var parsed_data = parse(raw_data);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, parsed_data })
    };

    return fetch(`${config.apiUrl}/data/upload`, requestOptions)
        .then(handleResponse)
        .then(updatedData => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(user));
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

function parse(raw_data) {
    console.log("parsing raw_data");
    console.log(raw_data);

    var columns = raw_data[0].data;

    var xy_data = Array(12);
    var full_data = [];
    var chart_data = []
    var year = "";
    var wanted_values =['DATE',  'AMOUNT',  'DESCRIPTION', 'SYMBOL'];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var current_month = "";
    

    
    raw_data.slice(1).forEach(function (value, index) {
        //  DATE,  AMOUNT,  DESCRIPTION, SYMBOL
        var rows = raw_data[index+1].data;
        
        if (rows && rows.length > 1 )
        {
            var data =  rows.reduce(function(data, field, index) {
                if (wanted_values.find(val => val === columns[index])  && field) {
                    if (columns[index] === "DATE") {
                        var month_index = Number(field.substring(0,2)) - 1;
                        current_month = month_index 
                        year = field.substring(6,10);
                    }
                    if (columns[index] === "AMOUNT") {
                        if (xy_data[current_month]){
                            xy_data[current_month].y += Number(field); 
                        }
                        else {
                            xy_data[current_month] = {"x": months[current_month], "y": Number(field) };
                        }

                    }
                    data[columns[index]] = field;
                }
                return data;
            }, {});

            full_data.push(data);
        }
    });

    var val = {};
    val["id"] = year;
    val["color"] = "hsl(30, 96%, 52%)";
    var filtered_xy = xy_data.filter(function (el) {
        return el != null;
      });
    val["data"] = filtered_xy;
    chart_data.push(val);

    return { year, chart_data, full_data };
}


