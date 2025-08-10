import { useEffect, useState } from "react";
import { productos } from "../data/productos";

export const useGetProductById = (idParam) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const norm = String(idParam).trim();

    const encontrado =
      productos.find(p => String(p.id) === norm) ||
      productos.find(p => String(p.id) === String(Number(norm))) ||
      productos.find(
        p =>
          p.title?.toLowerCase() === norm.toLowerCase() ||
          p.name?.toLowerCase() === norm.toLowerCase()
      );

    setProduct(encontrado || null);
    setLoading(false);
  }, [idParam]);

  return { product, loading };
};
