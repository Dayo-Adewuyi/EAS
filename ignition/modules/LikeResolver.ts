import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const LikeResolverModule = buildModule("LikeResolverModule", (m) => {
const eas = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e'

  const likeResolver = m.contract("LikeResolver", [eas]);

  return { likeResolver };
});

export default LikeResolverModule;
