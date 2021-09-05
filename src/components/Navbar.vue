<template>
  <div id="navbar">
      <div class="nav-left">
        <img :src="require('@/assets/logo.svg')" alt="logo"/>
      </div>
      <div class="nav-right">
          <div class="nav-user">
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
export default {
    name: 'Navbar',
    props:{
        username:{
            type: String
        }
    },
    setup(props,{emit}){
        


        return{
            onLogout: () => emit('onLogout')
        }
    }

}
</script>

<style lang="scss" scoped>
#navbar{
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