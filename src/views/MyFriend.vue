<template>
  <div v-if="friend">
      nom: {{ friend.name }}
      <img :src="friend.picture" width="300"/>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import requestFriends from '@/api/requests';
import useAuth from '@/auth/composables/useAuth';
import { ref } from 'vue';

export default {
    name: 'MyFriend',
    setup(){
        const store = useStore();
        const friend = ref(null);
        const { getFriends, updateFriends } = requestFriends();
        const { username } = useAuth();
        
        const getInvisibleFriends = async () =>{
          const friends = await getFriends();
         friend.value = friends.find(friend => friend.friend == username.value)
          friends.forEach(async(inv) =>{
            if(!inv.active){
                if(inv.id == store.getters['getFriendId']){
                    inv.selected = false
                     await updateFriends({id: inv.id, name: inv.name, picture: inv.picture, selected: inv.selected, friend: inv.friend, active: true })
                    store.commit('auth/friendSelect', { friend: inv.friend, user: username.value, active: true })
                    store.commit('UPDATE_FRIENDS', friend)
                 }
            }
          })
        }

        getInvisibleFriends();
        console.log('friend selected =>',  store.getters['auth/friendSelected'])
         

        return{
          friend
        }

    }

}
</script>

<style lang="scss" scoped>

</style>