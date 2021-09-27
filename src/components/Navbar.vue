<template>
  <div id="navbar">
      <div class="nav-left" @click="onGoHome">
        <img :src="require('@/assets/logo.svg')" alt="logo"/>
      </div>
      <div class="nav-right">
          <div class="nav-user" @click="onGoFriend">
            <img :src="require('@/assets/user.svg')" alt="user"/>
            <span>Hola {{ username }}</span>
          </div>
        <div class="logout" @click="onLogout">
            <img :src="require('@/assets/exit.svg')" title="logout" :alt="logout"/>
        </div>
      </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name: 'Navbar',
    props:{
        username:{
            type: String
        }
    },
    setup(props,{emit}){
        const router = useRouter();
        
        return{
            onLogout: () => emit('onLogout'),
            onGoFriend: () => emit('onGoFriend'),
            onGoHome: () => router.push({name: 'home'})
        }
    }

}
</script>

<style lang="scss" scoped>
#navbar{
    .nav-left{
        cursor: pointer;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background:#fff silver;
    border-bottom: 8px solid #FF7574; //#80aaff;
    box-shadow: #c7c7cc 0px 1px 9px;
    color: silver;
    .nav-right{
        display: flex;
        .nav-user{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 15px;
            img{
                margin-right: 5px;
            }
            span{
                font-size: 1.2em;
                color: #424242; // #9cbcff;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            }
        }
        .logout{
            cursor: pointer;
        }
    }


}

</style>