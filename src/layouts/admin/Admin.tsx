import React, { useState, useEffect } from "react";
import alertSuccess from "@/components/alert/AlertSuccess";
import alertError from "@/components/alert/AlertError";
import alertLoading from "@/components/alert/AlertLoading";
import alertDeleteAllData from "@/components/alert/AlertDeleteAllData";
import ButtonDeleteAll from "@/components/button/ButtonDeleteAll";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useForm } from "react-hook-form";
import { instance } from "@/lib/AxiosInstance";
import { Posisi } from "@/types/Types";
import {
  PlusCircle,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  ArrowLeft,
} from "react-feather";
import "animate.css";
import alertDeleteData from "@/components/alert/AlertDeleteData";
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
  admins: z.union([
    z.array(
      z.object({
        id: z.number(),
        nama: z.string(),
        posisi: z.nativeEnum(Posisi),
      })
    ),
    z.null(),
  ]),
});
const AdminSchema = z.object({
  no: z.number(),
  nama: z.string().min(1, { message: "Nama is required!" }).max(100),
  password: z.string().max(100),
  posisi: z.nativeEnum(Posisi),
});
type Table = z.infer<typeof TableSchema>;
type Admin = z.infer<typeof AdminSchema>;
const dataTable: Table = {
  page: 1,
  limit: 10,
  search: "",
  offset: 0,
  totalPages: 0,
  totalRows: 0,
  totalDatas: 0,
  admins: null,
};
const dataAdmin: Admin = {
  no: 0,
  nama: "",
  password: "",
  posisi: Posisi.Kordinator,
};
const Admin = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<Admin>({
    resolver: zodResolver(AdminSchema),
  });
  const { admin } = useAdminContext();
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState(0);
  const [search] = useDebounce(keyword, 500);
  const [tableData, setTableData] = useState(dataTable);
  const { page, limit, offset, totalPages, totalRows, totalDatas, admins } =
    tableData;
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getAdmin = async (): Promise<void> => {
    try {
      const response = await instance.get("/admin/staf", {
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
        admins: response.data.result,
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleCreateData = async (data: Admin): Promise<void> => {
    alertLoading();
    try {
      await instance.post("/admin/staf", data);
      alertSuccess("Data Berhasil Dibuat!");
      reset(dataAdmin);
      setIsCreate(false);
      getAdmin();
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleUpdateData = async (data: Admin): Promise<void> => {
    alertLoading();
    try {
      await instance.patch(`/admin/staf/${id}`, data);
      alertSuccess("Data Berhasil Diubah!");
      reset(dataAdmin);
      setIsUpdate(false);
      setIsCreate(false);
      getAdmin();
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
    reset(dataAdmin);
    setIsUpdate(false);
    setIsCreate(false);
    getAdmin();
    setIsLoading(false);
  }, [props]);
  useEffect(() => {
    getAdmin();
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
                reset(dataAdmin);
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
              <div className="text-stone-600 font-bold p-4 w-full lg:grid grid-cols-2 gap-4">
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
                  <label htmlFor="password">
                    {isUpdate ? "Password Baru" : "Password"} :
                  </label>
                  <input
                    spellCheck={false}
                    type="text"
                    className={`font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full ${
                      errors.password
                        ? `focus:border-rose-500 border-rose-500`
                        : `focus:border-stone-800`
                    } border rounded-lg p-2`}
                    id="nis"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="font-['Inter'] text-rose-500 font-bold text-sm mx-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="my-2 lg:my-0">
                  <p>Posisi :</p>
                  <select
                    className="font-['Inter'] text-stone-600 font-bold outline-none bg-transparent my-1 w-full focus:border-stone-800 border rounded-lg p-2 cursor-pointer"
                    id="posisi"
                    {...register("posisi")}
                  >
                    {admin.posisi === "Developer" && (
                      <option value={Posisi.Developer}>
                        {Posisi.Developer.toString()}
                      </option>
                    )}
                    <option value={Posisi.Kordinator}>
                      {Posisi.Kordinator.toString()}
                    </option>
                    <option value={Posisi.Pengawas}>
                      {Posisi.Pengawas.toString()}
                    </option>
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
                      className="bg-rose-500 rounded-xl shadow-md p-2 border flex items-center align-middle gap-2 hover:bg-rose-600 cursor-pointer group"
                      onClick={(e) => {
                        e.preventDefault();
                        const func = () => {
                          reset(dataAdmin);
                          setIsUpdate(false);
                          setIsCreate(false);
                          getAdmin();
                        };
                        handleDeleteData(
                          getValues("nama"),
                          `/admin/staf/${id}`,
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
                className="bg-white rounded-xl shadow-md lg:pr-2 border flex items-center hover:bg-slate-50 cursor-pointer group relative"
                onClick={(e) => {
                  e.preventDefault();
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
                  const func = () => {
                    setTableData({
                      ...dataTable,
                      offset: 0,
                      totalRows: 0,
                      totalPages: 0,
                      totalDatas: 0,
                      admins: [],
                    });
                  };
                  handleDeleteAllData(totalDatas, "/admin/staf", func);
                }}
              />
            </div>
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
                <tr className="bg-rose-500 text-white font-['Poppins'] font-bold text-sm lg:text-base">
                  <th className="m-2 p-1 border">No</th>
                  <th className="m-2 p-1 border">Nama</th>
                  <th className="m-2 p-1 border">Posisi</th>
                </tr>
              </thead>
              <tbody className="border">
                {admins === null || isLoading ? (
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
                      </tr>
                    ))
                ) : admins!.length > 0 ? (
                  admins!.map(
                    (
                      data: { id: number; nama: string; posisi: Posisi },
                      index: number
                    ) => (
                      <tr
                        key={data.id}
                        className={
                          admin.posisi === "Pengawas"
                            ? "text-center bg-white font-['Inter'] font-medium text-stone-600 text-sm lg:text-base"
                            : "text-center bg-white font-['Inter'] font-medium text-stone-600 text-sm lg:text-base hover:bg-slate-50 cursor-pointer"
                        }
                        onClick={async () => {
                          if (admin.posisi !== "Pengawas") {
                            try {
                              const response = await instance.get(
                                `/admin/staf/${data.id}`
                              );
                              setValue("nama", response.data.nama);
                              setValue("password", response.data.password);
                              setValue(
                                "posisi",
                                response.data.posisi as Posisi
                              );
                              setId(response.data.id);
                            } catch (error) {
                              alertError(error as Error);
                            }
                            setIsUpdate(true);
                            setIsCreate(true);
                          }
                        }}
                      >
                        <td className="border">{index + 1}</td>
                        <td className="border">{data.nama}</td>
                        <td className="border">{data.posisi}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={3}
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
export default Admin;
