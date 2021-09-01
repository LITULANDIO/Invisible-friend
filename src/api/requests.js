import invisibleFriendsApi from '@/api/api.js';
import axios from 'axios';

export default() =>{

    const createFriend = async({name, lastName, picture = "holi"}) =>{
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

    const uploadImage = async (file) =>{
        if (!file) return

        try{
            const formData = new FormData()
            formData.append('upload_preset', 'curso-vue')
            formData.append('file', file)

            const url = 'https://api.cloudinary.com/v1_1/skylab/image/upload'
            const { data } = await axios.post(url, formData)
            console.log('upload image', data)
            return data.secure_url

        }catch(error){
            console.error('Error al cargar la imagen', error)
            return null
        }
    }

    return{
        createFriend,
        getFriends,
        uploadImage
    }

}