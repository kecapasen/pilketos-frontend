import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Voter } from "@/types/Types";
interface VoterContextProps {
  voter: Voter;
  setVoter: Dispatch<SetStateAction<Voter>>;
}
const VoterContext = createContext<VoterContextProps>({
  voter: { isVoter: null, nis: null, nama: null, kelas: null, jurusan: null },
  setVoter: () => {},
});
const dataVoter: Voter = {
  isVoter: null,
  nis: null,
  nama: null,
  kelas: null,
  jurusan: null,
};
const VoterContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [voter, setVoter] = useState(dataVoter);
  return (
    <VoterContext.Provider value={{ voter, setVoter }}>
      {children}
    </VoterContext.Provider>
  );
};
const useVoterContext = (): VoterContextProps => {
  const context = useContext(VoterContext);
  if (!context) {
    throw new Error(
      "useVoterContext must be used within a VoterContextProvider"
    );
  }
  return context;
};
export { VoterContextProvider, useVoterContext };
