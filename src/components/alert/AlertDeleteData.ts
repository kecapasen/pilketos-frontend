import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { instance } from "@/lib/AxiosInstance";
import alertSuccess from "@/components/alert/AlertSuccess";
import alertError from "@/components/alert/AlertError";
import alertLoading from "@/components/alert/AlertLoading";
const alertDeleteData = async (
  data: string,
  url: string,
  func: any
): Promise<void> => {
  const result = await withReactContent(Swal).fire({
    titleText: "Hapus Data?",
    html: `Data <span class="font-bold text-stone-800">${data}</span> Akan Terhapus Secara Permanen`,
    showConfirmButton: true,
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: "Oke",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#f43f5e",
    cancelButtonColor: "#0ea5e9",
    color: "#57534e",
    icon: "error",
    iconColor: "#f43f5e",
    customClass: {
      title: "font-['Poppins'] text-xl text-stone-800",
      popup: "font-['Inter'] text-sm font-bold",
      closeButton: "text-stone-600 hover:text-rose-500",
      confirmButton: "mx-4",
      cancelButton: "mx-4",
    },
  });
  if (result.isConfirmed) {
    try {
      alertLoading();
      await instance.delete(url);
      alertSuccess("Data Berhasil Dihapus!");
      func();
    } catch (error) {
      alertError(error as Error);
    }
  }
};
export default alertDeleteData;
