import { ethers } from "ethers";
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

const deploy = async () => {
const provider = new ethers.JsonRpcProvider(process.env.RPC)
const signer =   new ethers.Wallet(process.env.KEY!, provider)


const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

schemaRegistry.connect(signer);


const schema = "address userAddress, string productId, uint256 timestamp";
const resolverAddress = "0x1B33213630B9B60469d8f4C0B1e671626A16e3d9"; 
const revocable = true; 

const transaction = await schemaRegistry.register({
  schema,
  resolverAddress,
  revocable,
});

const receipt = await transaction.wait();

  

  return receipt;
}

deploy()
