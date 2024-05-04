package be.pxl.ao5_uitvoering_pwa.controllers;

import be.pxl.ao5_uitvoering_pwa.api.request.NoteRequest;
import be.pxl.ao5_uitvoering_pwa.api.response.NoteDTO;
import be.pxl.ao5_uitvoering_pwa.domain.Note;
import be.pxl.ao5_uitvoering_pwa.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoteController {
    @Autowired
    private NoteService noteService;

    @GetMapping("/notes")
    public List<NoteDTO> getAllNotes(){
        return noteService.getAllNotes();
    }

    @PostMapping("/notes/add")
    public ResponseEntity<Note> addNote(@RequestBody NoteRequest noteRequest){
        return ResponseEntity.status(HttpStatus.OK).body(noteService.AddNote(noteRequest));
    }
}
