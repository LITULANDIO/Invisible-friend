<template>
   <div v-if="friend.category === 'reis'" class="content">
      <div class="presupost">
        <div class="font">Presupost: max <span class="preu">50€</span></div>
        <div class="font">Dia: 6 de gener del 2022</div>
      </div>

      <section class="reis">
        <div class="title"><h1>Amic invisible Reis 👑</h1></div>

        <div class="amic" @click="amicReis = !amicReis">
          <h2>El meu amic invisible <span v-if="!amicReis">🙈</span><span v-if="amicReis">🙉</span></h2>
        </div>  
        <div class="img-amic">
          <img v-if="amicReis" :src="friend.picture" width="300"/>
        </div>
        
        <div class="desitjos" @click="wishReis = !wishReis">
          <h2 style="font-size: 1.2rem">Desitjos amic invisible 👀</h2>
        </div>
          <p class="font" v-if="wishReis && !friend.firstWish">El teu amic invisible encara no ha posat els seus desitjos</p>
           <ul v-if="wishReis">
                <li v-if="friend.firstWish">🎁 {{ friend.firstWish }}</li>
                <li v-if="friend.secondWish">🎁 {{ friend.secondWish }}</li>
                <li v-if="friend.threeWish">🎁 {{ friend.threeWish }}</li>
                <li v-if="friend.fourWish">🎁 {{ friend.fourWish }}</li>
                <li v-if="friend.fiveWish">🎁 {{ friend.fiveWish }}</li>
          </ul>

        <div class="jo"  @click="myWishesReis = !myWishesReis">
          <h2>Els meus desitjos ✏️</h2>
        </div>
          <form v-if="myWishesReis && myWishesListReis.length === 0" @submit.prevent="createWishesReis" >
              <input type="text" required placeholder="Primer desig" v-model="wishesReis.one">
              <input type="text" required placeholder="Segón desig" v-model="wishesReis.twoo">
              <input type="text" required placeholder="Tercer desig" v-model="wishesReis.three">
              <input type="text" required placeholder="Quart desig" v-model="wishesReis.four">
              <input type="text" required placeholder="Cinqué desig" v-model="wishesReis.five">

              <button type="submit">Guardar desitjos</button>
          </form>
           <ul v-if="myWishesReis && myWishesListReis.length >=1" class="meus-desitjos">
            <li class="font" v-for="wish in myWishesListReis" :key="wish">{{ wish.wish }}</li>
          </ul>
      </section>
    </div>
</template>

<script>
import requestFriends from '@/api/requests';
import useAuth from '@/auth/composables/useAuth';
import { ref, reactive } from 'vue';
import Swal from 'sweetalert2';

export default {
    name: 'FriendReis',
    props:{
        friend:{
            type: Object,
            required: true
        },
        myWishesListReis:{
            type: Array,
            required: true
        }
    },
    setup(){
        const { getFriends, updateFriends } = requestFriends();
        const { username } = useAuth();
        const amicReis = ref(false);
        const wishReis = ref(false);
        const myWishesReis = ref(false);
        const wishesReis = reactive({
          one: '',
          twoo: '',
          three: '',
          four: '',
          five: ''
        });

         const createWishesReis = async () =>{
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
                  active: true, 
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
                    html: `Genial s'han guardat correctament els teus desitjos de reis`
                  })
                  wishesReis.one = '';
                  wishesReis.twoo = '';
                  wishesReis.three = '';
                  wishesReis.four = '';
                  wishesReis.five = '';

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
            amicReis,
            wishReis,
            myWishesReis,
            wishesReis,
            createWishesReis

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
  .reis{
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