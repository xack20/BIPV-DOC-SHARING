package com.bipv.document.bipvbackend;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class ApiController {
	
	@PostMapping("/enrollAdmin")
	public Response enrollAdmin(@RequestBody Map<String, String> payload) throws Exception {
		Response response = new Response(true, "Admin enrolled successfully", EnrollAdmin.enrollAdmin(payload));
		return response;
	}
	
	@PostMapping("/registerUser")
	public Response registerUser(@RequestBody Map<String, String> payload) throws Exception {
		
		Response response = new Response(true, "User Registered Successfully", RegisterUser.registerUser(payload));
		return response;
	}

	@Deprecated
	@PostMapping("/init")
	public Response init(@RequestBody Map<String, String> payload) throws Exception {
		Response response = new Response(true, "Leedger Inited", ClientApp.InitLedger(payload));
		return response;
	}
	
	@PostMapping("/assets")
	public Response allAssets(@RequestBody Map<String, String> payload) throws Exception {
		System.out.println(payload.get("userName")+" "+payload.get("org"));
		Response response = new Response(true, "All Data Fetched", ClientApp.GetAllAssets(payload));
		return response;
	}

	@GetMapping("/asset")
	public Response oneAssets(@RequestBody Map<String, String> payload) throws Exception {
		Response response = new Response(true, "One Data Fetched", ClientApp.ReadAsset(payload));
		return response;
	}

	@PostMapping("/addAsset")
	public Response addAsset(@RequestBody Map<String, String> payload) throws Exception{
		
		System.out.println("Create Payload: " + payload.get("userName") + " " + payload.get("id"));

		Response response = new Response(true, "New Asset Created!", ClientApp.AddAsset(payload));
		return response;
	}

	@PostMapping("/updateAsset")
	public Response updateAsset(@RequestBody Map<String, String> payload) throws Exception {
		System.out.println("Update Payload: " + payload.get("userName") + " " + payload.get("documentNo"));
		Response response = new Response(true, "Asset Updated Successfully!", ClientApp.UpdateAsset(payload));
		return response;
	}


	@PostMapping("/transferAsset")
	public Response transferAsset(@RequestBody Map<String, String> payload) throws Exception {
		Response response = new Response(true, "Asset Transfer Successfully!", ClientApp.TransferAsset(payload));
		return response;
	}

	@PostMapping("/deleteAsset")
	public Response deleteAsset(@RequestBody Map<String, String> payload) throws Exception {
		System.out.println("Delete Payload: " + payload.get("userName") + " " + payload.get("documentNo"));
		Response response = new Response(true, "Asset Successfully Deleted!", ClientApp.DeleteAsset(payload));
		return response;
	}

	@GetMapping("/getID")
	public Response getID(@RequestBody Map<String, String> payload) throws Exception {
		Response response = new Response(true, "ID Fetched!", ClientApp.GetID(payload));
		return response;
	}

}