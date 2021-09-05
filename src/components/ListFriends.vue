<template>
<div class="container">
  <div class="target-friend" v-for="friend in friends" :key="friend.id" >
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
            :class="isCardSelected(friend.selected)? 'hide-svg' : 'show-svg'" 
            :id="friend.id" 
            :src="require('@/assets/question.svg')" 
            @click="showCardFriend(friend)" 
        />
      </div>
  </div>
<Modal v-if="showModal" @onAcceptFriend="onAcceptFriend" />
</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import requestsFriends from '../api/requests';
import Modal from '@/components/Modal';


export default {
    name: 'ListFriends',
    components:{ Modal },
    props:{
        friends:{
            type: Array,
            required: true
        }
    },
    setup(props, {emit}){
        const router = useRouter();
        const route = useRoute()
        const store = useStore();
        const showModal = ref(false);
        const { getFriends ,updateFriends, deleteFriend } = requestsFriends();

        const isCardSelected = (isFriend) =>{
           return isFriend;
        }
     
        const showCardFriend = async (friend) =>{
            showModal.value = true;
            router.push({name: 'home', query:{ id: friend.id }})

            props.friends.forEach(async(inv) =>{
                if(friend.id === inv.id){
                    inv.selected = true
                     await updateFriends({id:inv.id,name: inv.name, picture: inv.picture, selected: inv.selected})
                    store.commit('UPDATE_FRIENDS', friend)
                }else{
                    inv.selected = false
                     await updateFriends({id:inv.id,name: inv.name, picture: inv.picture, selected: inv.selected})
                    store.commit('UPDATE_FRIENDS', friend)
                }
            })
        }

        const onAcceptFriend = async () =>{
            //router.push({name: 'accept'})
           props.friends.filter(async(friend) =>{
                if(friend.selected){
                    console.log('entra per eliminar')
                    await deleteFriend(
                        {
                            id: friend.id, 
                            name: friend.name, 
                            lastName: friend.lastName, 
                            picture: friend.picture, 
                            selected: friend.selected 
                        })
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

        return{
        showCardFriend,
        isCardSelected,
        showModal,
        onAcceptFriend
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
        }
    }
}


</style>