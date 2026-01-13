/** @format */

import { useState } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "Jugo",
    calories: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    const isNumberField = ["category", "calories"].includes(id);

    setActivity({
      ...activity,
      [id]: isNumberField ? (value === "" ? "" : Number(value)) : value,
    });
  };
  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      className='space-y5 bg-white shadow p-10 rounded-lg'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='category'
          className='font-bold'
        >
          Categorias:
        </label>
        <select
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          id='category'
          name='category'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='name'
          className='font-bold'
        >
          Actividad:
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='border border-slate-300 p-2 rounded-lg'
          placeholder='Ej. Comida, Jugo, Pesas, Bicicleta'
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className='grid grid-cols-1 gap-3 pb-5'>
        <label
          htmlFor='calories'
          className='font-bold'
        >
          Calorias:
        </label>
        <input
          type='number'
          id='calories'
          name='calories'
          className='border border-slate-300 p-2 rounded-lg'
          placeholder='Calorias, ej. 300 o 500'
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type='submit'
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
        value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
