<template>
    <LogoBar></LogoBar>
    <AddNoteComponent @noteAdded="addNoteEventHandler"></AddNoteComponent>
    <div class="main-container">
        <NoteComponent v-for="note in notes" :key="note.Id" :noteDate="note.date" :note="note.note"></NoteComponent>
    </div>
</template>
<script>
import LogoBar from "./LogoBar.vue";
import AddNoteComponent from "./AddNoteComponent.vue"
import NoteComponent from "./NoteComponent.vue"
import { useGlobalStore } from '@/stores'

export default{
    name: "NotesView",
    data: () =>{
        return{
            notes: [],
            global: null,
        }
    },
    components:{
        LogoBar: LogoBar,
        AddNoteComponent: AddNoteComponent,
        NoteComponent: NoteComponent
    },
    methods:{
        async getAllNotes(){
            await this.global.getAllNotes();
            this.notes = this.global.notes;
            console.log(this.notes);
        },
        addNoteEventHandler(data){
            if (data) {
                this.getAllNotes();
            }
        }  
    },
    mounted(){
        this.global = useGlobalStore()
        this.getAllNotes();
    }
}
</script>
<style scoped>
</style>