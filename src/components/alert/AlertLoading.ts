import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const alertLoading = (param?: { name: string }) => {
  withReactContent(Swal).fire({
    titleText: "Mohon Tunggu!",
    text: `${param ? `Memproses File : ${param.name}` : "Memproses..."}`,
    allowOutsideClick: false,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: false,
    color: "#57534e",
    customClass: {
      title: "font-['Poppins'] text-xl text-stone-800",
      popup: "font-['Inter'] text-sm font-bold",
    },
    willOpen: () => {
      Swal.showLoading();
    },
  });
};
export default alertLoading;
