<template>
  <div>
      <div v-if="username == 'litus'">
          <div class="button">
            <button  @click="onOpenForm">Create friends invisible</button>
          </div>
        <Modal>
            <FormFriends v-if="username == 'litus'" @onClose="onClose"/>
        </Modal>
      </div>

        <h1>Amic invisble Nadal 🎄 </h1>
        <ListFriends :friends="friends" category="nadal"/>

         <h1>Amic invisble Reis 👑</h1>
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
import Modal from '@/components/Modal.vue';

export default {
    name: 'Home',
    components:{ FormFriends, ListFriends, Modal },
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

        const onClose = () =>{
            console.log('clicked')
            store.commit('SET_SHOW_MODAL', false)
            console.log(store.state.show)
        }

        return{
            onOpenForm: () => store.commit('SET_SHOW_MODAL', true),
            onClose,
            username,
            friends,
        }
    }

}
</script>

<style lang="scss" scoped>
h1, h2{
    text-align: center;
    font-family: monospace !important;
}
.button{
    text-align: center;
    margin-top: 2rem;
}
button{
    margin-left: 15px;
    background-color: #212F3D;
    color: #fff;
    margin-bottom: 15px;
    padding: 10px;
    cursor: pointer;
    font-family: monospace;
     &:hover{
        opacity: 0.8;
     }
}
h1{
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

</style>