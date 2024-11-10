package hosteleria_proyect.api.error;

import hosteleria_proyect.api.error.dto.ErrorMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GeneralExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorMessage> handleCustomException(CustomException exception) {
        ErrorMessage message = new ErrorMessage(exception.getStatus(), exception.getMessage());
        return new ResponseEntity<>(message, exception.getStatus());
    }

}
