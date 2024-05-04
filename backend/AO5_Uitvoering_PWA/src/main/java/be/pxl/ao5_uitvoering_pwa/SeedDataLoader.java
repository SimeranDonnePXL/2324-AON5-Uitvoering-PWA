package be.pxl.ao5_uitvoering_pwa;

import be.pxl.ao5_uitvoering_pwa.domain.Note;
import be.pxl.ao5_uitvoering_pwa.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class SeedDataLoader implements CommandLineRunner {
    @Autowired
    private NoteRepository noteRepository;


    @Override
    public void run(String... args) throws Exception {
        CreateSeedData();
    }

    private void CreateSeedData(){
        Note note1 = new Note(LocalDateTime.now().minusDays(3), "Drink elke dag water");
        Note note2 = new Note(LocalDateTime.now().minusDays(2), "Ga naar de gym");
        Note note3 = new Note(LocalDateTime.now().minusDays(1), "Mijn autosleutels staan op de kast in de keuken");

        noteRepository.saveAll(List.of(note1, note2, note3));
    }
}
