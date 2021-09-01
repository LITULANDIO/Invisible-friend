import axios from 'axios';

const invisibleFriendsApi = axios.create({
    baseURL: 'https://friend-invisible-default-rtdb.europe-west1.firebasedatabase.app'
});

export default invisibleFriendsApi;