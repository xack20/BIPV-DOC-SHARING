package com.bipv.document.bipvbackend;
/*
SPDX-License-Identifier: Apache-2.0
*/




import java.nio.file.Paths;
import java.security.PrivateKey;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import com.bipv.document.bipvbackend.config.Config;

import org.hyperledger.fabric.gateway.Wallet;
import org.hyperledger.fabric.gateway.Wallets;
import org.hyperledger.fabric.gateway.Identities;
import org.hyperledger.fabric.gateway.Identity;
import org.hyperledger.fabric.gateway.X509Identity;
import org.hyperledger.fabric.sdk.Enrollment;
import org.hyperledger.fabric.sdk.User;
import org.hyperledger.fabric.sdk.security.CryptoSuite;
import org.hyperledger.fabric.sdk.security.CryptoSuiteFactory;
import org.hyperledger.fabric_ca.sdk.HFCAClient;
import org.hyperledger.fabric_ca.sdk.RegistrationRequest;

public class RegisterUser {

	static {
		System.setProperty("org.hyperledger.fabric.sdk.service_discovery.as_localhost", "true");
	}

	public static String registerUser( Map<String, String> payload) throws Exception {

		// Create a CA client for interacting with the CA.
		Properties props = new Properties();
		
		String ORG = payload.get("org").split("org")[1];
		String PORT = Config.ca_ports.get(payload.get("org"));
		
		props.put("pemFile", System.getProperty("user.dir")
				+ "/bipv-network/test-network/organizations/peerOrganizations/org"+ORG+".example.com/ca/ca.org"+ORG+".example.com-cert.pem");
		
		props.put("allowAllHostNames", "true");
		
		HFCAClient caClient = HFCAClient.createNewInstance("https://localhost:"+PORT, props);
		
		
		
		CryptoSuite cryptoSuite = CryptoSuiteFactory.getDefault().getCryptoSuite();
		
		caClient.setCryptoSuite(cryptoSuite);

		// Create a wallet for managing identities
		Wallet wallet = Wallets.newFileSystemWallet(Paths.get("wallet"));

		// Check to see if we've already enrolled the user.
		if (wallet.get(payload.get("userName")) != null) {
			System.out.println("An identity for the user \"appUser\" already exists in the wallet");
			return "An identity for the user \"appUser\" already exists in the wallet";
		}
		
		

		X509Identity adminIdentity = (X509Identity)wallet.get( payload.get("organization")+"_admin");
		if (adminIdentity == null) {
			System.out.println("\"admin\" needs to be enrolled and added to the wallet first");
			return "\"admin\" needs to be enrolled and added to the wallet first";
		}
		
		
		User admin = new User() {

			@Override
			public String getName() {
				return "admin";
			}

			@Override
			public Set<String> getRoles() {
				return null;
			}

			@Override
			public String getAccount() {
				return null;
			}

			@Override
			public String getAffiliation() {
				return "org"+ORG+".department1";
			}

			@Override
			public Enrollment getEnrollment() {
				return new Enrollment() {

					@Override
					public PrivateKey getKey() {
						return adminIdentity.getPrivateKey();
					}

					@Override
					public String getCert() {
						return Identities.toPemString(adminIdentity.getCertificate());
					}
				};
			}

			@Override
			public String getMspId() {
				return "Org"+ORG+"MSP";
			}

		};

		// Register the user, enroll the user, and import the new identity into the wallet.
		RegistrationRequest registrationRequest = new RegistrationRequest(payload.get("userName"));
		registrationRequest.setEnrollmentID(payload.get("userName"));
		registrationRequest.setAffiliation("org1.department1");
		registrationRequest.setType("client");
		String enrollmentSecret = caClient.register(registrationRequest, admin);
		Enrollment enrollment = caClient.enroll(payload.get("userName"), enrollmentSecret);
		Identity user = Identities.newX509Identity("Org"+ORG+"MSP", enrollment);
		wallet.put(payload.get("userName"), user);
		
		return "Successfully enrolled user \""+ payload.get("userName")+"\" and imported it into the wallet";
	}

}
