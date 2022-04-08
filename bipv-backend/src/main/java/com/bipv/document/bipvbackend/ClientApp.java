package com.bipv.document.bipvbackend;

// import java.io.UnsupportedEncodingException;
import java.nio.file.Path;
import java.nio.file.Paths;
// import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hyperledger.fabric.gateway.Contract;
import org.hyperledger.fabric.gateway.Gateway;
import org.hyperledger.fabric.gateway.Network;
import org.hyperledger.fabric.gateway.Wallet;
import org.hyperledger.fabric.gateway.Wallets;
// import org.hyperledger.fabric.protos.ledger.rwset.kvrwset.KvRwset;
// import org.hyperledger.fabric.sdk.BlockInfo;
// import org.hyperledger.fabric.sdk.TxReadWriteSetInfo;
// import org.hyperledger.fabric.sdk.exception.InvalidArgumentException;
// import static org.hyperledger.fabric.sdk.BlockInfo.EnvelopeType.TRANSACTION_ENVELOPE;
// import org.hyperledger.fabric.sdk.exception.ProposalException;
// import org.json.JSONArray;
// import org.json.JSONObject;

public class ClientApp {

	// private static final String UTF_8 = "UTF-8";
	static {
		System.setProperty("org.hyperledger.fabric.sdk.service_discovery.as_localhost", "true");
	}

	public static String clientApp(String userName) throws Exception {

		// Load a file system based wallet for managing identities.
		Path walletPath = Paths.get("wallet");
		Wallet wallet = Wallets.newFileSystemWallet(walletPath);

		// String ORG = "1";

		// load a CCP
		Path networkConfigPath = Paths.get(
				"/home/zakaria/Desktop/BIPV-DOC-SHARING/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer1.yaml");

		Gateway.Builder builder = Gateway.createBuilder()
				.identity(wallet, userName)
				.networkConfig(networkConfigPath)
				.discovery(true);

		// create a gateway connection
		try (Gateway gateway = builder.connect()) {

			// get the network and contract
			Network network = gateway.getNetwork("mychannel");
			Contract contract = network.getContract("basic");

			// BlockInfo blockInfo = null;
			// try {
			// 	blockInfo = network.getChannel().queryBlockByNumber(4);
			// } catch (InvalidArgumentException | ProposalException e) {
			// 	e.printStackTrace();
			// }

			// for (BlockInfo.EnvelopeInfo envelopeInfo : blockInfo.getEnvelopeInfos()) {
			// 	if (envelopeInfo.getType() == TRANSACTION_ENVELOPE) {
			// 		BlockInfo.TransactionEnvelopeInfo transactionEnvelopeInfo = (BlockInfo.TransactionEnvelopeInfo) envelopeInfo;
			// 		for (BlockInfo.TransactionEnvelopeInfo.TransactionActionInfo transactionActionInfo : transactionEnvelopeInfo
			// 				.getTransactionActionInfos()) {
			// 			// System.out.println(ccName);
			// 			TxReadWriteSetInfo rwsetInfo = transactionActionInfo.getTxReadWriteSet();
			// 			if (null != rwsetInfo) {
			// 				for (TxReadWriteSetInfo.NsRwsetInfo nsRwsetInfo : rwsetInfo.getNsRwsetInfos()) {
			// 					KvRwset.KVRWSet rws = null;
			// 					rws = nsRwsetInfo.getRwset();

			// 					// int rs = -1;
			// 					for (KvRwset.KVWrite writeList : rws.getWritesList()) {
			// 						// rs++;
			// 						String valAsString = null;

			// 						if (writeList != null && writeList.getValue() != null) {

			// 							String key = writeList.getKey();
			// 							System.out.println("Key : " + key);

			// 							try {
			// 								valAsString = new String(writeList.getValue().toByteArray(), UTF_8);
			// 							} catch (UnsupportedEncodingException e) {
			// 								// TODO Auto-generated catch block
			// 								e.printStackTrace();
			// 							}
			// 							System.out.println("Value : " + valAsString);

			// 						}

			// 					}

			// 					System.out.println("\n\n Done \n\n");

			// 				}
			// 			}

			// 		}

			// 	}
			// }

			byte[] result;

			// call the chaincode function
			contract.submitTransaction("InitLedger");

			// result = contract.evaluateTransaction("GetAllAssets");
			result = contract.evaluateTransaction("ReadAsset","672");

			// ArrayList<DocumentInfo> docList = new ArrayList<DocumentInfo>();

			String res = new String(result);

			List<String> resSet = Arrays.asList(res.split("/"));

			for(String s : resSet) {
				System.out.println(s);
			}

			// JSONObject jsonObject = new JSONObject(res);
			// DocumentInfo doc = new DocumentInfo();
			// doc.setDocumentNo(jsonObject.getString("documentNo"));
			// doc.setDocumentLink(jsonObject.getString("documentLink"));
			// doc.setDocumentType(jsonObject.getString("documentType"));
			// doc.setDateReceived(jsonObject.getString("dateReceived"));
			// doc.setProjectStage(jsonObject.getString("projectStage"));
			// doc.setDocumentSize(jsonObject.getString("documentSize"));
			// doc.setSentBy(jsonObject.getString("sentBy"));
			// doc.setReceivedBy(jsonObject.getString("receivedBy"));
			// doc.setMainContent(jsonObject.getString("mainContent"));

			// docList.add(doc);




			// JSONArray jsonArray = new JSONArray(res);

			// for (int i = 0; i < jsonArray.length(); i++) {
			// 	JSONObject jsonObject = jsonArray.getJSONObject(i);
			// 	DocumentInfo doc = new DocumentInfo();
			// 	doc.setDocumentNo(jsonObject.getString("documentNo"));
			// 	doc.setDocumentLink(jsonObject.getString("documentLink"));
			// 	doc.setDocumentType(jsonObject.getString("documentType"));
			// 	doc.setDateReceived(jsonObject.getString("dateReceived"));
			// 	doc.setProjectStage(jsonObject.getString("projectStage"));
			// 	doc.setDocumentSize(jsonObject.getString("documentSize"));
			// 	doc.setSentBy(jsonObject.getString("sentBy"));
			// 	doc.setReceivedBy(jsonObject.getString("receivedBy"));
			// 	doc.setMainContent(jsonObject.getString("mainContent"));

			// 	docList.add(doc);
			// }

			return new String(result);
		}
	}

}
