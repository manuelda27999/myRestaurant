package hosteleria_proyect.api;

import hosteleria_proyect.api.services.InterfaceUserService;
import hosteleria_proyect.api.services.InvoiceService;
import hosteleria_proyect.api.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ApiApplication implements CommandLineRunner {

	@Autowired
	private InterfaceUserService interfaceUserService;

	@Autowired
	private UserService userService;

	@Autowired
	private InvoiceService invoiceService;

	//Sirve para enviar info a consola de forma más limpia
	private static final Logger logger =
			LoggerFactory.getLogger(ApiApplication.class);

	public static void main(String[] args) {
		logger.info("Aplicación iniciada");
		SpringApplication.run(ApiApplication.class, args);

	}

	@Override
	public void run(String... args) throws Exception {
		//apiAplicationTest();
	}

	//Bloque de código para hacer pruebas
	private void apiAplicationTest() {
		logger.info("*** Zona lanzada con el run ***");

		/*
		User user = userService.getUserByEmailAndPassword("CarlosJose@gmail.com", "12345");
		if (user != null) {
			logger.info(user.toString());
		} else {
			System.out.println("null");
		}
*/
	}
}
