<template>
    <div
            class="hidden-textarea"
            @dblclick="openEdit"
            @keyup.enter="changeVal"
            v-click-outside="closeEdit"
            @keyup.esc="closeEdit"
    >
        <p v-if="!edit">{{val}}</p>
        <textarea
                v-model="newVal"
                v-show="edit"
                v-focus
        ></textarea>
    </div>

</template>

<script>
  import {clickOutside} from "../directives/clickOutside";
  import {focus} from "../directives/focus";

  export default {
    name: "hiddenTextArea",
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
    .hidden-textarea{
        textarea{
            padding: 5px 15px;
            border-radius: 0;
            color:inherit;

        }
    }
</style>
