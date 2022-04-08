package com.bipv.document.bipvbackend;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class ApiController {
	
	@GetMapping("/enrollAdmin")
	public Response enrollAdmin() throws Exception {

		Response response = new Response(true, "Admin enrolled successfully", EnrollAdmin.enrollAdmin());
		return response;
	}
	
	@PostMapping("/registerUser")
	public Response registerUser(String userName) throws Exception {
		
		Response response = new Response(true, "User Registered Successfully", RegisterUser.registerUser(userName));
		return response;
	}
	
	@PostMapping("/clientApp")
	public Response clientApp(String userName) throws Exception {
		Response response = new Response(true, "All Data Fetched", ClientApp.clientApp(userName));
		return response;
	}

}