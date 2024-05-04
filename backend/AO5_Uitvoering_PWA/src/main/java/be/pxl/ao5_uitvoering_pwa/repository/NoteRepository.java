package be.pxl.ao5_uitvoering_pwa.repository;

import be.pxl.ao5_uitvoering_pwa.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
}
