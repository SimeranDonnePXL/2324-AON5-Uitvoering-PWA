package be.pxl.ao5_uitvoering_pwa.api.response;

import java.time.LocalDateTime;

public record NoteDTO(Long Id, LocalDateTime date, String note) {
}
