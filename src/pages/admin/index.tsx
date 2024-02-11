import React, { useState, useEffect, lazy } from "react";
import Head from "next/head";
import { instance } from "@/lib/AxiosInstance";
import { useAdminContext } from "@/context/AdminContext";
import alertError from "@/components/alert/AlertError";
const Layout = lazy(() => import("@/layouts/admin/Layout"));
const Login = lazy(() => import("@/layouts/admin/Login"));
const Loading = lazy(() => import("@/components/loading/Loading"));
const Admin = () => {
  const { admin, setAdmin } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  const verify = async (): Promise<void> => {
    try {
      const response = await instance.get("/admin");
      setAdmin({
        ...admin,
        isAdmin: response.data.admin,
        nama: response.data.nama,
        posisi: response.data.posisi,
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  useEffect((): void => {
    setIsLoading(true);
    verify();
    setIsLoading(false);
  }, []);
  return (
    <>
      <Head>
        <title>Admin - Pilketos</title>
      </Head>
      <div className="h-screen w-screen">
        {admin.isAdmin === null || isLoading ? (
          <Loading />
        ) : admin.isAdmin === true ? (
          <Layout />
        ) : admin.isAdmin === false ? (
          <Login />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
export default Admin;
