<template>
    <div v-if="friend.category === 'nadal'" class="content">
      <div class="presupost">
        <div class="font">Pressupost: max <span class="preu">20€</span></div>
        <div class="font">Dia: 24 de decembre del 2021</div>
      </div>

      <section class="nadal">
        <div class="title"><h1>Amic invisible Nadal 🎄</h1></div>

        <div class="amic" @click="amicNadal = !amicNadal">
          <h2>El meu amic invisible <span v-if="!amicNadal">🙈</span><span v-if="amicNadal">🙉</span></h2>
        </div>  
        <div class="img-amic">
          <img v-if="amicNadal" :src="friend.picture" width="300"/>
        </div>
        <div class="desitjos" @click="wishNadal = !wishNadal">
          <h2 style="font-size: 1.2rem">Desitjos amic invisible 👀</h2>
        </div>
          <p class="font" v-if="wishNadal && !friend.firstWish">El teu amic invisible encara no ha posat els seus desitjos</p>
          <ul v-if="wishNadal" class="font">
            <li v-if="friend.firstWish">🎁 {{ friend.firstWish }}</li>
            <li v-if="friend.secondWish">🎁 {{ friend.secondWish }}</li>
            <li v-if="friend.threeWish">🎁 {{ friend.threeWish }}</li>
            <li v-if="friend.fourWish">🎁 {{ friend.fourWish }}</li>
            <li v-if="friend.fiveWish">🎁 {{ friend.fiveWish }}</li>
          </ul>

        <div class="jo" @click="myWishesNadal = !myWishesNadal">
          <h2>Els meus desitjos ✏️</h2>
        </div>
           <form v-if="myWishesNadal && myWishesListNadal === null" @submit.prevent="createWishesNadal" >
              <input type="text" required placeholder="Primer desig" v-model="wishesNadal.one">
              <input type="text" required placeholder="Segón desig" v-model="wishesNadal.twoo">
              <input type="text" required placeholder="Tercer desig" v-model="wishesNadal.three">
              <input type="text" required placeholder="Quart desig" v-model="wishesNadal.four">
              <input type="text" required placeholder="Cinqué desig" v-model="wishesNadal.five">
              <button type="submit">Guardar desitjos</button>
          </form>
        <div v-if="myWishesNadal && myWishesListNadal">
          <ul class="meus-desitjos">
            <li v-if="myWishesListNadal.wish1" class="font">🎁 {{ myWishesListNadal.wish1 }}</li>
            <li v-if="myWishesListNadal.wish2" class="font">🎁 {{ myWishesListNadal.wish2 }}</li>
            <li v-if="myWishesListNadal.wish3" class="font">🎁 {{ myWishesListNadal.wish3 }}</li>
            <li v-if="myWishesListNadal.wish4" class="font">🎁 {{ myWishesListNadal.wish4 }}</li>
            <li v-if="myWishesListNadal.wish5" class="font">🎁 {{ myWishesListNadal.wish5 }}</li>
          </ul>
          <form @submit.prevent="updateMyWishes">
           <input type="text" v-model="wishesNadal.one">
           <input type="text" v-model="wishesNadal.twoo">
           <input type="text" v-model="wishesNadal.three">
           <input type="text" v-model="wishesNadal.four">
           <input type="text" v-model="wishesNadal.five">
              <button type="submit">Modificar desitjos</button>
          </form>
        </div>
      </section>
    </div>
</template>

<script>
import requestFriends from '@/api/requests';
import useAuth from '@/auth/composables/useAuth';
import { ref, reactive, onMounted, onBeforeUpdate } from 'vue';
import Swal from 'sweetalert2';

