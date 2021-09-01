<template>
    <div id="container-form" :class="{open: showMenu}">
        <div class="form-friend">
            <div @click="onClose" class="form-close">
                <img :src="require('@/assets/cancel.svg')" />
            </div>
            <form @submit.prevent.stop="saveFriend">
                <div class="form-name">
                    <input :class="{'border-red': _void}" type="text" placeholder="Name friend" v-model="name">
                </div>
                <div class="form-last-name">
                    <input :class="{'border-red': _void}" type="text" placeholder="Last name friend" v-model="lastName">
                </div>
                <div class="form-upload">
                    <input type="file"
                    @change="onSelectedImage"
                    v-show="false"
                    accept="image/png, image/jpeg"
                    id="file"
                   
                    >
                    <button @click="onSelectImage">Upload image</button>
                </div>
                <div class="form-save">
                    <button type="submit">Guardar</button>
                </div>
            </form>
            <img v-if="localImage" :src="localImage" />
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref, watchEffect } from 'vue';
import requestFriends from '../api/requests';

export default {
    name: 'FormFriends',
    setup(){
        const store = useStore();
        const name = ref('');
        const lastName = ref('');
        const _void = ref(false);
        const localImage = ref(null);
        const fileCloudinary = ref(null);
        const { createFriend, uploadImage } = requestFriends();
        
        
        const saveFriend = async () =>{
            if(!name.value || !lastName.value){
                return _void.value = true;
            }else{
                await createFriend({name: name.value, lastName: lastName.value, picture: fileCloudinary.value})
                name.value = '';
                lastName.value = '';
                localImage.value = null;
            }
        }

        const onSelectedImage = async (event) =>{
            const file = event.target.files[0];

            if(!file){
                localImage.value = null;
                file.value = null;
                return
            }else{
                file.value = file;
                const fr = new FileReader();
                fr.onload = () => localImage.value  = fr.result
                fr.readAsDataURL(file)
                fileCloudinary.value = await uploadImage(file.value);
            }
        }

        const onSelectImage = () =>{
            document.querySelector('#file').click()
        }

        watchEffect(() =>{
            if(name.value && lastName.value) _void.value = false
        })

                     

        return{
            lastName,
            name,
            saveFriend,
            _void,
            onClose: () => store.commit('SET_SHOW_MODAL', false),
            showMenu: computed(() => store.state.show),
            onSelectedImage,
            localImage,
            onSelectImage
        }
    }

}
</script>

<style lang="scss" scoped>
#container-form{
    align-items: center;
    background-color: transparet;
    display: flex;
    margin-top: 15px;
    transform: translateX(-30em);
    transition: transform 0.9s ease;
     &.open{
        transform: translateX(0em);
    }
    .form-friend{
        background-color: #EAEDED;
        border-radius: 10px;
        padding: 25px;
        .form-close {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 15px;
            cursor:pointer;
        }
        form{
            .form-upload, .form-save{
                display: flex;
                justify-content: center;
            }
            input{
                border-radius: 10px;
                margin-bottom: 15px;
                outline: none;
                padding: 10px;
                width: 200px;
            }
            .border-red{
                border: 1px solid red!important;
            }
            button{
                background-color: #212F3D;
                color: #fff;
                margin-bottom: 15px;
                padding: 10px;
                cursor: pointer;
                &:hover{
                    opacity: 0.8;
                }
            }
        }

    }
}

</style>