import React from "react";
import { restaurantPageQuery_restaurant_restaurant_menu_options } from "../__generated__/restaurantPageQuery";
import { OrderItemOptionInputType } from "../__generated__/globalTypes";

interface IDishProps {
  id: number;
  name: string;
  price: number;
  description: string;
  isCustomer?: boolean;
  options?: restaurantPageQuery_restaurant_restaurant_menu_options[] | null;
  addItem: (dishId: number) => void;
  removeItem: (dishId: number) => void;
  isSelected?: Boolean;
  toggleItemOption: (dishId: number, option: OrderItemOptionInputType) => void;
  hasOption: (dishId: number, option: OrderItemOptionInputType) => Boolean;
}

export const Dish: React.FC<IDishProps> = ({
  id,
  name,
  price,
  description,
  isCustomer = false,
  options,
  addItem,
  removeItem,
  isSelected,
  toggleItemOption,
  hasOption,
}) => {
  return (
    <div className="px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all ">
      {isCustomer && (
        <div>
          {!isSelected ? (
            <button className="btn" onClick={() => addItem(id)}>
              Add Item
            </button>
          ) : (
            <button
              className="btn bg-red-500 hover:bg-red-600"
              onClick={() => removeItem(id)}
            >
              Remove Item
            </button>
          )}
        </div>
      )}
      <div className="mb-5">
        <h3 className="text-lg font-medium ">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
          {options.map((option, index) => (
            <span
              key={index}
              className="flex items-center"
              onClick={() => toggleItemOption(id, option)}
            >
              {hasOption(id, option) ? "-" : "+"}
              <h6 className="mr-2">{option.name}</h6>
              <h6 className="text-sm opacity-75">(￦{option.extra})</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
