import invisibleFriendsApi from '@/api/apiFriends.js';
import axios from 'axios';
import { useStore } from 'vuex';

export default() =>{

    const createFriend = async({name, lastName, picture, friend, selected = false, active = false, category, firstWish, secondWish, threeWish, fourWish, fiveWish}) =>{
        const dataSave = { name, lastName, picture, friend, selected, active, category, firstWish, secondWish, threeWish, fourWish, fiveWish };
        const { data } = await invisibleFriendsApi.post(`/persons.json`, dataSave)
        dataSave.id = data.name
    }


    const getFriends = async () =>{
        const { data } = await invisibleFriendsApi.get(`/persons.json`)
        const friends = [];
        if(data){
            for(let id of Object.keys( data )){
                friends.push({
                    id,
                    ...data[id]
                })
            }
        }
        return friends;
    }

    const updateFriends = async ({id, name, lastName, picture, friend, selected, active, category, firstWish, secondWish, threeWish, fourWish, fiveWish}) =>{
        const store = useStore();
        const dataToSave = { id, name, lastName, picture, selected, friend, active, category, firstWish, secondWish, threeWish, fourWish, fiveWish };
        await invisibleFriendsApi.put(`/persons/${id}.json`, dataToSave)

        //store.commit('SET_LIST_FRIENDS', {...friend})
    }

    const deleteFriend = async({id, name, lastName, picture, selected, active}) =>{
        const dataToSave = { id, name, lastName, picture, selected, active };
        await invisibleFriendsApi.delete(`/persons/${id}.json`, dataToSave)
    }

    const uploadImage = async (file) =>{
        if (!file) return

        try{
            const formData = new FormData()
            formData.append('upload_preset', 'curso-vue')
            formData.append('file', file)

            const url = 'https://api.cloudinary.com/v1_1/skylab/image/upload'
            const { data } = await axios.post(url, formData)
            return data.secure_url

        }catch(error){
            console.error('Error al cargar la imagen', error)
            return null
        }
    }

    return{
        createFriend,
        getFriends,
        uploadImage,
        updateFriends,
        deleteFriend
    }

}