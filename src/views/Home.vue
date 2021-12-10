<template>
  <div>
      <h1>Friends Invisible</h1>
      <button v-if="username == 'litus'" @click="onOpenForm">Create friends invisible</button>
        <FormFriends v-if="username == 'litus'"/>

        <h2>Amic invisble Nadals</h2>
        <ListFriends :friends="friends" category="nadal"/>

         <h2>Amic invisble Reis</h2>
        <ListFriends :friends="friends" category="reis"/>
  </div>
</template>

<script>
import FormFriends from '@/components/FormFriends';
import ListFriends from '@/components/ListFriends';
import { useStore } from 'vuex';
import { computed, onBeforeMount, onBeforeUpdate, ref } from 'vue';
import useAuth from '@/auth/composables/useAuth';
import requestFriends from '@/api/requests';

export default {
    name: 'Home',
    components:{ FormFriends, ListFriends },
    setup(){
        const store = useStore();
        const { username } = useAuth();
        const { getFriends } = requestFriends();
        const fr = computed(() => store.getters['getFriends'])
        const friends = ref();

        const getInvisibleFriends = async () =>{
            const friends = await getFriends();
            store.commit('SET_LIST_FRIENDS', friends)
            console.log(friends);
        }

        const getFriendsListRandom = async() =>{
            const mixedFriends = fr.value;
            mixedFriends.sort(() => Math.random() - 0.8);
            friends.value = mixedFriends;
        }

        onBeforeMount(() =>{
            getInvisibleFriends();
            getFriendsListRandom();
            
        });
        onBeforeUpdate(() =>{
            getFriendsListRandom();
        });

        return{
            onOpenForm: () => store.commit('SET_SHOW_MODAL', true),
            username,
            friends,
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