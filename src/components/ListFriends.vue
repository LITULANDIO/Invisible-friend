<template>
<div class="container">
    <template  v-for="friend in friends" :key="friend.id">
        <div class="target-friend" v-if="friend.category === category" >
            <!-- <h1>{{ friend.name }}</h1> -->
            <div class="picture-invisible">
            <img 
                    :src="friend.picture" 
                    :alt="friend.name" 
                    :id="friend.id" 
                    :class="isCardSelected(friend.selected)? 'show-friend' : 'hide-friend'"
                    width="200" height="300"
                />        
                <img 
                    v-if="!friend.active"
                    :class="[isCardSelected(friend.selected)? 'hide-svg' : 'show-svg']" 
                    :id="friend.id" 
                    :src="require('@/assets/question.svg')" 
                    @click="showCardFriend(friend)" 
                />
                <img v-else :src="require('@/assets/cancels.svg')"  width="180" height="180"/>
            </div>
        </div>
    </template>
<Modal v-if="showModal" @onAcceptFriend="onAcceptFriend" />
</div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import requestsFriends from '../api/requests';
import Modal from '@/components/Modal';
import useAuth from '../auth/composables/useAuth';
import Swal from 'sweetalert2';


export default {
    name: 'ListFriends',
    components:{ Modal },
    props:{
        friends:{
            type: Array,
            required: true
        },
        category:{
            type: String,
            required: true
        }
    },
    setup(props, {emit}){
        const router = useRouter();
        const route = useRoute()
        const store = useStore();
        const showModal = ref(false);
        const { getFriends ,updateFriends, deleteFriend } = requestsFriends();
        const { username } = useAuth();


        const isCardSelected = (isFriend) =>{
           return isFriend;
        }
        const isCardActive =(isActive) =>{
            return isActive;
        }

        const isSelectedFriend = async (category) =>{
        const friendSelected = await store.getters['auth/friendSelected'];
            let isSelected = false;
            if(friendSelected){
             friendSelected.forEach(sel =>{
                   if(username.value == sel.user && sel.category === category){
                       isSelected = sel.active;
                   }
               })
            }
            console.log({isSelected})
            return isSelected;
        }
     
        const showCardFriend = async (friend) =>{
           // showModal.value = true;
            router.push({name: 'home', query:{ id: friend.id }})
            props.friends.forEach(async(inv) =>{
                if(friend.id === inv.id){
                    if(friend.name === username.value ){
                        Swal.fire('Oops...', 'No et pots seleccionar a tu mateix, torna-ho a intentar', 'warning')
                    }else if(await isSelectedFriend('reis') === true && friend.category === 'reis'){
                         Swal.fire({
                            title: 'Oops...',
                            icon: 'warning',
                            html: `Ja has escollit el teu amic invisble de Reis`,
                            })
                     }else if(await isSelectedFriend('nadal') === true && friend.category === 'nadal'){
                         Swal.fire({
                            title: 'Oops...',
                            icon: 'warning',
                            html: `Ja has escollit el teu amic invisble de Nadal `,
                            })
                    }else{
                         Swal.fire({
                            title: 'Genial',
                            icon: 'success',
                            html: `Has escollit al teu amic invisible, pots veure més detall al teu perfil `,
                            }).then((result) =>{
                                if (result.isConfirmed) {
                                    router.push({name: 'friend' })
                                }
                            })

                        await updateFriends({
                            id:inv.id,
                            name: inv.name, 
                            picture: inv.picture, 
                            selected: inv.selected, 
                            friend: username.value, 
                            active: inv.active, 
                            category: inv.category,
                            firstWish: inv.firstWish, 
                            secondWish: inv.secondWish, 
                            threeWish: inv.threeWish, 
                            fourWish: inv.fourWish, 
                            fiveWish: inv.fiveWish

                        })
                       store.commit('UPDATE_FRIENDS', friend)
                       store.commit('SET_FRIEND_ID',inv.id )
                    }
                  }
            })
        }

        const onAcceptFriend = async () =>{
            //router.push({name: 'accept'})
            router.push({name: 'friend'})
           props.friends.filter(async(friend) =>{
                if(friend.selected){
                    console.log('entra per eliminar')
                    // await deleteFriend(
                    //     {
                    //         id: friend.id, 
                    //         name: friend.name, 
                    //         lastName: friend.lastName, 
                    //         picture: friend.picture, 
                    //         selected: friend.selected 
                    //     })
                getInvisibleFriends();
                }
            })
            if(route.query.id) return route.query.id = '';
            showModal.value = false;
        }

         const getInvisibleFriends = async () =>{
            const friends = await getFriends();
            store.commit('SET_LIST_FRIENDS', friends)
        }   

        watch(() =>{
            isSelectedFriend();
        });
    

        return{
        showCardFriend,
        isCardSelected,
        showModal,
        onAcceptFriend,
        username
        }
    }

}
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    justify-content: center;
    padding: 30px;
    align-items: center;
    flex-wrap: wrap;
    .target-friend{
        background: rgba(117, 124, 133, 0.54 / 50%);
        border-radius: 20px;
        width: 300px;
        height: 300px;
        text-align: center;
        margin: 10px 10px 10px 10px;
        box-shadow: 0 7px 17px 0 rgba(117, 124, 133, 0.54);
        .picture-invisible{
            display: flex;
            justify-content: center;
            align-items:center;
            flex-wrap: wrap;
            
             img:nth-child(2){
                z-index: 999;
                position: relative;
                width: 200px;
                position: absolute;
            }
            .show-friend{
                display: block !important;
                border-radius: 20px;
                width: 100%;

            }
            .hide-friend{
                filter: brightness(0);
                width: 100%;
                border-radius: 20px;
                opacity: 0.9;
            }
            .show-svg{
                display: block;
                cursor: pointer;
                width: 100%;
            }
            .hide-svg{
                display: none;
            }
            .disable-picture{
                opacity: 0.5;
                pointer-events: none;
            }
        }
    }
}


</style>