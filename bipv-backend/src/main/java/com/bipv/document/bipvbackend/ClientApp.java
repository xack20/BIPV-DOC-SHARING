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
    System.setProperty(
        "org.hyperledger.fabric.sdk.service_discovery.as_localhost",
        "true");
  }

  @Deprecated
  public static Object InitLedger(Map<String, String> payload)
      throws Exception {
    // Load a file system based wallet for managing identities.
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];
    // String PEER = payload.get("org").equals("org1") ?
    // String.valueOf(Config.peer_org1) : String.valueOf(
    // Config.peer_org2);

    // if(ORG.equals("1")) {
    // Config.peer_org1 = (Config.peer_org1 + 1) % 2;
    // } else {
    // Config.peer_org2 = (Config.peer_org2 + 1) % 2;
    // }
    // String PEER = "0";

    // load a CCP
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      byte[] result = contract.submitTransaction("InitLedger");

      return new String(result);
    }
  }

  public static Object GetAllAssets(Map<String, String> payload)
      throws Exception {
    // Load a file system based wallet for managing identities.
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];
    // String PEER = payload.get("org").equals("org1") ?
    // String.valueOf(Config.peer_org1) : String.valueOf(
    // Config.peer_org2);

    // if(ORG.equals("1")) {
    // Config.peer_org1 = (Config.peer_org1 + 1) % 2;
    // } else {
    // Config.peer_org2 = (Config.peer_org2 + 1) % 2;
    // }
    // String PEER = "0";

    // load a CCP
    System.out.println(ORG);
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

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
        // doc.setDocName(jsonObject.getString("documentName"));
        doc.setLastModification(jsonObject.getString("lastModification"));
        // doc.setOwner(jsonObject.getString("ownedBy"));

        doc.setDateReceived(jsonObject.getString("dateReceived"));
        doc.setProjectStage(jsonObject.getString("projectStage"));
        doc.setSentBy(jsonObject.getString("sentBy"));
        doc.setReceivedBy(jsonObject.getString("receivedBy"));
        doc.setMainContent(jsonObject.getString("mainContent"));
        doc.setTransferMessage(jsonObject.getString("transferMessage"));

        docList.add(doc);
      }

      return docList;
    }
  }

  public static Object AddAsset(Map<String, String> payload) throws Exception {
    // Load a file system based wallet for managing identities.
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];

    System.out.println("Entering AddAsset....\nCCP fetching...");
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");
    System.out.println("Building Gateway...");
    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    System.out.println("Connecting to Gateway...");
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      // call the chaincode function
      System.out.println("Calling chaincode...");
      try {
        contract.submitTransaction(
            "CreateAsset",
            payload.get("documentNo"),
            payload.get("documentType"),
            payload.get("projectStage"),
            payload.get("documentSize"),
            payload.get("mainContent"),
            payload.get("documentLink"));
      } catch (Exception e) {
        return e.getMessage();
      }
      System.out.println("Transaction has been submitted");
      return ReadAsset(payload);
      // return "Transaction has been submitted";  
    }
  }

  public static Object UpdateAsset(Map<String, String> payload)
      throws Exception {
    // Load a file system based wallet for managing identities.
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];
    // String PEER = payload.get("org").equals("org1") ?
    // String.valueOf(Config.peer_org1) : String.valueOf(
    // Config.peer_org2);

    // if(ORG.equals("1")) {
    // Config.peer_org1 = (Config.peer_org1 + 1) % 2;
    // } else {
    // Config.peer_org2 = (Config.peer_org2 + 1) % 2;
    // }
    // String PEER = "0";

    // load a CCP
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      // call the chaincode function
      contract.submitTransaction(
          "UpdateAsset",
          payload.get("documentNo"),
          payload.get("documentType"),
          payload.get("projectStage"),
          payload.get("documentSize"),
          payload.get("mainContent"),
          payload.get("documentLink"));

      return ReadAsset(payload);
    }
  }

  public static Object ReadAsset(Map<String, String> payload) throws Exception {
    // Load a file system based wallet for managing identities.
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];

    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      System.out.println("Making asset...");
      byte[] result = contract.evaluateTransaction(
          "ReadAsset",
          payload.get("documentNo"));

      System.out.println("making POJO........");
      String res = new String(result);

      System.out.println("res: " + res);

      JSONObject jsonObject = new JSONObject(res);
      DocumentInfo doc = new DocumentInfo();

      doc.setDocumentNo(jsonObject.getString("documentNo"));
      // doc.setId(jsonObject.getString("id"));
      doc.setDocumentLink(jsonObject.getString("documentLink"));
      doc.setDocumentType(jsonObject.getString("documentType"));
      doc.setDocumentSize(jsonObject.getString("documentSize"));
      // doc.setDocName(jsonObject.getString("documentName"));
      doc.setLastModification(jsonObject.getString("lastModification"));
      // doc.setOwner(jsonObject.getString("ownedBy"));

      doc.setDateReceived(jsonObject.getString("dateReceived"));
      doc.setProjectStage(jsonObject.getString("projectStage"));
      doc.setSentBy(jsonObject.getString("sentBy"));
      doc.setReceivedBy(jsonObject.getString("receivedBy"));
      doc.setMainContent(jsonObject.getString("mainContent"));
      doc.setTransferMessage(jsonObject.getString("transferMessage"));
      System.out.println("POJO made");
      return doc;
    }
  }

  public static Object DeleteAsset(Map<String, String> payload)
      throws Exception {
    // Load a file system based wallet for managing identities.
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];
    // String PEER = payload.get("org").equals("org1") ?
    // String.valueOf(Config.peer_org1) : String.valueOf(
    // Config.peer_org2);

    // if(ORG.equals("1")) {
    // Config.peer_org1 = (Config.peer_org1 + 1) % 2;
    // } else {
    // Config.peer_org2 = (Config.peer_org2 + 1) % 2;
    // }
    // String PEER = "0";

    // load a CCP
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    // Path networkConfigPath = Paths.get(
    // System.getProperty("user.dir")+"/bipv-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1-peer0.json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      contract.submitTransaction("DeleteAsset", payload.get("documentNo"));

      return GetAllAssets(payload);
    }
  }

  public static Object GetID(Map<String, String> payload) throws Exception {
    // Load a file system based wallet for managing identities.
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];
    // String PEER = payload.get("org").equals("org1") ?
    // String.valueOf(Config.peer_org1) : String.valueOf(
    // Config.peer_org2);

    // if(ORG.equals("1")) {
    // Config.peer_org1 = (Config.peer_org1 + 1) % 2;
    // } else {
    // Config.peer_org2 = (Config.peer_org2 + 1) % 2;
    // }
    // String PEER = "0";

    // load a CCP
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      byte[] result = contract.evaluateTransaction("GetID");

      return new String(result);
    }
  }

  public static Object TransferAsset(Map<String, String> payload)
      throws Exception {
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = "1";
    // String PEER = "0";

    // load a CCP
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      contract.submitTransaction(
          "TransferAsset",
          payload.get("documentNo"),
          payload.get("newOwner"),
          payload.get("transferMessage"));

      return ReadAsset(payload);
    }
  }

  public static Object DeletedAssetInfo(Map<String, String> payload)
      throws Exception {
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];

    // load a CCP
    System.out.println(ORG);
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      byte[] result;

      result = contract.evaluateTransaction(
          "GetHistoryForAsset",
          payload.get("documentNo"));

      String res = new String(result);

      JSONObject jsonObject = new JSONObject(res);

      DocumentInfo doc = new DocumentInfo();

      jsonObject = jsonObject.getJSONObject("Record");

      doc.setDocumentNo(jsonObject.getString("documentNo"));
      // doc.setId(jsonObject.getString("id"));
      doc.setDocumentLink(jsonObject.getString("documentLink"));
      doc.setDocumentType(jsonObject.getString("documentType"));
      doc.setDocumentSize(jsonObject.getString("documentSize"));
      // doc.setDocName(jsonObject.getString("documentName"));
      doc.setLastModification(jsonObject.getString("lastModification"));
      // doc.setOwner(jsonObject.getString("ownedBy"));

      doc.setDateReceived(jsonObject.getString("dateReceived"));
      doc.setProjectStage(jsonObject.getString("projectStage"));
      doc.setSentBy(jsonObject.getString("sentBy"));
      doc.setReceivedBy(jsonObject.getString("receivedBy"));
      doc.setMainContent(jsonObject.getString("mainContent"));
      doc.setTransferMessage(jsonObject.getString("transferMessage"));

      return doc;
    }
  }

  public static Object AssetHistory(Map<String, String> payload)
      throws Exception {
    Path walletPath = Paths.get("wallet");
    Wallet wallet = Wallets.newFileSystemWallet(walletPath);

    String ORG = payload.get("org").split("org")[1];

    // load a CCP
    System.out.println(ORG);
    Path networkConfigPath = Paths.get(
        System.getProperty("user.dir") +
            "/bipv-network/test-network/organizations/peerOrganizations/org" +
            ORG +
            ".example.com/connection-org" +
            ORG +
            ".json");

    Gateway.Builder builder = Gateway
        .createBuilder()
        .identity(wallet, payload.get("userName"))
        .networkConfig(networkConfigPath)
        .discovery(true);

    // create a gateway connection
    try (Gateway gateway = builder.connect()) {
      // get the network and contract
      Network network = gateway.getNetwork(payload.get("channel"));
      Contract contract = network.getContract(payload.get("chaincode"));

      byte[] result;

      result = contract.evaluateTransaction(
          "GetAssetHistory",
          payload.get("documentNo"));

      ArrayList<DocumentInfo> docList = new ArrayList<DocumentInfo>();

      String res = new String(result);

      JSONArray jsonArray = new JSONArray(res);

      for (int i = 0; i < jsonArray.length(); i++) {
        JSONObject jsonObject = jsonArray.getJSONObject(i);
        jsonObject = jsonObject.getJSONObject("Record");

        DocumentInfo doc = new DocumentInfo();

        doc.setDocumentNo(jsonObject.getString("documentNo"));
        // doc.setId(jsonObject.getString("id"));
        doc.setDocumentLink(jsonObject.getString("documentLink"));
        doc.setDocumentType(jsonObject.getString("documentType"));
        doc.setDocumentSize(jsonObject.getString("documentSize"));
        // doc.setDocName(jsonObject.getString("documentName"));
        doc.setLastModification(jsonObject.getString("lastModification"));
        // doc.setOwner(jsonObject.getString("ownedBy"));

        doc.setDateReceived(jsonObject.getString("dateReceived"));
        doc.setProjectStage(jsonObject.getString("projectStage"));
        doc.setSentBy(jsonObject.getString("sentBy"));
        doc.setReceivedBy(jsonObject.getString("receivedBy"));
        doc.setMainContent(jsonObject.getString("mainContent"));
        doc.setTransferMessage(jsonObject.getString("transferMessage"));

        docList.add(doc);
      }

      return docList;
    }
  }

}
