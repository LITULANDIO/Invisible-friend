<template>
    <div id="container-form" :class="{open: showMenu}">
        <div class="form-friend">
            <form @submit.prevent="onCreateFriend">
                <div class="form-name">
                    <input type="text" placeholder="Name friend" v-model="name">
                </div>
                <div class="form-last-name">
                    <input type="text" placeholder="Last name friend" v-model="lastName">
                </div>
                <div class="form-upload">
                    <button>Upload image</button>
                </div>
                <div class="form-save">
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'FormFriends',
    setup(){
        const store = useStore();
        

        

        return{
            showMenu: computed(() => store.state.show)
        }
    }

}
</script>

<style lang="scss" scoped>
#container-form{
    align-items: center;
    background-color: transparet;
    display: flex;
    margin-top: 15px;
    transform: translateX(-30em);
    transition: transform 0.9s ease;
     &.open{
        transform: translateX(0em);
    }
    .form-friend{
        background-color: #EAEDED;
        border-radius: 10px;
        padding: 25px;
    form{
        .form-upload, .form-save{
            display: flex;
            justify-content: center;
        }
        input{
            border-radius: 10px;
            margin-bottom: 15px;
            outline: none;
            padding: 10px;
            width: 200px;
        }
        button{
            background-color: #212F3D;
            color: #fff;
            margin-bottom: 15px;
            padding: 10px;
        }
    }

    }
}

</style>