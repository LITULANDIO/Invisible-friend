<template>
  <div>
      <h1>LOGIN</h1>
      <form @submit.prevent="onLogin">
        <input type="text" v-model="userForm.email" placeholder="Email">
        <input type="password" v-model="userForm.password" placeholder="Contrassenya">
        <button type="submit">Iniciar sessió</button>
      </form>
      <p @click="onGoRegister">¿No estàs registrat?</p>
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
           userForm,
           onGoRegister: () => router.push({name: 'register'})
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
    p{
        text-align: center;
        cursor: pointer;
    }
}

</style>