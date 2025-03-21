import Image from "next/image";
import loadGif from "@/assets/load.gif";
import icon from "@/assets/icon.png";

export default function SplashScreen() {
  return (
    <div className="bg-[#5500ff] w-full h-screen flex text-white items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <div className="font-bold text-2xl flex items-center gap-2 mb-4">
          <div className="shadow-xl bg-[#5530ff] px-4 py-3 rounded-xl">
            <Image
              src={icon}
              className="saturate-0  brightness-[500]"
              width={20}
              alt=""
            />
          </div>
          <span>ReserveJá</span>
        </div>
        <Image src={loadGif} width={20} className="invert" alt="" />
      </div>
    </div>
  );
}
