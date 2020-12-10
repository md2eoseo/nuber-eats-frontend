import React from "react";

interface ICategoryProps {
  id: string;
  coverImg: string | null;
  name: string;
}

export const Category: React.FC<ICategoryProps> = ({ coverImg, name }) => (
  <div className="group flex flex-col items-center cursor-pointer">
    <div
      className="w-20 h-20 rounded-full bg-cover group-hover:bg-gray-100"
      style={{ backgroundImage: `url(${coverImg})` }}
    ></div>
    <span className="mt-1 text-sm text-center font-medium">{name}</span>
  </div>
);
