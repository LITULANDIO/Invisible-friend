<template>
  <router-view/>
</template>

<script>
import requestFriends from '@/api/requests';
import { useStore } from 'vuex';
import useAuth from './auth/composables/useAuth';

export default{
  name: 'App',
  setup(){
    const store = useStore();
    const { getFriends } = requestFriends();
    const { authStatus, checkAuthStatus } = useAuth();


    const getInvisibleFriends = async () =>{
        const friends = await getFriends();
        store.commit('SET_LIST_FRIENDS', friends)
        console.log(friends);
    }

    checkAuthStatus();
    getInvisibleFriends();

    return{

    }
    

  }
}


</script>

<style lang="scss">

</style>
