import { useContract, useContractWrite, useAccount } from "wagmi";
import TokenAABI from "../abis/TokenA.json";

const tokenAddress = "0xYourTokenAAddress";

export function useTokenA() {
  const { address } = useAccount();
  const contract = useContract({
    address: tokenAddress,
    abi: TokenAABI,
  });

  const { write: transfer } = useContractWrite({
    address: tokenAddress,
    abi: TokenAABI,
    functionName: "transfer",
  });

  return { contract, transfer };
}
