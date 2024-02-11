import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Volume2, Users, CheckCircle, XCircle, Download } from "react-feather";
import { Bar } from "react-chartjs-2";
import { socket } from "@/lib/Socket";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type Dashboard = {
  pemilih: number | null;
  sudah: number | null;
  belum: number | null;
  label: string[];
  data: number[];
};
const dataDashboard: Dashboard = {
  pemilih: null,
  sudah: null,
  belum: null,
  label: [],
  data: [],
};
const Dashboard = (props: any) => {
  const chartRef = useRef<any>(null);
  const [dashboard, setDashboard] = useState(dataDashboard);
  const [isLoading, setIsLoading] = useState(false);
  const data = {
    labels: dashboard.label,
    datasets: [
      {
        label: "Jumlah Suara",
        data: dashboard.data,
        backgroundColor: [
          "rgba(244,63,94,0.7)",
          "rgba(245,158,11,0.7)",
          "rgba(16,185,129,0.7)",
          "rgba(14,165,233,0.7)",
        ],
        borderColor: "#e2e8f0",
        borderWidth: 2,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        max:
          Math.max(...dashboard.data) <= 100
            ? Math.max(...dashboard.data) + 2
            : Math.max(...dashboard.data) <= 500
            ? Math.max(...dashboard.data) + 10
            : Math.max(...dashboard.data) <= 1000
            ? Math.max(...dashboard.data) + 20
            : Math.max(...dashboard.data) + 20,
      },
    },
  };
  const downloadChart = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = chartRef.current.toBase64Image();
    link.click();
  }, []);
  useEffect(() => {
    socket.emit("update");
    socket.on("dashboardUpdate", (update: any) => {
      setDashboard({
        pemilih: update.count,
        sudah: update.countNotNull,
        belum: update.countNull,
        label: update.result.map(
          (data: { candidateNama: string }) => data.candidateNama
        ),
        data: update.result.map(
          (data: { candidateSuara: number }) => data.candidateSuara
        ),
      });
    });
  }, []);
  return (
    <>
      {dashboard.belum === null || isLoading ? (
        <>
          <div className="flex flex-col lg:flex-row justify-between gap-4 pb-2 mb-2 overflow-hidden">
            <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0 max-w-full">
              <div className="m-2 w-8 h-8 bg-gray-200 rounded fadeInOut"></div>
              <div className="border-l h-[32px] border-gray-200 fadeInOut"></div>
              <div className="m-2 flex flex-col gap-2">
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold block h-4 w-16 rounded bg-gray-200 fadeInOut"></p>
                <p className="font-['Inter'] text-sm text-stone-800 font-bold block h-4 w-32 rounded bg-gray-200 fadeInOut"></p>
              </div>
              <div className="absolute right-0 h-full w-1"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0 max-w-full">
              <div className="m-2 w-8 h-8 bg-gray-200 rounded fadeInOut"></div>
              <div className="border-l h-[32px] border-gray-200 fadeInOut"></div>
              <div className="m-2 flex flex-col gap-2">
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold block h-4 w-16 rounded bg-gray-200 fadeInOut"></p>
                <p className="font-['Inter'] text-sm text-stone-800 font-bold block h-4 w-32 rounded bg-gray-200 fadeInOut"></p>
              </div>
              <div className="absolute right-0 h-full w-1"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0 max-w-full">
              <div className="m-2 w-8 h-8 bg-gray-200 rounded fadeInOut"></div>
              <div className="border-l h-[32px] border-gray-200 fadeInOut"></div>
              <div className="m-2 flex flex-col gap-2">
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold block h-4 w-16 rounded bg-gray-200 fadeInOut"></p>
                <p className="font-['Inter'] text-sm text-stone-800 font-bold block h-4 w-32 rounded bg-gray-200 fadeInOut"></p>
              </div>
              <div className="absolute right-0 h-full w-1"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0 max-w-full">
              <div className="m-2 w-8 h-8 bg-gray-200 rounded fadeInOut"></div>
              <div className="border-l h-[32px] border-gray-200 fadeInOut"></div>
              <div className="m-2 flex flex-col gap-2">
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold block h-4 w-16 rounded bg-gray-200 fadeInOut"></p>
                <p className="font-['Inter'] text-sm text-stone-800 font-bold block h-4 w-32 rounded bg-gray-200 fadeInOut"></p>
              </div>
              <div className="absolute right-0 h-full w-1"></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl mt-2 shadow-md border p-4 flex justify-center items-center fadeInOut max-w-full h-[100vw] lg:h-screen">
            <div className="relative w-full flex justify-center items-center">
              <div className="w-full h-full"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <div className="flex flex-col lg:flex-row justify-between gap-4 pb-2 mb-2 overflow-hidden">
            <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0">
              <Volume2 size={32} color="#0ea5e9" className="m-2" />
              <div className="border-l h-[32px] border"></div>
              <div className="m-2">
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                  {((dashboard.sudah! / dashboard.pemilih!) * 100)
                    .toString()
                    .slice(0, 4)}
                  %
                </p>
                <p className="font-['Inter'] text-sm text-stone-800 font-bold block">
                  Suara Masuk
                </p>
              </div>
              <div className="absolute right-0 h-full w-1 bg-sky-500"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0">
              <Users size={32} color="#f59e0b" className="m-2" />
              <div className="border-l h-[32px] border"></div>
              <div className="m-2">
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                  {dashboard.pemilih}
                </p>
                <p className="font-['Inter'] text-sm text-stone-800 font-bold block">
                  Jumlah Pemilih
                </p>
              </div>
              <div className="absolute right-0 h-full w-1 bg-amber-500"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0">
              <CheckCircle size={32} color="#10b981" className="m-2" />
              <div className="border-l h-[32px] border"></div>
              <div className="m-2">
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                  {dashboard.sudah}
                </p>
                <p className="font-['Inter'] text-sm text-stone-800 font-bold block">
                  Sudah Memilih
                </p>
              </div>
              <div className="absolute right-0 h-full w-1 bg-emerald-500"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0">
              <XCircle size={32} color="#f43f5e" className="m-2" />
              <div className="border-l h-[32px] border"></div>
              <div className="m-2">
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                  {dashboard.belum}
                </p>
                <p className="font-['Inter'] text-sm text-stone-800 font-bold block">
                  Belum Memilih
                </p>
              </div>
              <div className="absolute right-0 h-full w-1 bg-rose-500"></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl mt-2 shadow-md border p-4 flex justify-center items-center">
            <div className="relative w-full flex justify-center items-center">
              <button
                className="rounded-full hover:bg-slate-50 cursor-pointer absolute top-0 right-0"
                onClick={downloadChart}
              >
                <Download size={24} color="#57534e" className="m-2" />
              </button>
              <Bar options={options} data={data} ref={chartRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
