import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const alertSuccess = (msg: string) => {
  withReactContent(Swal).fire({
    titleText: "Sukses!",
    text: msg,
    icon: "success",
    showConfirmButton: true,
    showCloseButton: true,
    confirmButtonText: "Oke",
    confirmButtonColor: "#10b981",
    color: "#57534e",
    iconColor: "#10b981",
    customClass: {
      title: "font-['Poppins'] text-xl text-stone-800",
      popup: "font-['Inter'] text-sm font-bold",
      closeButton: "text-stone-600 hover:text-rose-500",
    },
  });
};
export default alertSuccess;
