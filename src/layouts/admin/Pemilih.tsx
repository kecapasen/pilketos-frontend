import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import alertSuccess from "@/components/alert/AlertSuccess";
import alertError from "@/components/alert/AlertError";
import alertLoading from "@/components/alert/AlertLoading";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useForm } from "react-hook-form";
import { instance } from "@/lib/AxiosInstance";
import { Jurusan, Kelas } from "@/types/Types";
import {
  PlusCircle,
  Plus,
  Upload,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  ArrowLeft,
} from "react-feather";
import "animate.css";
import alertDeleteAllData from "@/components/alert/AlertDeleteAllData";
import alertDeleteData from "@/components/alert/AlertDeleteData";
import ButtonDeleteAll from "@/components/button/ButtonDeleteAll";
import { useAdminContext } from "@/context/AdminContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const TableSchema = z.object({
  page: z.number(),
  limit: z.number(),
  search: z.string(),
  offset: z.number(),
  totalPages: z.number(),
  totalRows: z.number(),
  totalDatas: z.number(),
  siswa: z.union([
    z.array(
      z.object({
        nis: z.number(),
        nama: z.string(),
        kelas: z.nativeEnum(Kelas),
        jurusan: z.nativeEnum(Jurusan),
        candidatesId: z.number(),
      })
    ),
    z.null(),
  ]),
});
const VoterSchema = z
  .object({
    nis: z.union([
      z.number(),
      z.string().min(1, { message: "NIS is required!" }).max(10),
      z.nan(),
    ]),
    nama: z.string().min(1, { message: "Nama is required!" }).max(100),
    password: z.string().max(100),
    kelas: z.nativeEnum(Kelas),
    jurusan: z.nativeEnum(Jurusan),
  })
  .required();
