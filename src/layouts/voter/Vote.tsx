import React, { useState, useEffect } from "react";
import { useVoterContext } from "@/context/VoterContext";
import { instance } from "@/lib/AxiosInstance";
import { Kelas, Jurusan } from "@/types/Types";
import alertError from "@/components/alert/AlertError";
import alertSuccsess from "@/components/alert/AlertSuccess";
import { User, Info, ChevronRight } from "react-feather";
import alertLoading from "@/components/alert/AlertLoading";
import { socket } from "@/lib/Socket";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Vote = () => {
  const { voter, setVoter } = useVoterContext();
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getCalon = async (): Promise<void> => {
    try {
      const response = await instance.get("/calon");
      setCandidates(response.data);
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleUpdateData = async (
    candidateId: number,
    noCandidate: number
  ): Promise<void> => {
    alertLoading();
    const result = await withReactContent(Swal).fire({
      titleText: "Pilih Kandidat?",
      html: `Memilih Kandidat Nomor <span class="font-bold text-stone-800">${noCandidate}</span>`,
      showConfirmButton: true,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Oke",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#f43f5e",
      color: "#57534e",
      icon: "question",
      iconColor: "#0ea5e9",
      customClass: {
        title: "font-['Poppins'] text-xl text-stone-800",
        popup: "font-['Inter'] text-sm font-bold",
        closeButton: "text-stone-600 hover:text-rose-500",
        confirmButton: "mx-4",
        cancelButton: "mx-4",
      },
    });
    if (result.isConfirmed) {
      alertLoading();
      try {
        const response = await instance.patch(`/calon/${candidateId}`, {
          nis: voter.nis,
        });
        socket.emit("update");
        alertSuccsess("Terimakasih Sudah Memilih!");
        setVoter({ isVoter: response.data.voter });
      } catch (error) {
        alertError(error as Error);
      }
    }
  };
  const handleDisplay = async (visi: string, misi: string): Promise<void> => {
    try {
      const visiFormatted = visi.replace(/\n/g, "<br>");
      const misiFormatted = misi.replace(/\n/g, "<br>");
      withReactContent(Swal).fire({
        titleText: "Visi dan Misi",
        html: `<hr class="border mb-2"><strong class="font-['Poppins'] text-md text-stone-800 font-bold">Visi :</strong><br><p class="text-left font-['Inter'] text-md text-stone-600 font-medium">${visiFormatted}</p><br><hr class="border"><br><strong class="font-['Poppins'] text-md text-stone-800 font-bold">Misi :</strong><br><p class="text-left font-['Inter'] text-md text-stone-600 font-medium">${misiFormatted}</p><hr class="border mt-2">`,
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonText: "Tutup",
        confirmButtonColor: "#10b981",
        color: "#57534e",
        customClass: {
          title: "font-['Poppins'] text-xl text-stone-800",
          popup: "font-['Inter'] text-sm font-bold",
          closeButton: "text-stone-600 hover:text-rose-500",
        },
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  useEffect(() => {
    getCalon();
  }, []);
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="sticky bg-stone-100 top-0 z-10 mb-4 px-4 lg:px-8">
        <div className="flex h-24 lg:h-32 w-full">
          <div className="flex justify-end lg:justify-between w-full items-center">
            <div className="hidden lg:block">
              <p className="font-['Poppins'] text-2xl text-stone-800 font-black block">
                Calon Ketua Osis {new Date().getFullYear()} /{" "}
                {new Date().getFullYear() + 1}
              </p>
              <p className="font-['Poppins'] text-lg text-stone-600 font-medium block">
                Selamat datang <span className="font-bold">{voter.nama}</span>{" "}
                👋
              </p>
            </div>
            <div className="flex justify-center items-center bg-white rounded-2xl border shadow-md px-2 py-1">
              <div className="flex justify-center items-center mr-2">
                <div className="p-2 rounded-full bg-slate-100 m-2 border">
                  <User color="#57534e" className="h-6 w-6 lg:h-8 lg:w-8" />
                </div>
                <div className="m-2">
                  <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                    {voter.nama}
                  </p>
                  <p className="font-['Poppins'] text-sm text-stone-600 font-medium block">
                    {voter.kelas} - {voter.jurusan}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full m-auto border rounded-full" />
      </div>
      <div className="px-4 lg:px-8 pb-4 lg:pb-8">
        {candidates === null ? null : isLoading ? null : candidates.length ===
          0 ? null : (
          <div className="mx-auto flex justify-center gap-4 flex-wrap">
            {candidates.map(
              (
                data: {
                  id: number;
                  nama: string;
                  url: string;
                  kelas: Kelas;
                  jurusan: Jurusan;
                  visi: string;
                  misi: string;
                },
                index: number
              ) => (
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
                    <div className="flex justify-around items-center gap-2 w-10/12 mx-auto">
                      <button
                        className="bg-sky-500 rounded-lg p-2 border flex gap-1 items-center align-middle hover:bg-sky-600 cursor-pointer group flex-grow"
                        onClick={(): void => {
                          handleDisplay(data.visi, data.misi);
                        }}
                      >
                        <Info size={20} color="#ffffff" />
                        <p className="font-['Poppins'] text-sm text-white block">
                          Detail
                        </p>
                      </button>
                      <button
                        className="bg-emerald-500 rounded-lg p-2 border flex gap-1 items-center align-middle hover:bg-emerald-600 cursor-pointer group flex-grow"
                        onClick={(): void => {
                          handleUpdateData(data.id, index + 1);
                        }}
                      >
                        <p className="font-['Poppins'] text-sm text-white block">
                          Pilih
                        </p>
                        <ChevronRight
                          size={20}
                          color="#ffffff"
                          className="group-hover:translate-x-[2px] transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Vote;
