<template>
<Navbar v-if="authStatus == 'authenticated'" :username="username" @onLogout="onLogout"/>
  <router-view/>
</template>

<script>
import requestFriends from '@/api/requests';
import { useStore } from 'vuex';
import useAuth from './auth/composables/useAuth';
import Navbar from '@/components/Navbar';
import { computed } from 'vue';

export default{
  name: 'App',
  components: { Navbar },
  setup(){
    const store = useStore();
    const { getFriends } = requestFriends();
    const { authStatus, checkAuthStatus, username, logout } = useAuth();


    const getInvisibleFriends = async () =>{
        const friends = await getFriends();
        store.commit('SET_LIST_FRIENDS', friends)
        console.log(friends);
    }

    checkAuthStatus();
    getInvisibleFriends();

    return{
     //username: computed(username.value)
     username,
     authStatus,
     onLogout: () => logout()
    }
    

  }
}


</script>

<style lang="scss">
body{
  margin: 0;
}
</style>
