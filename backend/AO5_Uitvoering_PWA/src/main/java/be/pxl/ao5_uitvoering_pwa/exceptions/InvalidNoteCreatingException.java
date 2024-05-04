package be.pxl.ao5_uitvoering_pwa.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidNoteCreatingException extends RuntimeException {
    public InvalidNoteCreatingException(String message){
        super(message);
    }
}
