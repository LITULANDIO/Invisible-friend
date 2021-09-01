<template>
  <router-view/>
</template>

<script>
import requestFriends from '@/api/requests';
import { useStore } from 'vuex';
import { watchEffect } from 'vue';

export default{
  name: 'App',
  setup(){
    const store = useStore();
    const { getFriends } = requestFriends();


    const getInvisibleFriends = async () =>{
        const friends = await getFriends();
        store.commit('SET_LIST_FRIENDS', friends)
        console.log(friends);
    }

    watchEffect(() =>{
      getInvisibleFriends();
    })

  }
}


</script>

<style lang="scss">

</style>
