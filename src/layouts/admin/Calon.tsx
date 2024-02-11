import React, { useState, useEffect, ReactNode } from "react";
import { Save, PlusCircle, Plus, ArrowLeft } from "react-feather";
import { instance } from "@/lib/AxiosInstance";
import { useForm } from "react-hook-form";
import alertError from "@/components/alert/AlertError";
import alertSuccsess from "@/components/alert/AlertSuccess";
import alertLoading from "@/components/alert/AlertLoading";
import alertDeleteData from "@/components/alert/AlertDeleteData";
import alertDeleteAllData from "@/components/alert/AlertDeleteAllData";
import ButtonDeleteAll from "@/components/button/ButtonDeleteAll";
import { Kelas, Jurusan } from "@/types/Types";
import { useAdminContext } from "@/context/AdminContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const CandidateSchema = z.object({
  image: z.any(),
  nama: z.string().min(1, { message: "Nama is required!" }).max(100),
  kelas: z.nativeEnum(Kelas),
  jurusan: z.nativeEnum(Jurusan),
  visi: z.string().min(1, { message: "Visi is required!" }),
  misi: z.string().min(1, { message: "Misi is required!" }),
});
type Candidate = z.infer<typeof CandidateSchema>;
const dataCandidate: Candidate = {
  image: "",
  nama: "",
  kelas: Kelas.X,
  jurusan: Jurusan.TKR,
  visi: "",
  misi: "",
};
const Calon = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<Candidate>({
    resolver: zodResolver(CandidateSchema),
  });
  const [id, setId] = useState(0);
  const [display, setDisplay] = useState("https://placehold.co/256/png");
  const [candidates, setCandidates] = useState([]);
  const { admin } = useAdminContext();
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getCalon = async (): Promise<void> => {
    try {
      const response = await instance.get("/admin/calon");
      setCandidates(response.data);
    } catch (error) {
      alertError(error as Error);
    }
  };
  const getCalonById = async (data: { id: number }): Promise<void> => {
    try {
      const response = await instance.get(`/admin/calon/${data.id}`);
      setId(response.data.id);
      setValue("nama", response.data.nama);
      setValue("kelas", response.data.kelas);
      setValue("jurusan", response.data.jurusan);
      setValue("visi", response.data.visi);
      setValue("misi", response.data.misi);
      setDisplay(response.data.url);
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleCreateData = async (data: Candidate): Promise<void> => {
    if (!data.image)
      return setError(
        "image",
        { message: "Foto is required!", type: "required" },
        { shouldFocus: false }
      );
    alertLoading();
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("nama", data.nama);
    formData.append("kelas", data.kelas);
    formData.append("jurusan", data.jurusan);
    formData.append("visi", data.visi);
    formData.append("misi", data.misi);
    try {
      await instance.post("/admin/calon", formData);
      reset(dataCandidate);
      setDisplay("https://placehold.co/256/png");
      alertSuccsess("Data Berhasil Dibuat!");
      setIsCreate(false);
      getCalon();
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleUpdateData = async (data: Candidate): Promise<void> => {
    const formData = new FormData();
    alertLoading();
    if (data.image) formData.append("file", data.image[0]);
    formData.append("nama", data.nama);
    formData.append("kelas", data.kelas);
    formData.append("jurusan", data.jurusan);
    formData.append("visi", data.visi);
    formData.append("misi", data.misi);
    try {
      await instance.patch(`/admin/calon/${id}`, formData);
      reset(dataCandidate);
      setDisplay("https://placehold.co/256/png");
      alertSuccsess("Data Berhasil Diupdate!");
      setIsUpdate(false);
      setIsCreate(false);
      getCalon();
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleDeleteData = (
    data: string,
    url: string,
    func: () => void
  ): void => {
    alertDeleteData(data, url, func);
  };
  const handleDeleteAllData = (
    data: number,
    url: string,
    func: () => void
  ): void => {
    alertDeleteAllData(data, url, func);
  };
  useEffect(() => {
    setIsLoading(true);
    reset(dataCandidate);
    setDisplay("https://placehold.co/256/png");
    setIsUpdate(false);
    setIsCreate(false);
    getCalon();
    setIsLoading(false);
  }, [props]);
  return (
    <div className="w-full">
      {isCreate ? (
        <div className="flex justify-center items-center font-['Poppins'] bg-white rounded-2xl border shadow-md">
          <div className="w-full">
            <button
              className="flex items-center m-4 group gap-2"
              onClick={(e) => {
                e.preventDefault();
                setIsCreate(false);
                setIsUpdate(false);
                reset(dataCandidate);
                setDisplay("https://placehold.co/256/png");
              }}
            >
              <ArrowLeft size={20} color="#57534e" />
              <a className="font-['Poppins'] text-sm text-stone-600 font-bold group-hover:underline cursor-pointer">
                Back
              </a>
            </button>
            <hr className="border rounded-full" />
            <form
              onSubmit={
                isUpdate
                  ? handleSubmit(handleUpdateData)
                  : handleSubmit(handleCreateData)
              }
              className="w-full"
              autoComplete="off"
            >
              <div className="text-stone-600 font-bold w-full lg:grid grid-cols-2 gap-4 p-4">
                <div className="flex justify-center items-center col-span-2">
                  <label
                    htmlFor="file"
                    className="h-64 w-64 overflow-hidden rounded-2xl"
                  >
                    <img src={display} alt="display" width={256} height={256} />
                  </label>
                </div>
                <div className="my-2 lg:my-0">
                  <label htmlFor="file">Foto :</label>
                  <input
                    spellCheck={false}
                    type="file"
                    className={`font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full ${
                      errors.image
                        ? `focus:border-rose-500 border-rose-500`
                        : `focus:border-stone-800`
                    } border rounded-lg p-2`}
                    id="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={(e) => {
                      if (e.target && e.target.files) {
                        const uploaded = e.target.files[0] || [];
                        setDisplay(URL.createObjectURL(uploaded));
                      }
                    }}
                  />
                  {errors.image && (
                    <p className="font-['Inter'] text-rose-500 font-bold text-sm mx-1">
                      {errors.image.message as ReactNode}
                    </p>
                  )}
                </div>
                <div className="my-2 lg:my-0">
                  <label htmlFor="nama">Nama :</label>
                  <input
                    spellCheck={false}
                    type="text"
                    className={`font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full ${
                      errors.nama
                        ? `focus:border-rose-500 border-rose-500`
                        : `focus:border-stone-800`
                    } border rounded-lg p-2`}
                    id="nama"
                    {...register("nama")}
                  />
                  {errors.nama && (
                    <p className="font-['Inter'] text-rose-500 font-bold text-sm mx-1">
                      {errors.nama.message}
                    </p>
                  )}
                </div>
                <div className="my-2 lg:my-0">
                  <p>Kelas :</p>
                  <select
                    className="font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full focus:border-stone-800 border rounded-lg p-2 cursor-pointer"
                    id="kelas"
                    {...register("kelas")}
                  >
                    <option value="X">X</option>
                    <option value="XI">XI</option>
                    <option value="XII">XII</option>
                  </select>
                </div>
                <div className="my-2 lg:my-0">
                  <p>Jurusan :</p>
                  <select
                    className="font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full focus:border-stone-800 border rounded-lg p-2 cursor-pointer"
                    id="jurusan"
                    {...register("jurusan")}
                  >
                    <option value="TKR">TKR</option>
                    <option value="TMI">TMI</option>
                    <option value="RPL">RPL</option>
                    <option value="Kuliner">Kuliner</option>
                  </select>
                </div>
                <div className="my-2 lg:my-0">
                  <label htmlFor="visi">Visi :</label>
                  <textarea
                    spellCheck={false}
                    rows={8}
                    className={`font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full ${
                      errors.visi
                        ? `focus:border-rose-500 border-rose-500`
                        : `focus:border-stone-800`
                    } border rounded-lg p-2`}
                    id="visi"
                    {...register("visi")}
                  />
                  {errors.visi && (
                    <p className="font-['Inter'] text-rose-500 font-bold text-sm mx-1">
                      {errors.visi.message}
                    </p>
                  )}
                </div>
                <div className="my-2 lg:my-0">
                  <label htmlFor="misi">Misi :</label>
                  <textarea
                    spellCheck={false}
                    rows={8}
                    className={`font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full ${
                      errors.misi
                        ? `focus:border-rose-500 border-rose-500`
                        : `focus:border-stone-800`
                    } border rounded-lg p-2`}
                    id="misi"
                    {...register("misi")}
                  />
                  {errors.misi && (
                    <p className="font-['Inter'] text-rose-500 font-bold text-sm mx-1">
                      {errors.misi.message}
                    </p>
                  )}
                </div>
              </div>
              <hr className="border rounded-full" />
              <div className="flex justify-end m-4 gap-4">
                {isUpdate ? (
                  <button
                    className="bg-emerald-500 rounded-xl shadow-md p-2 border flex items-center align-middle gap-2 hover:bg-emerald-600 cursor-pointer group"
                    type="submit"
                  >
                    <Save size={24} color="#ffffff" />
                    <p className="font-['Poppins'] text-sm text-white block">
                      Simpan
                    </p>
                  </button>
                ) : (
                  <button
                    className="bg-emerald-500 rounded-xl shadow-md p-2 border flex items-center align-middle gap-2 hover:bg-emerald-600 cursor-pointer group"
                    type="submit"
                  >
                    <Plus size={24} color="#ffffff" />
                    <p className="font-['Poppins'] text-sm text-white block">
                      Buat
                    </p>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className={admin.posisi === "Pengawas" ? "hidden" : "relative"}>
            <div className="flex justify-start gap-4 pb-2 flex-wrap">
              <button
                className="bg-white rounded-xl shadow-md lg:pr-2 border flex items-center hover:bg-slate-50 cursor-pointer group relative"
                onClick={() => {
                  setIsCreate(true);
                }}
              >
                <PlusCircle size={32} color="#10b981" className="m-2" />
                <div className="border-l h-8 border lg:block hidden"></div>
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold lg:block hidden m-2">
                  Tambah
                </p>
              </button>
              <ButtonDeleteAll
                func={() => {
                  const func = async (): Promise<void> => {
                    getCalon();
                  };
                  handleDeleteAllData(candidates.length, "/admin/calon", func);
                }}
              />
            </div>
          </div>
          {candidates === null ? null : isLoading ? null : candidates.length ===
            0 ? null : (
            <div className="mx-auto mt-3 flex justify-center lg:justify-start gap-4 flex-wrap">
              {candidates.map(
                (data: {
                  id: number;
                  nama: string;
                  url: string;
                  kelas: Kelas;
                  jurusan: Jurusan;
                }) => (
                  <div key={data.id}>
                    <div className="bg-white rounded-2xl shadow-md border-2 p-4">
                      <div className="w-48 h-48 rounded-2xl overflow-hidden group">
                        <img
                          src={data.url}
                          alt={data.nama}
                          width={192}
                          height={192}
                          className="mx-auto group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <hr className="border mx-auto w-10/12 my-2" />
                      <div className="flex flex-col justify-center items-center max-w-48">
                        <p className="font-['Poppins'] text-md text-stone-800 font-bold block text-center">
                          {data.nama}
                        </p>
                        <p className="font-['Inter'] text-sm text-stone-600 font-bold block text-center">
                          {data.kelas} - {data.jurusan}
                        </p>
                      </div>
                      <hr className="border mx-auto w-10/12 my-2" />
                      {admin.posisi !== "Pengawas" && (
                        <div className="flex justify-around items-center gap-2 w-10/12 mx-auto">
                          <button
                            className="bg-sky-500 rounded-lg p-2 border flex justify-center items-center align-middle hover:bg-sky-600 cursor-pointer group flex-grow"
                            onClick={() => {
                              getCalonById(data);
                              setIsUpdate(true);
                              setIsCreate(true);
                            }}
                          >
                            <p className="font-['Poppins'] text-sm text-white block">
                              Edit
                            </p>
                          </button>
                          <button
                            className="bg-rose-500 rounded-lg p-2 border flex items-center justify-center align-middle hover:bg-rose-600 cursor-pointer group flex-grow"
                            onClick={() => {
                              handleDeleteData(
                                data.nama,
                                `/admin/calon/${data.id}`,
                                getCalon
                              );
                            }}
                          >
                            <p className="font-['Poppins'] text-sm text-white block">
                              Hapus
                            </p>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Calon;
