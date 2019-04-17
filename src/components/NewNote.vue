<template>
    <!--new note-->
    <div class="new-note">
        <label>Title</label>
        <input type="text" v-model="note.title">
        <label>Priority</label>
        <div class="priority__list">
            <label
                    v-for="(item, index) in priorityList"
                    class="priority__item "
                    :class="[{ priority__item_active: note.priority === index }, 'priority__item_' + item.modificator]"
                    :key="index"
            >
                <span>{{item.name}}</span>

                <input type="radio" :value="index" v-model="note.priority">
            </label>
        </div>
        <label>Description</label>
        <textarea v-model="note.descr"></textarea>
        <button class="btn btnPrimary" @click="addNote()">New note</button>
    </div>
</template>

<script>
  export default {
    name: "NewNote",
    props: {
      note: {
        type: Object,
        required: true
      },
      priorityList: {
        type: Array,
        required: true
      }
    },
    methods: {
      addNote() {
        this.$emit('addNote', this.note)
      }
    }
  }
</script>



<style lang="scss" scoped>
    .new-note {
        text-align: center;

        textarea {
            margin-bottom: 30px;
        }
    }
    .priority{
        &__list{
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin: 1rem 0;
        }
        &__item{
            width: 33%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            transition: all .3s;
            height: 50px;
            padding: 15px 0;
            background-color: currentColor;
            span{
                font-weight: bold;
                color: black;
            }
            &_low{
                color:rgb(35, 226, 31);
            }
            &_medium{
                color: rgb(229, 242, 0);
            }
            &_high{
                color: rgb(255, 0, 0);
            }
            &_active{
                box-shadow: 0 0 1px 1px black;
            }
            [type="radio"]{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
        }
    }
</style>
