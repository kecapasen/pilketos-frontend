import React, { useState, useEffect, lazy } from "react";
import alertError from "@/components/alert/AlertError";
import { instance } from "@/lib/AxiosInstance";
import {
  Home,
  User,
  Users,
  UserCheck,
  Power,
  AlignLeft,
  Box,
} from "react-feather";
import "animate.css";
import { useAdminContext } from "@/context/AdminContext";
const Dashboard = lazy(() => import("@/layouts/admin/Dashboard"));
const Calon = lazy(() => import("@/layouts/admin/Calon"));
const Pemilih = lazy(() => import("@/layouts/admin/Pemilih"));
const Admin = lazy(() => import("@/layouts/admin/Admin"));
type Component = {
  id: number;
  title: string;
};
const dataComponent: Component = {
  id: 1,
  title: "Dashboard",
};
const Layout = () => {
  const { admin, setAdmin } = useAdminContext();
  const [component, setComponent] = useState(dataComponent);
  const [toggle, setToggle] = useState(false);
  const handleClickOutside = (event: any) => {
    const buttonElement = document.getElementById("button");
    const menuElement = document.getElementById("menu");
    const isClickedOutsideMenu =
      menuElement &&
      !menuElement.contains(event.target) &&
      !buttonElement?.contains(event.target);
    if (isClickedOutsideMenu) {
      setToggle(false);
    }
  };
  const getDashboard = async (): Promise<void> => {
    try {
      await instance.get("/admin");
      setComponent({
        id: 1,
        title: "Dashboard",
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  const getCalon = async (): Promise<void> => {
    try {
      await instance.get("/admin");
      setComponent({
        id: 2,
        title: "Data Calon",
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  const getPemilih = async (): Promise<void> => {
    try {
      await instance.get("/admin");
      setComponent({
        id: 3,
        title: "Data Pemilih",
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  const getAdmin = async (): Promise<void> => {
    try {
      await instance.get("/admin");
      setComponent({
        id: 4,
        title: "Data Admin",
      });
    } catch (error) {
      alertError(error as Error);
    }
  };
  const handleLogout = async (): Promise<void> => {
    try {
      const response = await instance.delete("/admin");
      setAdmin({ isAdmin: response.data.admin });
    } catch (error) {
      alertError(error as Error);
    }
  };
  useEffect(() => {
    getDashboard();
    document.addEventListener("click", handleClickOutside);
    return (): void => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="m-auto flex justify-center items-center h-screen w-screen">
        <div className="hidden flex-1 h-full lg:block max-w-48 m-4">
          <div className="flex justify-center items-center h-24 lg:h-32">
            <Box size={64} color="#10b981" />
          </div>
          <div>
            <ul>
              <li className="flex items-center w-full">
                {component.id === 1 && (
                  <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                )}
                <div className="w-full">
                  <hr className="w-10/12 m-auto border rounded-full" />
                  <button
                    className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full"
                    onClick={getDashboard}
                  >
                    <Home size={20} color="#10b981" />
                    <div
                      className={
                        component.id === 1
                          ? "border-l h-[20px] border border-emerald-500"
                          : "border-l h-[20px] border group-hover:border-emerald-400"
                      }
                    ></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Dashboard
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                {component.id === 2 && (
                  <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                )}
                <div className="w-full">
                  <button
                    className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full"
                    onClick={getCalon}
                  >
                    <User size={20} color="#10b981" />
                    <div
                      className={
                        component.id === 2
                          ? "border-l h-[20px] border border-emerald-500"
                          : "border-l h-[20px] border group-hover:border-emerald-400"
                      }
                    ></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Calon
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                {component.id === 3 && (
                  <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                )}
                <div className="w-full">
                  <button
                    className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full"
                    onClick={getPemilih}
                  >
                    <Users size={20} color="#10b981" />
                    <div
                      className={
                        component.id === 3
                          ? "border-l h-[20px] border border-emerald-500"
                          : "border-l h-[20px] border group-hover:border-emerald-400"
                      }
                    ></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Pemilih
                    </p>
                  </button>
                  <hr className="w-10/12 m-auto border rounded-full" />
                </div>
              </li>
              <li className="flex items-center">
                {component.id === 4 && (
                  <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                )}
                <div className="w-full">
                  <button
                    className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full"
                    onClick={getAdmin}
                  >
                    <UserCheck size={20} color="#10b981" />
                    <div
                      className={
                        component.id === 4
                          ? "border-l h-[20px] border border-emerald-500"
                          : "border-l h-[20px] border group-hover:border-emerald-400"
                      }
                    ></div>
                    <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                      Admin
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
            {toggle ? (
              <div
                className="animate__animated animate__slideInLeft animate__faster absolute flex-1 h-full max-w-48 shadow-md rounded-r-2xl w-full z-50 bg-white border"
                id="menu"
              >
                <div className="flex justify-center items-center h-24 lg:h-32">
                  <Box size={64} color="#10b981" />
                </div>
                <div>
                  <ul>
                    <li className="flex items-center w-full">
                      {component.id === 1 && (
                        <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                      )}
                      <div className="w-full">
                        <hr className="w-10/12 m-auto border rounded-full" />
                        <button
                          className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full"
                          onClick={getDashboard}
                        >
                          <Home size={20} color="#10b981" />
                          <div
                            className={
                              component.id === 1
                                ? "border-l h-[20px] border border-emerald-500"
                                : "border-l h-[20px] border group-hover:border-emerald-400"
                            }
                          ></div>
                          <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                            Dashboard
                          </p>
                        </button>
                        <hr className="w-10/12 m-auto border rounded-full" />
                      </div>
                    </li>
                    <li className="flex items-center">
                      {component.id === 2 && (
                        <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                      )}
                      <div className="w-full">
                        <button
                          className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full"
                          onClick={getCalon}
                        >
                          <User size={20} color="#10b981" />
                          <div
                            className={
                              component.id === 2
                                ? "border-l h-[20px] border border-emerald-500"
                                : "border-l h-[20px] border group-hover:border-emerald-400"
                            }
                          ></div>
                          <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                            Calon
                          </p>
                        </button>
                        <hr className="w-10/12 m-auto border rounded-full" />
                      </div>
                    </li>
                    <li className="flex items-center">
                      {component.id === 3 && (
                        <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                      )}
                      <div className="w-full">
                        <button
                          className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full"
                          onClick={getPemilih}
                        >
                          <Users size={20} color="#10b981" />
                          <div
                            className={
                              component.id === 3
                                ? "border-l h-[20px] border border-emerald-500"
                                : "border-l h-[20px] border group-hover:border-emerald-400"
                            }
                          ></div>
                          <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                            Pemilih
                          </p>
                        </button>
                        <hr className="w-10/12 m-auto border rounded-full" />
                      </div>
                    </li>
                    <li className="flex items-center">
                      {component.id === 4 && (
                        <div className="absolute h-8 w-1 bg-emerald-500 left-0 rounded-tr-2xl rounded-br-2xl"></div>
                      )}
                      <div className="w-full">
                        <button
                          className="flex py-4 px-2 gap-2 group hover:bg-slate-50 rounded-lg cursor-pointer w-full"
                          onClick={getAdmin}
                        >
                          <UserCheck size={20} color="#10b981" />
                          <div
                            className={
                              component.id === 4
                                ? "border-l h-[20px] border border-emerald-500"
                                : "border-l h-[20px] border group-hover:border-emerald-400"
                            }
                          ></div>
                          <p className="font-['Poppins'] text-sm text-stone-600 font-medium">
                            Admin
                          </p>
                        </button>
                        <hr className="w-10/12 m-auto border rounded-full" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
            <div className="sticky top-0 z-10 bg-stone-100 mb-4 px-4 lg:px-8">
              <div className="flex h-24 lg:h-32 w-full">
                <div className="flex justify-between w-full items-center">
                  <div className="hidden lg:block">
                    <p className="font-['Poppins'] text-2xl text-stone-800 font-black block">
                      {component.title}
                    </p>
                    <p className="font-['Poppins'] text-lg text-stone-600 font-medium block">
                      Selamat datang{" "}
                      <span className="font-bold">{admin.nama}</span> 👋
                    </p>
                  </div>
                  <AlignLeft
                    size={32}
                    color="#57534e"
                    className="lg:hidden"
                    id="button"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  />
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
                          {admin.nama}
                        </p>
                        <p className="font-['Poppins'] text-sm text-stone-600 font-medium block">
                          {admin.posisi}
                        </p>
                      </div>
                    </div>
                    <div className="border-l h-6 lg:h-8 border"></div>
                    <button
                      className="p-2 rounded-full hover:bg-slate-50 ml-2 lg:ml-8 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <Power
                        color="#10b981"
                        className="h-6 w-6 lg:h-8 lg:w-8"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <hr className="w-full m-auto border rounded-full" />
            </div>
            <div className="px-4 lg:px-8 pb-4 lg:pb-8">
              {component.id === 1 ? (
                <Dashboard admin={admin} />
              ) : component.id === 2 ? (
                <Calon admin={admin} />
              ) : component.id === 3 ? (
                <Pemilih admin={admin} />
              ) : component.id === 4 ? (
                <Admin admin={admin} />
              ) : (
                <Dashboard admin={admin} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
