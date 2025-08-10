import { useEffect, useState } from "react";
import { productos } from "../data/productos";

export const useGetAllProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setItems(productos);
      setLoading(false);
    }, 500); 
  }, []);

  return { items, loading };
};
