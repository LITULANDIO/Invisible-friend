<template>
  <div v-for="friend in friendsTogether" :key="friend.id">
    <FriendNadal :friend="friend" :myWishesListNadal="myWishesListNadal" />
    <FriendReis :friend="friend" :myWishesListReis="myWishesListReis" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import requestFriends from '@/api/requests';
import useAuth from '@/auth/composables/useAuth';
import { onMounted, ref } from 'vue';
import FriendNadal from '@/components/FriendNadal.vue';
import FriendReis from '@/components/FriendReis.vue'


export default {
    name: 'MyFriend',
    components:{
      FriendNadal,
      FriendReis
    },
    setup(){
        const store = useStore();
        const friendsTogether = ref([]);
        const { getFriends, updateFriends } = requestFriends();
        const { username } = useAuth();
        const myWishesListNadal = ref([]);
        const myWishesListReis = ref([]);
        
        const getInvisibleFriends = async () =>{
          const friends = await getFriends();
          putFriends(friends);
          //console.log('friend =>', friend.value)
          friends.forEach(async(inv) =>{
            if(!inv.active){
                if(inv.id == store.getters['getFriendId']){
                    inv.selected = false
                     await updateFriends({id: inv.id, name: inv.name, picture: inv.picture, selected: inv.selected, friend: inv.friend, active: true, category: inv.category, firstWish: inv.firstWish , secondWish: inv.secondWish, threeWish: inv.threeWish, fourWish: inv.fourWish, fiveWish: inv.fiveWish })
                    store.commit('auth/friendSelect', { friend: inv.friend, user: username.value, active: true, category: inv.category })
                    //store.commit('UPDATE_FRIENDS', friend.value)
                 }
            }
          })
        }
    
        const putFriends = (friends) =>{
          let friendNadal = null;
          let friendReis = null;
          friendNadal = friends.find(friend => friend.friend == username.value && friend.category === 'nadal');
          friendReis = friends.find(friend => friend.friend == username.value && friend.category === 'reis');
          console.log(friendNadal)
          if(friendNadal){
            friendsTogether.value.push(friendNadal)
          }
          if(friendReis){
             friendsTogether.value.push(friendReis);
          }
        }

        const getMyProfile = async (type) =>{
            const friends = await getFriends();
            let myWishesNadal = [];
            let myWishesReis = [];
            
            const myProfile = friends.find(my => my.name === username.value && my.category === type)
            if(type === 'nadal' && myProfile){
              const { firstWish, secondWish, threeWish, fourWish, fiveWish } = myProfile;
              if(firstWish && secondWish && threeWish && fourWish && fiveWish){
                myWishesNadal.push({wish: firstWish},{wish: secondWish},{wish: threeWish},{wish: fourWish}, {wish: fiveWish})
                myWishesListNadal.value = myWishesNadal;
              }
            }
             if(type === 'reis' && myProfile){
                const { firstWish, secondWish, threeWish, fourWish, fiveWish } = myProfile;
               if(firstWish && secondWish && threeWish && fourWish && fiveWish){
                 myWishesReis.push({wish: firstWish},{wish: secondWish},{wish: threeWish},{wish: fourWish}, {wish: fiveWish})
                 myWishesListReis.value = myWishesReis;
               }
             }
        }

        onMounted(async () =>{
          getInvisibleFriends();
          await getMyProfile('nadal');
          await getMyProfile('reis');

        })
         
        return{
          friendsTogether,
          myWishesListReis,
          myWishesListNadal
        }

    }

}
</script>

<style lang="scss" scoped></style>