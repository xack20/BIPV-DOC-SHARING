package com.bipv.document.bipvbackend;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Map;

import org.hyperledger.fabric.gateway.Contract;
import org.hyperledger.fabric.gateway.Gateway;
import org.hyperledger.fabric.gateway.Network;
import org.hyperledger.fabric.gateway.Wallet;
import org.hyperledger.fabric.gateway.Wallets;
import org.json.JSONArray;
import org.json.JSONObject;

public class ClientApp {

	// private static final String UTF_8 = "UTF-8";
	static {
		System.setProperty("org.hyperledger.fabric.sdk.service_discovery.as_localhost", "true");
	}

	public static String InitLedger(String userName) throws Exception {

		// Load a file system based wallet for managing identities.
		Path walletPath = Paths.get("wallet");
		Wallet wallet = Wallets.newFileSystemWallet(walletPath);

		// String ORG = "1";

		// load a CCP
		Path networkConfigPath = Paths.get(
				"/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer0.json");

		Gateway.Builder builder = Gateway.createBuilder()
				.identity(wallet, userName)
				.networkConfig(networkConfigPath)
				.discovery(true);

		// create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// get the network and contract
			Network network = gateway.getNetwork("mychannel");
			Contract contract = network.getContract("basic");

			byte[] result = contract.submitTransaction("InitLedger");

			return new String(result);
		}
	}

	public static ArrayList<DocumentInfo> GetAllAssets(String userName) throws Exception {

		// Load a file system based wallet for managing identities.
		Path walletPath = Paths.get("wallet");
		Wallet wallet = Wallets.newFileSystemWallet(walletPath);

		// String ORG = "1";

		// load a CCP
		Path networkConfigPath = Paths.get(
				"/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer0.json");

		Gateway.Builder builder = Gateway.createBuilder()
				.identity(wallet, userName)
				.networkConfig(networkConfigPath)
				.discovery(true);

		// create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// get the network and contract
			Network network = gateway.getNetwork("mychannel");
			Contract contract = network.getContract("basic");

			
			byte[] result;


			result = contract.evaluateTransaction("GetAllAssets");

			ArrayList<DocumentInfo> docList = new ArrayList<DocumentInfo>();

			String res = new String(result);

			JSONArray jsonArray = new JSONArray(res);

			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				DocumentInfo doc = new DocumentInfo();

				doc.setDocumentNo(jsonObject.getString("documentNo"));
				// doc.setId(jsonObject.getString("id"));
				doc.setDocumentLink(jsonObject.getString("documentLink"));
				doc.setDocumentType(jsonObject.getString("documentType"));
				doc.setDocumentSize(jsonObject.getString("documentSize"));
				doc.setDocName(jsonObject.getString("documentName"));
				doc.setLastModification(jsonObject.getString("lastModification"));
				doc.setOwner(jsonObject.getString("ownedBy"));

				// doc.setDateReceived(jsonObject.getString("dateReceived"));
				// // doc.setProjectStage(jsonObject.getString("projectStage"));
				// doc.setSentBy(jsonObject.getString("sentBy"));
				// doc.setReceivedBy(jsonObject.getString("receivedBy"));
				// doc.setMainContent(jsonObject.getString("mainContent"));

				docList.add(doc);
			}

			return docList;
		}
	}

	public static Object AddAsset(Map<String, String> payload) throws Exception {

		// Load a file system based wallet for managing identities.
		Path walletPath = Paths.get("wallet");
		Wallet wallet = Wallets.newFileSystemWallet(walletPath);

		// String ORG = "1";

		// load a CCP
		Path networkConfigPath = Paths.get(
				"/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer0.json");

		Gateway.Builder builder = Gateway.createBuilder()
				.identity(wallet, payload.get("userName"))
				.networkConfig(networkConfigPath)
				.discovery(true);

		// create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// get the network and contract
			Network network = gateway.getNetwork("mychannel");
			Contract contract = network.getContract("basic");

			// call the chaincode function
			try {
				contract.submitTransaction("CreateAsset", payload.get(
						"documentNo"), payload.get("id"),
						payload.get("documentType"), payload.get("documentSize"),
						payload.get("documentLink"));
			} catch (Exception e) {
				return e.getMessage();
			}

			return GetAllAssets(payload.get("userName"));
		}
	}



	public static Object UpdateAsset(Map<String, String> payload) throws Exception {
		// Load a file system based wallet for managing identities.
		Path walletPath = Paths.get("wallet");
		Wallet wallet = Wallets.newFileSystemWallet(walletPath);

		// String ORG = "1";

		// load a CCP
		Path networkConfigPath = Paths.get(
				"/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer0.json");

		Gateway.Builder builder = Gateway.createBuilder()
				.identity(wallet, payload.get("userName"))
				.networkConfig(networkConfigPath)
				.discovery(true);

		// create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// get the network and contract
			Network network = gateway.getNetwork("mychannel");
			Contract contract = network.getContract("basic");

			// call the chaincode function
			contract.submitTransaction("UpdateAsset", payload.get(
					"documentNo"), payload.get("documentName"),
					payload.get("documentType"), payload.get("documentSize"),
					payload.get("documentLink"));

			return GetAllAssets(payload.get("userName"));
		}
	}



	public static DocumentInfo ReadAsset(Map<String, String> payload) throws Exception {

		// Load a file system based wallet for managing identities.
		Path walletPath = Paths.get("wallet");
		Wallet wallet = Wallets.newFileSystemWallet(walletPath);

		// String ORG = "1";

		// load a CCP
		Path networkConfigPath = Paths.get(
				"/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer0.json");

		Gateway.Builder builder = Gateway.createBuilder()
				.identity(wallet, payload.get("userName"))
				.networkConfig(networkConfigPath)
				.discovery(true);

		// create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// get the network and contract
			Network network = gateway.getNetwork("mychannel");
			Contract contract = network.getContract("basic");


			byte[] result = contract.evaluateTransaction("ReadAsset", payload.get("documentNo"));

			String res = new String(result);

			JSONObject jsonObject = new JSONObject(res);
			DocumentInfo doc = new DocumentInfo();

			doc.setDocumentNo(jsonObject.getString("documentNo"));
			// doc.setId(jsonObject.getString("id"));
			doc.setDocumentLink(jsonObject.getString("documentLink"));
			doc.setDocumentType(jsonObject.getString("documentType"));
			doc.setDocumentSize(jsonObject.getString("documentSize"));
			doc.setDocName(jsonObject.getString("documentName"));
			doc.setLastModification(jsonObject.getString("lastModification"));
			doc.setOwner(jsonObject.getString("ownedBy"));

			// doc.setDateReceived(jsonObject.getString("dateReceived"));
			// // doc.setProjectStage(jsonObject.getString("projectStage"));
			// doc.setSentBy(jsonObject.getString("sentBy"));
			// doc.setReceivedBy(jsonObject.getString("receivedBy"));
			// doc.setMainContent(jsonObject.getString("mainContent"));

			return doc;
		}
	}

	public static Object DeleteAsset(Map<String, String> payload)throws Exception {
		// Load a file system based wallet for managing identities.
		Path walletPath = Paths.get("wallet");
		Wallet wallet = Wallets.newFileSystemWallet(walletPath);

		// String ORG = "1";

		// load a CCP
		Path networkConfigPath = Paths.get(
				"/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer0.json");

		Gateway.Builder builder = Gateway.createBuilder()
				.identity(wallet, payload.get("userName"))
				.networkConfig(networkConfigPath)
				.discovery(true);

		// create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// get the network and contract
			Network network = gateway.getNetwork("mychannel");
			Contract contract = network.getContract("basic");

			contract.evaluateTransaction("DeleteAsset", payload.get("documentNo"));

			return GetAllAssets(payload.get("userName"));
		}
	}

    public static Object GetID(Map<String, String> payload) throws Exception {
        // Load a file system based wallet for managing identities.
		Path walletPath = Paths.get("wallet");
		Wallet wallet = Wallets.newFileSystemWallet(walletPath);

		// String ORG = "1";

		// load a CCP
		Path networkConfigPath = Paths.get(
				"/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer0.json");

		Gateway.Builder builder = Gateway.createBuilder()
				.identity(wallet, payload.get("userName"))
				.networkConfig(networkConfigPath)
				.discovery(true);

		// create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// get the network and contract
			Network network = gateway.getNetwork("mychannel");
			Contract contract = network.getContract("basic");

			byte[] result = contract.evaluateTransaction("GetID");

			return new String(result);
		}
    }

}
