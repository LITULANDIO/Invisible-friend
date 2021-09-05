<template>
  <div>
      <form @submit.prevent="onLogin">
        <input type="text" v-model="userForm.email" placeholder="Email">
        <input type="password" v-model="userForm.password" placeholder="Contrassenya">
        <button type="submit">Iniciar sesion</button>
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
        const { loginUser } = useAuth();
        const router = useRouter();
        const userForm = ref({
            email: '',
            password: ''
        })

        const onLogin = async () =>{
           const { ok, message } = await loginUser(userForm.value);
            if(!ok) Swal.fire('Error', message, 'error')
            else router.push({name: 'home'})
        }

        return{
           onLogin,
           userForm
        }
    }
}
</script>

<style>

</style>