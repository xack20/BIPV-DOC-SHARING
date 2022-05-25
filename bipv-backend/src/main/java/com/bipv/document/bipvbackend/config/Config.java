package com.bipv.document.bipvbackend.config;

import java.util.HashMap;
import java.util.Map;



public class Config {

	public static int peer_org1 = 0;
	public static int peer_org2 = 0;

	public static Map<String, String> ca_ports;

	static {
		ca_ports = new HashMap<>();
		ca_ports.put("org1", "7054");
		ca_ports.put("org2", "8054");
		ca_ports.put("org3", "11054");
	}
}
