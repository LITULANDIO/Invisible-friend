import axios from 'axios';

const authFriendsApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key: 'AIzaSyDbe8Er7VelXFe40wt6lt32rHr8ZzOZuBY'
    }
});

export default authFriendsApi;