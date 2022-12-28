<template>
<Navbar 
  v-if="authStatus == 'authenticated'" 
  :username="username" 
  @onLogout="onLogout"
  @onGoFriend="onGoFriend"/>
  <router-view/>
</template>

<script>
import requestFriends from '@/api/requests';
import { useStore } from 'vuex';
import useAuth from './auth/composables/useAuth';
import Navbar from '@/components/Navbar';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default{
  name: 'App',
  components: { Navbar },
  setup(){
    JSON.parse(localStorage.getItem('vuex')).auth.friend = []
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { getFriends } = requestFriends();
    const { authStatus, checkAuthStatus, username, logout } = useAuth();


    const getInvisibleFriends = async () =>{
        const friends = await getFriends();
        store.commit('SET_LIST_FRIENDS', friends)
        console.log(friends);
    }

    const countWishesforFriend = async () =>{
      const friends = await getFriends();
      let listWishes = [];

      friends.forEach(friend => {
          if(friend.firstWish){
            listWishes.push({wish: friend.firstWish})
          }
      });
      console.log(listWishes.length)

    }

    const onGoFriend = () =>{
      console.log('query', route.query.id)
      router.push({name: 'friend' })
    }

    checkAuthStatus();
    getInvisibleFriends();
    countWishesforFriend();

    return{
     //username: computed(username.value)
     username,
     authStatus,
     onLogout: () => logout(),
     onGoFriend
    }
    

  }
}


</script>

<style lang="scss">
body{
  margin: 0;
}
</style>
