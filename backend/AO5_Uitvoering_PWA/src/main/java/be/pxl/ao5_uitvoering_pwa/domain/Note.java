package be.pxl.ao5_uitvoering_pwa.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private LocalDateTime date;
    @Lob
    private String note;

    public Note(LocalDateTime date, String note) {
        this.date = date;
        this.note = note;
    }

    public Note() {
    }

    public Long getId() {
        return Id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