type Table = z.infer<typeof TableSchema>;
type Voter = z.infer<typeof VoterSchema>;
const dataTable: Table = {
  page: 1,
  limit: 10,
  search: "",
  offset: 0,
  totalPages: 0,
  totalRows: 0,
  totalDatas: 0,
  siswa: null,
};
const dataVoter: Voter = {
  nis: "",
  nama: "",
  password: "",
  kelas: Kelas.X,
  jurusan: Jurusan.TKR,
};
const Pemilih = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<Voter>({
    resolver: zodResolver(VoterSchema),
  });
  const { admin } = useAdminContext();
  const [keyword, setKeyword] = useState("");
  const [nis, setNis] = useState(0);
  const [search] = useDebounce(keyword, 500);
  const [tableData, setTableData] = useState(dataTable);
  const { page, limit, offset, totalPages, totalRows, totalDatas, siswa } =
    tableData;
  const [isToggle, setIsToggle] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickOutside = (e: any) => {
    const toggleButton = document.getElementById("toggle-button");
    const toggleElement = document.getElementById("toggle-element");
    if (
      toggleButton &&
      !toggleElement?.contains(e.target) &&
      !toggleButton.contains(e.target)
    )
      setIsToggle(false);
  };
  const getPemilih = async (): Promise<void> => {
    try {
      const response = await instance.get("/admin/siswa", {
        params: {
          page,
          limit,
          search,
        },
      });
      setTableData({
        ...tableData,
        offset: response.data.offset,
        totalPages: response.data.totalPages,
        totalRows: response.data.totalRows,
        totalDatas: response.data.totalData,
        siswa: response.data.result,
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleCreateData = async (data: Voter): Promise<void> => {
    alertLoading();
    try {
      await instance.post("/admin/siswa", data);
      alertSuccess("Data Berhasil Dibuat!");
      setIsCreate(false);
      reset(dataVoter);
      getPemilih();
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleImportData = async (): Promise<void> => {
    const { value: file } = await withReactContent(Swal).fire({
      titleText: "Pilih File Excel",
      input: "file",
      showConfirmButton: true,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Oke",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#3b82f6",
      color: "#57534e",
      icon: "question",
      inputAttributes: {
        accept: ".xlsx, .xls",
        "aria-label": "Upload your Excel file",
      },
      customClass: {
        title: "font-['Poppins'] text-xl text-stone-800",
        popup: "font-['Inter'] text-sm font-bold",
        closeButton: "text-stone-600 hover:text-rose-500",
        confirmButton: "mx-4",
        cancelButton: "mx-4",
      },
    });
    if (!file) return alertError({ message: "Tidak Ada File yang Diupload!" });
    alertLoading(file);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await instance.post("/admin/import", formData);
      alertSuccess("File Berhasil Diupload!");
      getPemilih();
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleUpdateData = async (data: Voter): Promise<void> => {
    alertLoading();
    try {
      await instance.patch(`/admin/siswa/${nis}`, data);
      alertSuccess("Data Berhasil Diubah!");
      setIsUpdate(false);
      setIsCreate(false);
      reset(dataVoter);
      getPemilih();
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleDeleteData = (data: string, url: string, func: () => void) => {
    alertDeleteData(data, url, func);
  };
  const handleDeleteAllData = (data: number, url: string, func: () => void) => {
    alertDeleteAllData(data, url, func);
  };
  const handlePage = useDebouncedCallback((value: number) => {
    setTableData({ ...tableData, page: value });
  }, 200);
  useEffect(() => {
    setIsLoading(true);
    reset(dataVoter);
    setIsUpdate(false);
    setIsCreate(false);
    getPemilih();
    setIsLoading(false);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props]);
  useEffect(() => {
    getPemilih();
  }, [search, page, limit]);
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
                reset(dataVoter);
              }}
            >
              <ArrowLeft size={20} color="#57534e" />
              <a className="font-['Poppins'] text-sm text-stone-600 font-bold group-hover:underline cursor-pointer">
                Back
              </a>
            </button>
            <form
              onSubmit={
                isUpdate
                  ? handleSubmit(handleUpdateData)
                  : handleSubmit(handleCreateData)
              }
              className="w-full"
              autoComplete="off"
            >
              <hr className="border rounded-full" />
              <div className="text-stone-600 font-bold p-4 w-full lg:grid grid-cols-2 gap-4">
                <div className="my-2 lg:my-0">
                  <label htmlFor="nis">NIS :</label>
                  <input
                    spellCheck={false}
                    type="number"
                    className={`font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full ${
                      errors.nis
                        ? `focus:border-rose-500 border-rose-500`
                        : `focus:border-stone-800`
                    } border rounded-lg p-2`}
                    id="nis"
                    {...register("nis")}
                  />
                  {errors.nis && (
                    <p className="font-['Inter'] text-rose-500 font-bold text-sm mx-1">
                      {errors.nis.message}
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
                  <label htmlFor="password">Password :</label>
                  <input
                    spellCheck={false}
                    type="text"
                    className={`font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full ${
                      errors.password
                        ? `border-rose-500`
                        : `focus:border-stone-800`
                    } border rounded-lg p-2`}
                    id="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="font-['Inter'] text-rose-500 font-bold text-sm mx-1">
                      {errors.password.message}
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
              </div>
              <hr className="border rounded-full" />
              <div className="flex justify-start flex-row-reverse m-4 gap-4">
                {isUpdate ? (
                  <>
                    <button
                      className="bg-emerald-500 rounded-xl shadow-md p-2 border flex items-center align-middle gap-2 hover:bg-emerald-600 cursor-pointer group"
                      type="submit"
                    >
                      <Save size={24} color="#ffffff" />
                      <p className="font-['Poppins'] text-sm text-white block">
                        Simpan
                      </p>
                    </button>
                    <button
                      className="bg-rose-500 rounded-xl shadow-md p-2 border flex items-center align-middle gap-2 hover:bg-red-600 cursor-pointer group"
                      onClick={(e) => {
                        e.preventDefault();
                        const func = () => {
                          reset(dataVoter);
                          setIsUpdate(false);
                          setIsCreate(false);
                          getPemilih();
                        };
                        handleDeleteData(
                          getValues("nama"),
                          `/admin/siswa/${nis}`,
                          func
                        );
                      }}
                    >
                      <Trash2 size={24} color="#ffffff" />
                      <p className="font-['Poppins'] text-sm text-white block">
                        Hapus
                      </p>
                    </button>
                  </>
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
                id="toggle-button"
                className="bg-white rounded-xl shadow-md lg:pr-2 border flex items-center hover:bg-slate-50 cursor-pointer group relative"
                onClick={() => {
                  setIsToggle(!isToggle);
                }}
              >
                <PlusCircle size={32} color="#10b981" className="m-2" />
                <div className="border-l h-8 border lg:block hidden"></div>
                <p className="font-['Poppins'] text-sm text-stone-800 font-bold lg:block hidden m-2">
                  Tambah
                </p>
                {isToggle ? (
                  <ChevronLeft
                    size={16}
                    color="#57534e"
                    className="hidden lg:block"
                  />
                ) : (
                  <ChevronRight
                    size={16}
                    color="#57534e"
                    className="hidden lg:block"
                  />
                )}
              </button>
              <ButtonDeleteAll
                func={() => {
                  const func = () => {
                    setTableData({
                      ...dataTable,
                      offset: 0,
                      totalRows: 0,
                      totalPages: 0,
                      totalDatas: 0,
                      siswa: [],
                    });
                  };
                  handleDeleteAllData(totalDatas, "/admin/siswa", func);
                }}
              />
            </div>
            {isToggle ? (
              <div className="animate__animated animate__slideInLeft animate__faster absolute bg-white rounded-xl border shadow-md overflow-hidden transition-transform transform">
                <button
                  id="toggle-element"
                  className="bg-white pr-2 flex items-center align-middle hover:bg-slate-50 cursor-pointer w-full"
                  onClick={() => {
                    handleImportData();
                  }}
                >
                  <Upload size={24} color="#57534e" className="m-3" />
                  <div className="border-l h-8 border"></div>
                  <p className="font-['Inter'] text-sm text-stone-600 font-bold block m-2">
                    Import
                  </p>
                </button>
                <hr className="border" />
                <button
                  className="bg-white pr-2 flex items-center align-middle hover:bg-slate-50 cursor-pointer w-full"
                  onClick={() => {
                    setIsToggle(false);
                    setIsCreate(true);
                  }}
                >
                  <Plus size={24} color="#57534e" className="m-3" />
                  <div className="border-l h-8 border"></div>
                  <p className="font-['Inter'] text-sm text-stone-600 font-bold block m-2">
                    Buat
                  </p>
                </button>
              </div>
            ) : null}
          </div>
          <div className="overflow-y-auto overflow-x-auto bg-white rounded-2xl mt-2 shadow-md">
            <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between p-2">
              <form
                className="flex items-center w-full gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label htmlFor="search">
                  <p className="font-['Poppins'] text-sm text-stone-800 font-medium">
                    Search
                  </p>
                </label>
                <input
                  spellCheck={false}
                  autoComplete="off"
                  id="search"
                  name="search"
                  className="flex-1 lg:flex-none font-['Inter'] text-stone-600 font-medium outline-none bg-transparent my-1 focus:border-stone-800 border rounded-lg px-2"
                  type="text"
                  value={keyword}
                  required={true}
                  onChange={(e) => {
                    setTableData({ ...tableData, page: 1 });
                    setKeyword(e.target.value);
                  }}
                />
              </form>
              <form className="flex items-center w-full lg:justify-end">
                <p className="font-['Poppins'] text-sm text-stone-800 font-medium">
                  Rows per page :
                </p>
                <select
                  name="page"
                  className="p-1 cursor-pointer outline-none font-['Inter'] text-sm text-stone-600 font-medium"
                  required={true}
                  value={limit}
                  onChange={(e) => {
                    setTableData({
                      ...tableData,
                      page: 1,
                      limit: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </form>
            </div>
            <table className="w-full">
              <thead className="border">
                <tr className="bg-sky-500 text-white font-['Poppins'] font-bold text-sm lg:text-base">
                  <th className="m-2 p-1 border">NIS</th>
                  <th className="m-2 p-1 border">Nama</th>
                  <th className="m-2 p-1 border">Kelas</th>
                  <th className="m-2 p-1 border">Jurusan</th>
                  <th className="m-2 p-1 border">Status</th>
                </tr>
              </thead>
              <tbody className="border">
                {siswa === null || isLoading ? (
                  Array(limit)
                    .fill(0)
                    .map((data, index) => (
                      <tr
                        key={index}
                        className="text-center bg-white font-['Inter'] font-medium text-stone-600 text-sm lg:text-base"
                      >
                        <td className="m-2 p-1 border">
                          <div className="h-[14px] lg:h-[18px] bg-gray-200 rounded fadeInOut w-full"></div>
                        </td>
                        <td className="m-2 p-1 border">
                          <div className="h-[14px] lg:h-[18px] bg-gray-200 rounded fadeInOut w-full"></div>
                        </td>
                        <td className="m-2 p-1 border">
                          <div className="h-[14px] lg:h-[18px] bg-gray-200 rounded fadeInOut w-full"></div>
                        </td>
                        <td className="m-2 p-1 border">
                          <div className="h-[14px] lg:h-[18px] bg-gray-200 rounded fadeInOut w-full"></div>
                        </td>
                        <td className="m-2 p-1 border">
                          <div className="h-[14px] lg:h-[18px] bg-gray-200 rounded fadeInOut w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : siswa!.length > 0 ? (
                  siswa!.map(
                    (data: {
                      nis: number;
                      nama: string;
                      kelas: Kelas;
                      jurusan: Jurusan;
                      candidatesId: number;
                    }) => (
                      <tr
                        key={data.nis}
                        className={
                          admin.posisi === "Pengawas"
                            ? "text-center bg-white font-['Inter'] font-medium text-stone-600 text-sm lg:text-base"
                            : "text-center bg-white font-['Inter'] font-medium text-stone-600 text-sm lg:text-base hover:bg-slate-50 cursor-pointer"
                        }
                        onClick={async () => {
                          if (admin.posisi !== "Pengawas") {
                            try {
                              const response = await instance.get(
                                `/admin/siswa/${data.nis}`
                              );
                              setNis(response.data.nis);
                              setValue("nis", response.data.nis);
                              setValue("nama", response.data.nama);
                              setValue("password", response.data.password);
                              setValue("kelas", response.data.kelas as Kelas);
                              setValue(
                                "jurusan",
                                response.data.jurusan as Jurusan
                              );
                            } catch (error) {
                              alertError(error as Error);
                            }
                            setIsUpdate(true);
                            setIsCreate(true);
                          }
                        }}
                      >
                        <td className="border">{data.nis}</td>
                        <td className="border">{data.nama}</td>
                        <td className="border">{data.kelas}</td>
                        <td className="border">{data.jurusan}</td>
                        {data.candidatesId ? (
                          <td className="border col-span-full">
                            <div className="flex justify-center items-center ">
                              <p className="bg-emerald-500 rounded-2xl text-white text-sm px-2">
                                Sudah
                              </p>
                            </div>
                          </td>
                        ) : (
                          <td className="border col-span-full">
                            <div className="flex justify-center items-center ">
                              <p className="bg-rose-500 rounded-2xl text-white text-sm px-2">
                                Belum
                              </p>
                            </div>
                          </td>
                        )}
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center bg-white font-['Inter'] font-medium text-stone-600 text-sm lg:text-base"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex flex-row items-center justify-between p-2">
              <p className="font-['Poppins'] text-sm text-stone-800 font-medium bg-slate-100 rounded-full px-2 py-1">
                {offset + 1}-
                {limit * page > totalRows ? totalRows : limit * page} of{" "}
                {totalRows}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-slate-50 rounded-full cursor-pointer"
                  onClick={() => {
                    if (page > 1) handlePage(page - 1);
                  }}
                >
                  <ChevronLeft size={16} color="#57534e" />
                </button>
                <p className="font-['Poppins'] text-sm text-stone-800 font-medium">
                  {page}
                </p>
                <button
                  className="p-2 hover:bg-slate-50 rounded-full cursor-pointer"
                  onClick={() => {
                    if (page < totalPages) handlePage(page + 1);
                  }}
                >
                  <ChevronRight size={16} color="#57534e" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Pemilih;
