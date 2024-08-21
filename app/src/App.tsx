import { useAccount, useConnect, useDisconnect } from "wagmi";
import { SchemaEncoder, EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useState } from "react";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [productUid, setProductUid] = useState("")

  const uid =
    "0x702038cca61dc5fcc4e29d84c2a5c33c0edb0b98462b6a6866b7af837d49c699";
  const eas = new EAS("0xC2679fBD37d54388Ce493F1DB75320D236e1815e");

  function generateRandomProductId() {
    const randomId = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
    return `product-id-${randomId}`;
  }
  async function likeProduct() {
    if (account.status !== "connected") {
      console.error("User is not connected");
      return;
    }
      let productId = generateRandomProductId()
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    eas.connect(signer);

    const timestamp = Math.floor(Date.now() / 1000);
    const userAddress = account.address?.toString();
    const schemaEncoder = new SchemaEncoder(
      "address userAddress, string productId, uint256 timestamp"
    );
    const encodedData = schemaEncoder.encodeData([
      { name: "userAddress", value: userAddress, type: "address" },
      { name: "productId", value: productId, type: "string" },
      { name: "timestamp", value: timestamp, type: "uint256" },
    ]);

    try {
      const tx = await eas.attest({
        schema: uid,
        data: {
          recipient: userAddress!,
          expirationTime: BigInt(0),
          revocable: true,
          data: encodedData
        },
      });

     const receipt =  await tx.wait();
      // this should be stored in a db in future when we are ready to build this feature
     setProductUid(receipt)
      toast.success("Product liked successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("an error occurred!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.trace(error);
    }
  }

  async function dislike() {
    if (account.status !== "connected") {
      console.error("User is not connected");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    eas.connect(signer);

    try {
      
      const transaction = await eas.revoke({
        schema: uid,
        data: {
          uid: productUid,
        },
      });

      await transaction.wait();

      toast.success("Product disliked successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error("an error occurred!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <div>
        <h2 className="header">RATE THE LYRICS</h2>

        {account.status === "connected" && (
          <div className="app">
            <div className="card">
              <h1 className="card-title">DRAKE _ ONE DANCE</h1>
              <p className="card-subtitle">I need a one dance ...</p>
              <div className="card-buttons">
                <button
                  className="like-button"
                  onClick={() => likeProduct()}
                >
                  Like
                </button>
                <button className="dislike-button" onClick={dislike}>
                  Dislike
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {account.status !== "connected" && (
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
