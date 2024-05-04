import { defineStore } from 'pinia'
import axios from 'axios'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      notes: [],
    }
  },
  actions: {
    async getAllNotes() {
      const response = (await axios.get("http://localhost:8091/notes")).data;
      response.reverse();
      this.notes = response;
    },
    async addNote(note){
      const requestBody = {
        note: note
      }

      await axios.post("http://localhost:8091/notes/add", requestBody);
    }
  }
})
