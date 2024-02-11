import React from "react";
import { Trash2 } from "react-feather";
const ButtonDeleteAll = (props: { func: () => void }) => {
  return (
    <button
      className="bg-white rounded-xl shadow-md pr-2 border flex items-center align-middle hover:bg-slate-50 cursor-pointer group"
      onClick={props.func}
    >
      <Trash2 size={32} color="#f43f5e" className="m-2" />
      <div className="border-l h-8 border"></div>
      <p className="font-['Poppins'] text-sm text-stone-800 font-bold block m-2">
        Hapus Semua
      </p>
    </button>
  );
};
export default ButtonDeleteAll;
