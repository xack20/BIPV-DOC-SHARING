package com.bipv.document.bipvbackend;

public class Response {

	private boolean status;
	private String message;
	private Object additionalPayload;
	public boolean getStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getadditionalPayload() {
		return additionalPayload;
	}
	public void setadditionalPayload(Object additionalPayload) {
		this.additionalPayload = additionalPayload;
	}
	public Response(Boolean status, String message, Object additionalPayload) {
		super();
		this.status = status;
		this.message = message;
		this.additionalPayload = additionalPayload;
	}




}
