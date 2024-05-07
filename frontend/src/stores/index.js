import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      notes: [],
    };
  },
  actions: {
    async getAllNotes() {
      try {
        const response = await fetch("http://localhost:8091/notes");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        this.notes = await response.json();
        this.notes.reverse();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async addNoteSync(note) {
      const requestBody = {
        note: note,
      };

      try {
        const response = await fetch("http://localhost:8091/notes/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        if (!navigator.onLine) {
          console.log("Data posted offline, setting for sync...");
        } else {
          console.error("Error posting data:", error);
        }
      }
    },
  },
});
