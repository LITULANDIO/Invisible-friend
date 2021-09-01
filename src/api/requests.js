import invisibleFriendsApi from '@/api/api.js';

export default() =>{

    const createFriend = async({name, lastName, picture}) =>{
        const dataSave = { name, lastName, picture };
        const { data } = await invisibleFriendsApi.post(`/persons.json`, dataSave)
        dataSave.id = data.name
    }


    const getFriends = async () =>{
        const { data } = await invisibleFriendsApi.get(`/persons.json`)
        const friends = [];
        for(let id of Object.keys( data )){
            friends.push({
                id,
                ...data[id]
            })
        }
        return friends;
    }

    return{
        createFriend,
        getFriends
    }

}