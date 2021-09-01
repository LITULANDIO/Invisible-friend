<template>
  <div>
      <h1>Friends Invisible</h1>
      <button @click="onOpenForm">Create friends invisible</button>
        <FormFriends />
  </div>
</template>

<script>
import FormFriends from '@/components/FormFriends';
import { useStore } from 'vuex';

export default {
    name: 'Home',
    components:{ FormFriends },
    setup(){
        const store = useStore();

       
        return{
            onOpenForm: () => store.commit('SET_SHOW_MODAL', true)

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