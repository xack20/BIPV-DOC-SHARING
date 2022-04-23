package com.bipv.document.bipvbackend.config;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.hyperledger.fabric.sdk.HFClient;


public class Config {





	public static int peer_org1 = 0;
	public static int peer_org2 = 0;

	public static Map<String, String> ca_ports;

	static {
		ca_ports = new HashMap<>();
		ca_ports.put("org1", "7054");
		ca_ports.put("org2", "8054");
	}


	public static int BLOCK_COUNT = 0;

	public static String baseDir=System.getProperty("user.dir");
	public static final String KEYS_BASE_PATH = baseDir+"/first-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp";

	public static final String ADMIN_PRIVATE_KEY = KEYS_BASE_PATH + File.separator + "keystore";
	public static final String ADMIN_CERT_KEY_PATH = KEYS_BASE_PATH + File.separator + "signcerts";


	public static final String ADMIN_USER_NAME = "admin";
	public static final String MSP = "Org1MSP";
	public static final String CA_AFF = "org1.user";
	public static final String ORG = "Org1MSP";
	
	public static HFClient CLIENT = null; 

	public static final long CHAINCODE_INST_TIME_OUT =500000;

	public static final String AFFILIATION = "org1.user";

	public static final String ADMIN_PASSWORD = "adminpw";
	public static  String CHANNEL_NAME = "channel0-shard0";

	public static final String ORDERER_NAME = "orderer.example.com";
	public static final String ORDERER_URL = "grpc://localhost:7050";
	public static String CHANNEL_CONFIG_PATH = baseDir+"//first-network/channel-artifacts/channel.tx";
	public static final String CA_URL = "http://localhost:7054";


	public static final String PEER_0_NAME = "peer0.org1.example.com";

	public static final String PEER_0_URL = "grpc://localhost:7051";

	public static final String PEER_1_NAME = "peer1.org1.example.com";

	public static final String PEER_1_URL = "grpc://localhost:8051";

	public static final String PEER_2_NAME = "peer0.org2.example.com";
//
	public static final String PEER_2_URL = "grpc://localhost:9051";

	public static final String PEER_3_NAME = "peer1.org2.example.com";

	public static final String PEER_3_URL = "grpc://localhost:10051";
	
	public static final String PEER_4_NAME = "peer0.org3.example.com";

	public static final String PEER_4_URL = "grpc://localhost:11051";
	
	public static final String PEER_5_NAME = "peer1.org3.example.com";

	public static final String PEER_5_URL = "grpc://localhost:12051";

	public static final String PEER_6_NAME = "peer2.org1.example.com";

	public static final String PEER_6_URL = "grpc://localhost:8151";

	public static final String PEER_7_NAME = "peer2.org2.example.com";

	public static final String PEER_7_URL = "grpc://localhost:9151";

	public static final String PEER_8_NAME = "peer2.org3.example.com";

	public static final String PEER_8_URL = "grpc://localhost:12151";

	public static final String PEER_9_NAME = "peer3.org3.example.com";

	public static final String PEER_9_URL = "grpc://localhost:11151";


	public static final String CHAINCODE_ROOT_DIR = "chaincode/chaincode_example02/java";

	public static final String CHAINCODE_NAME = "mycc";

	public static final String CHAINCODE_VERSION = "2";
	public static final String CHAINCODE_ROOT_FOLDER_NAME = "java";

	public static final String ENDORSEMENT_POLICY_PATH=baseDir+"/network/endorsement_policy.yaml";


	public static boolean Tx = false;

	public static String lastTxChannel = "";
	
    public static long TXCNT = 0;

	public static int SHARD_COUNT=3;

	public static int BLOCK_SIZE_LIMIT = 100;

	public static Date date = new Date();

	public static boolean nextTxAllowed = true; 


	public static int moreThanTwoCount = 0;

    public static boolean channelCreationTxBlocked = false;

    // public static int moreThanTwoCount;

	public static void getTimeBetweenTXandBlockEventListener(){
		long milliseconds = new Date().getTime() - Config.date.getTime();

		int seconds = (int) (milliseconds / 1000) % 60 ;
		int minutes = (int) ((milliseconds / (1000*60)) % 60);
									// int hours   = (int) ((milliseconds / (1000*60*60)) % 24);

		System.out.println(String.format("%02d min, %02d sec %03d mili-secs", minutes,seconds,milliseconds%1000));
	}

}
