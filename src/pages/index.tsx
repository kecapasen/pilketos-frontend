import React, { useState, useEffect, lazy } from "react";
import Head from "next/head";
import { instance } from "@/lib/AxiosInstance";
import { useVoterContext } from "@/context/VoterContext";
import alertError from "@/components/alert/AlertError";
const Vote = lazy(() => import("@/layouts/voter/Vote"));
const Login = lazy(() => import("@/layouts/voter/Login"));
const Loading = lazy(() => import("@/components/loading/Loading"));
const Voter = () => {
  const { voter, setVoter } = useVoterContext();
  const [isLoading, setIsLoading] = useState(false);
  const verify = async (): Promise<void> => {
    try {
      const response = await instance.get("/");
      setVoter({
        ...voter,
        isVoter: response.data.voter,
        nis: response.data.nis,
        nama: response.data.nama,
        kelas: response.data.kelas,
        jurusan: response.data.jurusan,
        candidateId: response.data.candidateId || null,
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
        <title>Vote - Pilketos</title>
      </Head>
      <div className="h-screen w-screen">
        {voter.isVoter === null || isLoading ? (
          <Loading />
        ) : voter.isVoter === true ? (
          <Vote />
        ) : voter.isVoter === false ? (
          <Login />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
export default Voter;
