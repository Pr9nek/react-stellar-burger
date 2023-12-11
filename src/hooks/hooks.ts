import { useState } from 'react';
import { RootState } from '../services/types';
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch, AppThunk } from '../services/types';

export function useForm<T>(inputValues: T){
    const [values, setValues] = useState<T>(inputValues);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }

  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 
  export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 