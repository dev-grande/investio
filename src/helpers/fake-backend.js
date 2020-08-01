// array in local storage for registered users
import { test_data } from "../../data/demo_user"

let users = JSON.parse(localStorage.getItem('users')) || [];
if (!users.find(user => user.id === 12345)) {
    users.push({firstName: "Diana", lastName: "Grande", username: "testuser", password: "testuser", id: 12345})
}

let data = JSON.parse(localStorage.getItem('data')) || [];
if (!data.find(user => user.id === 12345)) {
    data.push(test_data);
}
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.endsWith('/data/upload') && method === 'POST':
                        return uploadData();
                    case url.endsWith('/data') && method === 'GET':
                        return getData();
                    case url.endsWith('/data') && method === 'DELETE':
                        return deleteData();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body;
                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body;
    
                if (users.find(x => x.username === user.username)) {
                    return error(`Username  ${user.username} is already taken`);
                }
    
                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                var initialUserData = {
                    id: user.id,
                    years: [],
                    selected_year: "",
                    data: []
                    //  array of {year: ????, chart_data: {x and y's}, raw_data: = [] or {} ? 
                }
                data.push(initialUserData);
                localStorage.setItem('data', JSON.stringify(data));

                return ok();
            }
    
            function uploadData() {
                const { user_id, parsed_data } = body;
                var user_data;
                data.forEach(function (value, index) {
                    if (value.id === user_id) {
                        user_data = value;
                        user_data.years.push(parsed_data.year);
                        user_data.selected_year = parsed_data.year;
                        user_data.data.push(parsed_data);
                        data[index] = user_data;
                    }
                });
    
                localStorage.setItem('data', JSON.stringify(data));

                return ok(user_data);
            }

            function getData() {
                const user_id = body.user_id;

                if (!isLoggedIn()) return unauthorized();
                var user_data = data.find(user => user.id === user_id);

                return ok(user_data);
            }

            function getUsers() {
                if (!isLoggedIn()) return unauthorized();

                return ok(users);
            }
    
            function deleteUser() {
                if (!isLoggedIn()) return unauthorized();
    
                users = users.filter(x => x.id !== idFromUrl());
                data = data.filter(x => x.id !== idFromUrl());

                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('data', JSON.stringify(data));
                return ok();

                
            }

                
            function deleteData() {
                const { id, year } = body;
                if (!isLoggedIn()) return unauthorized();

                data.forEach(function (value, index) {
                    if (value.id === id) {
                        data[index].years = value.years.filter(yr => yr != year)
                        data[index].data = value.data.filter(x => x.year !== year);

                        if (value.selected_year == year && data[index].years.length > 0) {
                            data[index].selected_year = data[index].years[0];
                        }
                        else {
                            data[index].selected_year = "";
                        }

                        localStorage.setItem('data', JSON.stringify(data));
                        return ok(value);
                    }

                });


            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function isLoggedIn() {
                return headers['Authorization'] === 'Bearer fake-jwt-token';
            }
    
            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    }
}