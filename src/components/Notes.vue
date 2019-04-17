<template>
    <!--note list-->
    <div class="notes">
        <div
            class="note"
            :class="[{ full: !grid }, 'note_' + priorityList[note.priority].modificator]"
            v-for="(note, index) in notes"
            :key="index"
        >
            <div class="note-header" :class="{ full: !grid }">
                <hidden-input :val="note.title" @changeVal="changeTitle(index,$event)"/>
                <p style="cursor: pointer;" @click="removeNote(index)">x</p>
            </div>
            <div class="note-body">
                <hidden-text-area :val="note.descr" @changeVal="changeDescr(index, $event)"/>
                <span>{{note.date}}</span>
            </div>

        </div>
    </div>
</template>

<script>
  import HiddenInput from "./hiddenInput";
  import HiddenTextArea from "./hiddenTextArea";
  export default {
    name: "Notes",
    components: {HiddenTextArea, HiddenInput},
    props: {
      notes: {
        type: Array,
        required: true
      },
      grid: {
        type: Boolean,
        required: true
      },
      priorityList: {
        type: Array,
        required: true
      }
    },
    methods: {
      removeNote(index){
        this.$emit('removeNote',index);
      },
      changeTitle(index, title){
        let note = this.notes[index]
        note.title = title
        this.$emit('changeNote', index, note)
      },
      changeDescr(index, descr){
        let note = this.notes[index]
        note.descr = descr
        this.$emit('changeNote', index, note)
      }
    }
  }
</script>

<style lang="scss">
    .notes{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 40px 0;
    }
    .note{
        width: 48%;
        padding: 18px 20px;
        margin-bottom: 20px;
        background-color: #ffffff;
        transition: all .25s cubic-bezier(.02,.01,.47,1);
        box-shadow: 0 30px 30px rgba(0,0,0,.02);
        position: relative;
        & > *{
            z-index: 2;
            position: relative;
        }
        &:hover{
            transform: translate(0, -6px);
            box-shadow: 0 30px 30px rgba(0,0,0,.04);
            transition-delay: 0s !important;
        }
        &::before{
            content:'';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;

            z-index: 1;
        }
        &_medium::before{
            background: rgba(229, 242, 0,0.2);
        }
        &_high{
            span{
                color:black;
            }
            &::before{
                background: rgba(255, 0, 0,0.3);
            }


        }
        &.full{
            width: 100%;
            text-align: center;
        }
        &-body{
            p{
                margin: 20px 0;
            }
            span{
                font-size: 14px;
                color: #999999;
            }
        }
        &-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            &.full{
                justify-content: center;

            }
            h1{
                font-size: 32px;
            }
            p{
                color:#402caf;
                margin-right: 16px;
            }
            svg{
                margin-right: 12px;
                color: #999999;
                cursor: pointer;
                &.active{
                    color:#402caf;
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
</style>
