<template>
    <div
            class="hidden-input"
            @dblclick="openEdit"
            @keyup.enter="changeVal"
            v-click-outside="closeEdit"
            @keyup.esc="closeEdit"

    >
        <p v-if="!edit">{{val}}</p>
        <input type="text" v-model="newVal" v-show="edit" v-focus>
    </div>
</template>

<script>
    import {clickOutside} from "../directives/clickOutside";
    import {focus} from "../directives/focus";

    export default {
    name: "hiddenInput",
    directives: {clickOutside, focus},
    props: {
      val: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        edit: false,
        newVal: this.val
      }
    },
    methods: {
      changeVal() {
        this.edit = false
        if(this.newVal.trim() != ''){
          this.$emit('changeVal', this.newVal)
        }

      },
      openEdit () {
        this.edit = true

      },
      closeEdit () {
        this.edit = false
        this.newVal = this.val
      }
    }
  }
</script>

<style scoped lang="scss">
    .hidden-input{
        height: 35px;
        input{
            height: 100%;
            padding: 5px 15px;
            border-radius: 0;
            color:#402caf;
        }
    }
</style>
