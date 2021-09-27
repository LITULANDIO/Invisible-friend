<template>
  <div>
      <h1>Friends Invisible</h1>
      <button v-if="username == 'litus'" @click="onOpenForm">Create friends invisible</button>
        <FormFriends v-if="username == 'litus'"/>
        <ListFriends :friends="friends" />
  </div>
</template>

<script>
import FormFriends from '@/components/FormFriends';
import ListFriends from '@/components/ListFriends';
import { useStore } from 'vuex';
import { computed } from 'vue';
import useAuth from '@/auth/composables/useAuth';
import requestFriends from '@/api/requests';

export default {
    name: 'Home',
    components:{ FormFriends, ListFriends },
    setup(){
        const store = useStore();
        const { username } = useAuth();
        const { getFriends } = requestFriends();

        const getInvisibleFriends = async () =>{
            const friends = await getFriends();
            store.commit('SET_LIST_FRIENDS', friends)
            console.log(friends);
        }
        getInvisibleFriends();
        
        return{
            onOpenForm: () => store.commit('SET_SHOW_MODAL', true),
            friends: computed(() => store.getters['getFriends']),
            username
        }
    }

}
</script>

<style lang="scss" scoped>
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
h1{
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

</style>