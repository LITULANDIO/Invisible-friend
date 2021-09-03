<template>
<div class="container">
  <div class="target-friend" v-for="friend in friends" :key="friend.id" >
      <!-- <h1>{{ friend.name }}</h1> -->
      <div class="picture-invisible">
      <img 
            :src="friend.picture" 
            :alt="friend.name" 
            :id="friend.id" 
            :class="isCardSelected(friend.selected)? 'visible' : 'hidden'"
            width="200" height="300"
        />        
        <img :id="friend.id" :src="require('@/assets/question.svg')" @click="showCardFriend(friend)" />
      </div>

  </div>
</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import requestsFriends from '../api/requests';

export default {
    name: 'ListFriends',
    props:{
        friends:{
            type: Array,
            required: true
        }
    },
    setup(props, {emit}){
        const router = useRouter()
        const store = useStore();
        const { updateFriends } = requestsFriends();

        const isCardSelected = (isFriend) =>{
           return isFriend;

        }
        const showCardFriend = async (friend) =>{

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

        return{
        showCardFriend,
        isCardSelected
        }
    }

}
</script>

<style lang="scss" scoped>
.visible{
    display: block !important;
    border-radius: 20px;
    width: 100%;

}
.hidden{
    filter: brightness(0);
    width: 100%;
    cursor: pointer;
    border-radius: 20px;
}
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
        }
    }
}


</style>