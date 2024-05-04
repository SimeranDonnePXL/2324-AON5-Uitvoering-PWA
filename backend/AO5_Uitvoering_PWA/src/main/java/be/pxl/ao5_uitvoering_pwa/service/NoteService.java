package be.pxl.ao5_uitvoering_pwa.service;

import be.pxl.ao5_uitvoering_pwa.api.request.NoteRequest;
import be.pxl.ao5_uitvoering_pwa.api.response.NoteDTO;
import be.pxl.ao5_uitvoering_pwa.domain.Note;
import be.pxl.ao5_uitvoering_pwa.exceptions.InvalidNoteCreatingException;
import be.pxl.ao5_uitvoering_pwa.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public Note AddNote(NoteRequest noteRequest){
        if (noteRequest.note() == null || noteRequest.note().equals("")){
            throw new InvalidNoteCreatingException("Note cannot be empty");
        }

        Note note = new Note(LocalDateTime.now(), noteRequest.note());
        return  noteRepository.save(note);
    }

    public List<NoteDTO> getAllNotes(){
        return noteRepository.findAll().stream().map(n -> new NoteDTO(n.getId(), n.getDate(), n.getNote())).toList();
    }
}
