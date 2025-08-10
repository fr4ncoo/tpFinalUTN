import { useEffect, useState } from "react";
import { productos } from "../data/productos";

export const useGetProductsByCategory = (category) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      if (!category) {
        setItems([]);
        setLoading(false);
        return;
      }
      const norm = String(category).trim().toLowerCase();
      const filtrados = productos.filter(
        (p) => p.category?.toLowerCase().replace(/\s+/g, "-") === norm
      );
      setItems(filtrados);
      setLoading(false);
    }, 300);
  }, [category]);

  return { items, loading };
};
