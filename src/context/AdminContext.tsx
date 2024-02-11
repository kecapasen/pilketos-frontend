import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Admin } from "@/types/Types";
interface AdminContextProps {
  admin: Admin;
  setAdmin: Dispatch<SetStateAction<Admin>>;
}
const AdminContext = createContext<AdminContextProps>({
  admin: { isAdmin: null, nama: null, posisi: null },
  setAdmin: () => {},
});
const dataAdmin: Admin = {
  isAdmin: null,
  nama: null,
  posisi: null,
};
const AdminContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState(dataAdmin);
  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
const useAdminContext = (): AdminContextProps => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContext must be used within a AdminContextProvider"
    );
  }
  return context;
};
export { AdminContextProvider, useAdminContext };
