/** @format */

import { useEffect, useState, type Dispatch } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activity-reducer";
import { v4 as uuidv4 } from "uuid";
export type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);
  useEffect(() => {
    if (state.activeId) {
      const selectActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectActivity);
    }
  }, [state.activeId]);

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
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
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
