import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import type { PlaceData, PlaceResponse, PlacesResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//?  useQuery hook: Api'den veri çekmek için kullanılan hook

//! usePlaces: Konaklama noktalarını getirmek için kullanılan hook
export const usePlaces = (paramsObj?: any) => {
  return useQuery({
    // sorgu için benzersiz bir key
    queryKey: ["places", paramsObj],
    // Api isteği atan fonksiyon
    queryFn: () =>
      api
        .get<PlacesResponse>("/places", { params: paramsObj })
        .then((res) => res.data.places),
    // Eğer error gelirse geçici bir hata olmadığından emin olmak için aynı adrese 3 istek daha atar
    retry: 3,
    // Her istek arasında 1 saniye bekle
    retryDelay: 1000,
    // Stale time: cache'deki verinin ne kadar süre sonra yenileneceği
    staleTime: 0,
    // Cache'deki verinin ne kadar süre sonra silineceği
    gcTime: 300000,
  });
};

//! useCreatePlace: Konaklama noktası oluşturmak için kullanılan hook
export const useCreatePlace = () => {
  const navigate = useNavigate();
  return useMutation({
    // mutation key
    mutationKey: ["create"],
    // Api isteği atan fonksiyon
    mutationFn: (place: PlaceData) => api.post<PlaceResponse>("/places", place),
    // Başarılı istek sonrası yapılacak işlemler
    onSuccess: (res) => {
      toast.success("Konaklama noktası başarıyla oluşturuldu");
      navigate(`/`);
    },
    // Hata durumunda yapılacak işlemler
    onError: (error) => {
      toast.error("Bir hata oluştu");
    },
  });
};

//! usePlace: Belirli bir konaklama noktasını getirmek için kullanılan hook
export const usePlace = (id: string) => {
  return useQuery({
    queryKey: ["place"],
    queryFn: () =>
      api.get<PlaceResponse>(`/place/${id}`).then((res) => res.data.place),
  });
};

//! useRemovePlace: Konaklama noktasını silmek için kullanılan hook
export const useRemovePlace = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["remove"],
    mutationFn: (id: number) => api.delete(`/places/${id}`),
    onSuccess: () => {
      toast.success("Konaklama noktası başarıyla silindi");
      navigate("/");
    },
    onError: (error) => {
      toast.error("Bir hata oluştu");
    },
  });
};
