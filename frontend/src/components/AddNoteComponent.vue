<template>
    <div class="add-container">
        <textarea v-model="note" name="addNote" id="addNote"></textarea>
        <br />
        <button @click="addNote()" id="addButton">Add</button>
    </div>
</template>
<script>
import { useGlobalStore } from '@/stores'

export default {
    name: "AddNoteComponent",
    data: ()=>{
        return{
            note: "",
            global: null,
        }
    },
    methods:{
        async addNote(){
            await this.global.addNote(this.note);
            this.note = "";
            this.$emit("noteAdded", true);
        }
    },
    mounted(){
        this.global = useGlobalStore()
    }
}
</script>
<style scoped>
#addNote{
    width: 70vw;
    height: 10vh;
    resize: none;
    border: 2px solid lightgray;
    border-radius: 10px;
    outline: none;
    padding: 10px;
}

#addButton{
    background-color: #f4ae00;
    padding: 5px;
    border: 1px solid #f4ae00;
    font-size: large;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    width: 30vw;
    margin-top: 10px;
}

.add-container{
    text-align: center;
    margin: 20px;
}

a{
    right: 2vw;
    position: absolute;
}
</style>