export default {
    name: 'FriendNadal',
    props:{
        friend:{
            type: Object,
            required: true
        },
        myWishesListNadal:{
            type: Object,
            required: true
        }
    },
    setup(props){
        const { getFriends, updateFriends } = requestFriends();
        const { username } = useAuth();
        const amicNadal = ref(false);
        const wishNadal = ref(false);
        const myWishesNadal = ref(false);
        const wishesNadal = reactive({
          one: '',
          twoo: '',
          three: '',
          four: '',
          five: ''
        });

        onBeforeUpdate(() =>{
          checkWishes();
        })

          const createWishesNadal = async () =>{
          const friends = await getFriends();
          console.log('ojuuuu')
          friends.forEach(async(inv) =>{
            if(inv.name == username.value){
              console.log('entrem')
              try{
                await updateFriends({
                  id: inv.id, 
                  name: inv.name, 
                  picture: inv.picture, 
                  selected: inv.selected, 
                  friend: inv.friend, 
                  active: inv.active, 
                  category: inv.category,
                  firstWish: wishesNadal.one, 
                  secondWish: wishesNadal.twoo, 
                  threeWish: wishesNadal.three, 
                  fourWish: wishesNadal.four, 
                  fiveWish: wishesNadal.five
                })
                 Swal.fire({
                    title: 'Guardat',
                    icon: 'success',
                    html: `Genial s'han guardat correctament els teus desitjos de nadal`
                  })
                  wishesNadal.one = '';
                  wishesNadal.twoo = '';
                  wishesNadal.three = '';
                  wishesNadal.four = '';
                  wishesNadal.five = '';

              }catch(error){
                Swal.fire({
                    title: 'Error',
                    icon: 'warning',
                    html: `Ooops! ha hagut algun problema, torna-ho a intentar`
                  })
                
              }         
            }
          })
        }

        const checkWishes = () =>{
          if(props.myWishesListNadal.wish1){
            wishesNadal.one = props.myWishesListNadal.wish1
            wishesNadal.twoo = props.myWishesListNadal.wish2
            wishesNadal.three = props.myWishesListNadal.wish3
            wishesNadal.four = props.myWishesListNadal.wish4
            wishesNadal.five = props.myWishesListNadal.wish5
          }
        }

        const updateMyWishes = async() =>{
          const friends = await getFriends();
          friends.forEach(async(inv) =>{
            if(inv.name == username.value){
              try{
                await updateFriends({
                  id: inv.id, 
                  name: inv.name, 
                  picture: inv.picture, 
                  selected: inv.selected, 
                  friend: inv.friend, 
                  active: inv.active, 
                  category: inv.category,
                  firstWish: wishesNadal.one, 
                  secondWish: wishesNadal.twoo, 
                  threeWish: wishesNadal.three, 
                  fourWish: wishesNadal.four, 
                  fiveWish: wishesNadal.five
                })
                Swal.fire({
                    title: 'Modificar',
                    icon: 'success',
                    html: `Genial s'han modificat correctament els teus desitjos de nadal`
                  })
              }catch(error){
                 Swal.fire({
                    title: 'Error',
                    icon: 'warning',
                    html: `Ooops! ha hagut algun problema, torna-ho a intentar`
                  })
              }
            }
          })
        }

        return{
            amicNadal,
            wishNadal,
            myWishesNadal,
            createWishesNadal,
            wishesNadal,
            updateMyWishes

        }
    }
}
</script>

<style lang="scss" scoped>
.content{
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 2rem;
  .preu{
    background: yellow;
    color: #FF7574;
    font-weight: bold;
    font-size: 1rem;
  }
  .font{
    font-family: monospace;
    font-size: 1rem;
  }
  .nadal{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .desitjos, .amic, .jo{
        border: 5px solid #FF7574;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: monospace;
        border-radius: 15px;
        cursor: pointer;
        margin-top: 15px;
        margin-bottom: 15px;
        padding: 10px;
        &:hover{
          background: #AFE285;
        }
      }
      .img-amic{
        display: flex;
        justify-content: center;
        img{
          border-radius: 50%;
        }
      }
      .title{
        font-family: monospace;
        text-align: center;
        color: #AFE285;
        font-weight: bold;
        font-size: 1rem;

      }
    }
    // .meus-desitjos{
    //   position: absolute;
    //   margin-top: 15rem;
    // }
    .content-wishes{
      
    }
    ul{
      list-style: none;
    }
    form{
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      input{
        border: transparent;
        padding: 15px;
        margin-bottom: 15px;
        outline: 2px solid #AFE285 !important;
      }
      button{
        padding: 15px;
        font-family: monospace;
        border: 2px solid #FF7574;
        background: #ffffff;
        cursor: pointer;
        &:hover{
          background: #AFE285 ;
        }
      }
    }
}

</style>