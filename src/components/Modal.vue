<template>
<div id="modal">
  <div class="cont-modal">
      <div class="wraper-slot">
        <slot></slot>
      </div>
  </div>
</div>

</template>

<script>
export default {
    name: 'Modal',
    setup(props, {emit}){


        return{
           onAcceptFriend: () => emit('onAcceptFriend')
        }
    }

}
</script>

<style lang="scss" scoped>
#modal{
    display: flex;
    justify-content: center;
    align-items: center;
    .cont-modal{
        // margin: 0 auto;
        // top: 2em;
        width: 100%;
        height: auto;
        // box-shadow: #c7c7cc 0px 1px 9px;
        // background: white;
        z-index: 99999;
        border-radius: 20px;
        //padding: 25px;
        .wraper-slot{
            margin-bottom: 15px;
            font-size: 1.2em;
        }
        .button{
            border-radius: 20px;
            background-color: #000;
            color: #fff;
            padding: 10px;
            text-align: center;
            &:hover{
                opacity: 0.8;
                cursor: pointer;
            }
        }
    }
}
.header-overlay {
  position: fixed;
  background-color: #013;
  opacity: 0.7;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
</style>