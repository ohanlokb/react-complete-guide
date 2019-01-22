import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-bc09f.firebaseio.com'
});


// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN - INSTANCE';

// instance.interceptors.request.use(request => {
//     console.log(request);
//     return request;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });

// instance.interceptors.response.use(response => {
//     console.log(response);
//     return response;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });


export default instance;