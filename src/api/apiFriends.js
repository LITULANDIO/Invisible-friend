import axios from 'axios';

const invisibleFriendsApi = axios.create({
    baseURL: 'https://friend-invisible-default-rtdb.europe-west1.firebasedatabase.app',

});

// invisibleFriendsApi.interceptors.request.use((config) =>{
//     config.params = {
//         auth: localStorage.getItem('idToken')
//     }

//     return config
// })


export default invisibleFriendsApi;