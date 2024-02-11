import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import {
  Users,
  Download,
  ShoppingBag,
  Home,
  UserCheck,
  User,
  Truck,
  Package,
  Clipboard,
  PieChart,
} from "react-feather";
const Tugas = () => {
  const data = {
    labels: ["Pensil", "Buku", "Pulpen", "PopMie"],
    datasets: [
      {
        label: "Produk Terlaris",
        data: [7, 5, 5, 3],
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
        max: 10,
      },
    },
  };
  return (
    <>
      <div className="m-auto flex justify-center items-center h-screen w-screen">
        <div className="hidden flex-1 h-full lg:block max-w-48 m-4">
          <div className="flex justify-center items-center h-24 lg:h-32">
            <p className="font-['Poppins'] text-xl text-emerald-500 font-black block">
              Point Of Sale
            </p>
          </div>
          <div>
            <ul>
              <li className="flex items-center w-full">
                <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                <div className="w-full">
                  <hr className="w-10/12 m-auto border rounded-full" />
                  <button className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full">
                    <Home size={20} color="#10b981" />
                    <div className="border-l h-[20px] border border-emerald-500"></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Dashboard
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-full">
                  <button className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full">
                    <Truck size={20} color="#10b981" />
                    <div className="border-l h-[20px] border border-emerald-500"></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Suppliers
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-full">
                  <button className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full">
                    <Users size={20} color="#10b981" />
                    <div className="border-l h-[20px] border border-emerald-500"></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Customers
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-full">
                  <button className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full">
                    <Package size={20} color="#10b981" />
                    <div className="border-l h-[20px] border border-emerald-500"></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Products
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
              <li>
                <div className="w-full">
                  <button className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full">
                    <Clipboard size={20} color="#10b981" />
                    <div className="border-l h-[20px] border border-emerald-500"></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Transaction
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
              <li>
                <div className="w-full">
                  <button className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full">
                    <PieChart size={20} color="#10b981" />
                    <div className="border-l h-[20px] border border-emerald-500"></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Reports
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 h-full bg-stone-100 lg:rounded-l-2xl overflow-y-auto overflow-x-hidden">
          <div className="min-h-screen">
            <div className="sticky top-0 z-10 bg-stone-100 mb-4 px-4 lg:px-8">
              <div className="flex h-24 lg:h-32 w-full">
                <div className="flex justify-end w-full items-center">
                  <div className="flex justify-center items-center bg-white rounded-2xl border shadow-md px-2 py-1">
                    <div className="flex justify-center items-center mr-2 lg:mr-8">
                      <div className="p-2 rounded-full bg-slate-100 m-2 border">
                        <User
                          color="#57534e"
                          className="h-6 w-6 lg:h-8 lg:w-8"
                        />
                      </div>
                      <div className="m-2">
                        <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                          Rizky Maulana
                        </p>
                        <p className="font-['Poppins'] text-sm text-stone-600 font-medium block">
                          Admin
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="w-full m-auto border rounded-full" />
            </div>
            <div className="px-4 lg:px-8 pb-4 lg:pb-8">
              <div className="w-full">
                <p className="font-['Poppins'] text-xl text-stone-600 font-black block my-4">
                  Dashboard
                </p>
                <div className="flex flex-col lg:flex-row justify-between gap-4 pb-2 mb-2 overflow-hidden">
                  <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0">
                    <ShoppingBag size={32} color="#0ea5e9" className="m-2" />
                    <div className="border-l h-[32px] border"></div>
                    <div className="m-2">
                      <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                        6
                      </p>
                      <p className="font-['Inter'] text-sm text-stone-800 font-bold block">
                        Items
                      </p>
                    </div>
                    <div className="absolute right-0 h-full w-1 bg-sky-500"></div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0">
                    <Truck size={32} color="#f59e0b" className="m-2" />
                    <div className="border-l h-[32px] border"></div>
                    <div className="m-2">
                      <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                        4
                      </p>
                      <p className="font-['Inter'] text-sm text-stone-800 font-bold block">
                        Suppliers
                      </p>
                    </div>
                    <div className="absolute right-0 h-full w-1 bg-amber-500"></div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0">
                    <Users size={32} color="#10b981" className="m-2" />
                    <div className="border-l h-[32px] border"></div>
                    <div className="m-2">
                      <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                        3
                      </p>
                      <p className="font-['Inter'] text-sm text-stone-800 font-bold block">
                        Customers
                      </p>
                    </div>
                    <div className="absolute right-0 h-full w-1 bg-emerald-500"></div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md flex-grow flex items-center relative overflow-hidden border py-2 lg:py-0">
                    <UserCheck size={32} color="#f43f5e" className="m-2" />
                    <div className="border-l h-[32px] border"></div>
                    <div className="m-2">
                      <p className="font-['Poppins'] text-sm text-stone-800 font-bold block">
                        3
                      </p>
                      <p className="font-['Inter'] text-sm text-stone-800 font-bold block">
                        Users
                      </p>
                    </div>
                    <div className="absolute right-0 h-full w-1 bg-rose-500"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl mt-2 shadow-md border p-4 flex justify-center items-center">
                  <div className="relative w-full flex justify-center items-center">
                    <button className="rounded-full hover:bg-slate-50 cursor-pointer absolute top-0 right-0">
                      <Download size={24} color="#57534e" className="m-2" />
                    </button>
                    <Bar options={options} data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Tugas;
