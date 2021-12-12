<template>
  <div>
      <h1>Registre</h1>
      <form @submit.prevent="onRegister">
        <input type="text" v-model="userForm.name" placeholder="Usuari">
        <input type="text" v-model="userForm.email" placeholder="Email">
        <input type="password" v-model="userForm.password" placeholder="Contrassenya">
        <button type="submit">Registrar</button>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import  useAuth from '../auth/composables/useAuth';
import Swal from 'sweetalert2';

export default {
    name: 'Register',
    setup(){
        const { createUser } = useAuth();
        const router = useRouter();
        const userForm = ref({
            name: '',
            email: '',
            password: ''
        })

        return{
           userForm,
           onRegister: async () => {
               const { ok, message } = await createUser(userForm.value)
               if(!ok) Swal.fire('Error', message, 'error');
               else router.push({name: 'home'})
           }
        }
    }
}
</script>

<style lang="scss" scoped>
div{
    background: #EC7063 ;
    height: 100vh;
    h1{
        font-family: monospace;
        text-align: center;
    }
    padding: 15px;
    form{
        display: flex;
        flex-direction: column;
        input{
            padding: 15px;
            margin-bottom: 15px;
        }
        button{
            font-family: monospace;
            cursor: pointer;
        }
    }
}

</style>