package com.bipv.document.bipvbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class BipvBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BipvBackendApplication.class, args);
	}
}