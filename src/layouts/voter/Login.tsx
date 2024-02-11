import React, { useEffect } from "react";
import Image from "next/image";
import { User, Lock } from "react-feather";
import { instance } from "@/lib/AxiosInstance";
import { useForm } from "react-hook-form";
import alertError from "@/components/alert/AlertError";
import { useVoterContext } from "@/context/VoterContext";
import { Jurusan, Kelas } from "@/types/Types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const LoginSchema = z.object({
  nis: z.string().min(1, { message: "NIS is required!" }).max(10),
  password: z.string().max(100),
});
type Login = {
  nis: string;
  password: string;
};
const dataLogin: Login = {
  nis: "",
  password: "",
};
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });
  const { setVoter } = useVoterContext();
  const handleLogin = async (data: Login) => {
    try {
      const response = await instance.post("/", data);
      setVoter({
        isVoter: response.data.voter,
        nis: response.data.nis,
        nama: response.data.nama,
        kelas: response.data.kelas as Kelas,
        jurusan: response.data.jurusan as Jurusan,
        candidateId: response.data.candidateId || null,
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  useEffect(() => {
    reset(dataLogin);
  }, []);
  return (
    <>
      <div className="m-auto flex justify-center items-center h-screen w-screen select-none p-8">
        <div className="flex justify-center items-center lg:shadow-md lg:rounded-2xl lg:border-2 relative bg-stone-50">
          <div className="flex-1 flex justify-center items-center lg:h-[500px] relative overflow-hidden lg:rounded-tl-2xl">
            <svg
              className="hidden lg:block absolute z-10 max-w-xs -top-36 -left-36"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#10B981"
                d="M46.1,-78.2C60.3,-71.7,72.8,-60.5,80.9,-46.6C89,-32.8,92.8,-16.4,91.9,-0.5C90.9,15.4,85.4,30.7,77.2,44.4C69,58.1,58.2,70.1,44.9,77.8C31.6,85.5,15.8,88.9,0.1,88.6C-15.5,88.4,-31,84.5,-44,76.6C-56.9,68.7,-67.3,56.8,-74.3,43.4C-81.2,29.9,-84.7,15,-86,-0.8C-87.3,-16.5,-86.4,-32.9,-79.1,-45.7C-71.8,-58.5,-58.1,-67.7,-43.8,-74.2C-29.6,-80.7,-14.8,-84.6,0.6,-85.6C16,-86.6,31.9,-84.8,46.1,-78.2Z"
                transform="translate(100 100)"
              />
            </svg>
            <div className="z-10 w-full h-full flex justify-center items-center">
              <div className="border-2 lg:border-0 rounded-2xl p-8">
                <p className="font-['Montserrat'] font-black text-4xl text-stone-800 text-center p-1">
                  LOGIN
                </p>
                <p className="font-['Poppins'] font-medium text-lg text-stone-500 text-center p-1">
                  Silahkan login untuk melanjutkan
                </p>
                <form onSubmit={handleSubmit(handleLogin)}>
                  <hr className="w-10/12 mx-auto border rounded-full my-4" />
                  <div className="flex items-center bg-slate-200 mx-auto max-w-xs py-2 rounded-xl px-2">
                    <User size={24} color="#57534e" />
                    <div className="border-l h-[20px] border border-stone-600 mx-1"></div>
                    <input
                      spellCheck={false}
                      className={`font-['Inter'] text-stone-600 font-bold outline-none bg-transparent w-full mx-1 ${
                        errors.nis && `focus:border-rose-500 border-rose-500`
                      }`}
                      placeholder="NIS"
                      type="number"
                      {...register("nis")}
                    />
                  </div>
                  <p
                    className={`font-['Inter'] ${
                      errors.nis ? `text-rose-500` : `text-stone-500`
                    } font-bold text-sm m-1`}
                  >
                    {errors.nis ? errors.nis.message : "e.g. 1234567"}
                  </p>
                  <div className="flex items-center bg-slate-200 mx-auto max-w-xs py-2 rounded-xl px-2">
                    <Lock size={24} color="#57534e" />
                    <div className="border-l h-[20px] border border-stone-600 mx-1"></div>
                    <input
                      spellCheck={false}
                      className="font-['Inter'] text-stone-600 font-bold outline-none bg-transparent w-full mx-1"
                      placeholder="Password"
                      type="text"
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <p className="font-['Inter'] text-rose-500 font-bold text-sm m-1">
                      {errors.password.message}
                    </p>
                  )}
                  <hr className="w-10/12 m-auto border rounded-full my-4" />
                  <button
                    className="block mx-auto py-2 font-['Poppins'] my-4 text-white font-bold px-8 bg-emerald-500 rounded-xl shadow-md hover:scale-105 transition-all"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-1 h-[500px] bg-cover justify-center items-center relative overflow-hidden rounded-br-2xl p-8">
            <svg
              className="absolute z-10 max-w-xs -bottom-36 -right-36"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#10B981"
                d="M46.1,-78.2C60.3,-71.7,72.8,-60.5,80.9,-46.6C89,-32.8,92.8,-16.4,91.9,-0.5C90.9,15.4,85.4,30.7,77.2,44.4C69,58.1,58.2,70.1,44.9,77.8C31.6,85.5,15.8,88.9,0.1,88.6C-15.5,88.4,-31,84.5,-44,76.6C-56.9,68.7,-67.3,56.8,-74.3,43.4C-81.2,29.9,-84.7,15,-86,-0.8C-87.3,-16.5,-86.4,-32.9,-79.1,-45.7C-71.8,-58.5,-58.1,-67.7,-43.8,-74.2C-29.6,-80.7,-14.8,-84.6,0.6,-85.6C16,-86.6,31.9,-84.8,46.1,-78.2Z"
                transform="translate(100 100)"
              />
            </svg>
            <div className="z-10 w-full h-full flex justify-center items-center relative">
              <Image
                src="/login.svg"
                alt="Login"
                priority={true}
                width={512}
                height={512}
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
