<template>
    <div class="note">
        <h2>{{ formattedDate }}</h2>
        <h5>{{ note }}</h5>
    </div>
</template>
<script>
export default {
    name: "NoteComponent",
    data: () => {
        return {
            formattedDate: ""
        }
    },
    props: ["noteDate", "note"],
    methods: {
        formateDate(date) {
            const dateToFormat = new Date(date);
            const day = dateToFormat.getDate();
            const month = dateToFormat.getMonth() + 1;
            const year = dateToFormat.getFullYear();
            const hour = dateToFormat.getHours();
            const minutes = dateToFormat.getMinutes();

            this.formattedDate = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} • ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        }
    },
    mounted(){
        this.formateDate(this.noteDate);
    }
}
</script>
<style scoped>
.note {
    text-align: center;
    background-color: #e99d052e;
    display: block;
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-top: 20px;
    border: 0px solid #e99c05;
    border-radius: 10px;
    height: 30vw;
}

.note h2 {
    font-size: large;
    font-weight: bold;
    text-align: left;
    color: white;
    background-color: #e99c05;
    padding: 5px;
    margin: 0;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.note h5 {
    font-size: larger;
    text-align: left;
    margin: 0;
    padding: 5px
}
</style>