package com.bipv.document.bipvbackend;
/*
SPDX-License-Identifier: Apache-2.0
*/



import java.nio.file.Paths;
import java.util.Properties;

import org.hyperledger.fabric.gateway.Wallet;
import org.hyperledger.fabric.gateway.Wallets;
import org.hyperledger.fabric.gateway.Identities;
import org.hyperledger.fabric.gateway.Identity;
import org.hyperledger.fabric.sdk.Enrollment;
import org.hyperledger.fabric.sdk.security.CryptoSuite;
import org.hyperledger.fabric.sdk.security.CryptoSuiteFactory;
import org.hyperledger.fabric_ca.sdk.EnrollmentRequest;
import org.hyperledger.fabric_ca.sdk.HFCAClient;

public class EnrollAdmin {

	static {
		System.setProperty("org.hyperledger.fabric.sdk.service_discovery.as_localhost", "true");
	}

	public static String enrollAdmin() throws Exception {

		// Create a CA client for interacting with the CA.
		Properties props = new Properties();
		
		
		
		String ORG = "1";
//		String PORT = "11054";
//		String PORT = "8054";
		String PORT = "7054";
		
		props.put("pemFile","/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/ca/ca.org1.example.com-cert.pem");
		
		props.put("allowAllHostNames", "true");
		
		HFCAClient caClient = HFCAClient.createNewInstance("https://localhost:"+PORT, props);
		
		
		
		
		CryptoSuite cryptoSuite = CryptoSuiteFactory.getDefault().getCryptoSuite();
		
		caClient.setCryptoSuite(cryptoSuite);

		// Create a wallet for managing identities
		Wallet wallet = Wallets.newFileSystemWallet(Paths.get("wallet"));

		// Check to see if we've already enrolled the admin user.
		if (wallet.get("admin") != null) {
			System.out.println("An identity for the admin user \"admin\" already exists in the wallet");
			return "An identity for the admin user \"admin\" already exists in the wallet";
		}

		// Enroll the admin user, and import the new identity into the wallet.
		final EnrollmentRequest enrollmentRequestTLS = new EnrollmentRequest();
		enrollmentRequestTLS.addHost("localhost");
		enrollmentRequestTLS.setProfile("tls");
		Enrollment enrollment = caClient.enroll("admin", "adminpw", enrollmentRequestTLS);
		

		Identity user = Identities.newX509Identity("Org"+ORG+"MSP", enrollment);
		
		wallet.put("admin", user);
		
		return "Successfully enrolled user \"admin\" and imported it into the wallet";
	}
}
