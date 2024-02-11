import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const alertError = (msg: {
  response?: { data: { msg: string } };
  message?: string;
}) => {
  withReactContent(Swal).fire({
    titleText: "Error!",
    text: msg.response?.data?.msg || msg.message,
    icon: "error",
    showConfirmButton: true,
    showCloseButton: true,
    confirmButtonText: "Oke",
    confirmButtonColor: "#f43f5e",
    color: "#57534e",
    iconColor: "#f43f5e",
    customClass: {
      title: "font-['Poppins'] text-xl text-stone-800",
      popup: "font-['Inter'] text-sm font-bold",
      closeButton: "text-stone-600 hover:text-rose-500",
    },
  });
};
export default alertError;
