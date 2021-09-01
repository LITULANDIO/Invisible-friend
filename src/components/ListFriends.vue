<template>
  <div v-for="friend in friends" :key="friend.id">
      <h1>{{ friend.name }}</h1>
      <img :src="friend.picture" :alt="friend.name"/>
  </div>
</template>

<script>
export default {
    name: 'ListFriends',
    props:{
        friends:{
            type: Array,
            required: true
        }
    },
    setup(props){

        console.log(props.friends)


        return{
        
        }
    }

}
</script>

<style lang="scss" scoped>



</style>