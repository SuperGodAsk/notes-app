<template>
    <div class="wrapper">
        <div class="wrapper-content">
            <section>
                <div class="container">

                    <!--message-->
                    <message
                            v-if="message"
                            :message="message"
                    />

                    <!--new note-->
                    <new-note
                            :note="note"
                            @addNote="addNote()"
                            :priorityList="priorityList"
                    />

                    <div class="note-header">
                        <!--title-->
                        <h1> {{title}} </h1>
                        <!--search-->
                        <search
                                :value="search"
                                placeholder="Find your note"
                                @search="search = $event"
                        />
                        <!--icons controls-->
                        <div class="icons">
                            <svg @click="grid = true" :class="{ active: grid }" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            <svg @click="grid = false" :class="{ active: !grid }" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3" y2="6"></line>
                                <line x1="3" y1="12" x2="3" y2="12"></line>
                                <line x1="3" y1="18" x2="3" y2="18"></line>
                            </svg>
                        </div>
                    </div>

                    <!--notes list-->
                    <notes
                            :notes="notesFilter"
                            :grid="grid"
                            :priorityList="priorityList"
                            @removeNote="removeNote"
                            @changeNote="changeNote"
                    />

                </div>
            </section>

        </div>
    </div>
</template>

<script>
  import Message from "./components/Message.vue";
  import NewNote from "./components/NewNote";
  import Notes from "./components/Notes";
  import Search from "./components/Search";

  export default {
    components: {Search, Notes, NewNote, Message},
    data() {
      return {
        title: 'notes App',
        message: null,
        grid: true,
        search: '',
        note: {
          title: '',
          descr: '',
          priority: 0
        },
        priorityList: [
          {
            name: 'low',
            modificator: 'low',
          },
          {
            name: 'medium',
            modificator: 'medium',
          },
          {
            name: 'high',
            modificator: 'high',
          }
        ],
        notes: [
          {
            title: 'First Note',
            descr: 'Description for first note',
            priority: 0,
            date: new Date(Date.now()).toLocaleString()
          },
          {
            title: 'Second Note',
            descr: 'Description for second note',
            priority: 1,
            date: new Date(Date.now()).toLocaleString()
          },
          {
            title: 'Third Note',
            descr: 'Description for third note',
            priority: 2,
            date: new Date(Date.now()).toLocaleString()
          }
        ]
      }
    },
    computed: {
      notesFilter() {
        let array = this.notes,
                search = this.search
        if (!search) return array
        // small
        search = search.trim().toLowerCase()
        // filter
        array = array.filter(note => {
          return note.title.toLowerCase().indexOf(search) !== -1
        })
        //error
        return array
      }
    },
    methods: {
      addNote() {
        // console.log(this.note);
        let {title, descr, priority} = this.note
        if (title === '') {
          this.message = 'title can`t be blank!'
          return false
        }
        this.notes.push({
          title,
          descr,
          priority,
          date: new Date(Date.now()).toLocaleString()
        })
        this.note.title = ''
        this.note.descr = ''
        this.note.priority = 0
        this.message = null
      },
      removeNote(index) {
        this.notes.splice(index, 1)
      },
      changeNote(index,note){
        note.date = new Date(Date.now()).toLocaleString()
        this.notes[index] = note
      }
    }
  }
</script>

<style>
    .note-header {
        margin: 35px 0;
    }
</style>
