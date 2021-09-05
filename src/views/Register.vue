<template>
  <div>
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

<style>

</style>