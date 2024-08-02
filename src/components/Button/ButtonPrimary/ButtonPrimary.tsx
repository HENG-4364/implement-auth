
import React, { ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children }) => {
  return (
    <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-red-500  bg-white-500 outline-none rounded-l-full rounded-r-full capitalize bg-red-500 text-white transition-all hover:shadow-orange">
      {children}
    </button>
  );
};

export default ButtonPrimary;