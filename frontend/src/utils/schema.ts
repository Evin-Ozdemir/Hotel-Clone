import * as yup from "yup";

// Regex: Sadece harfler ve boşluk içerebilir
const nameRegex = /^[A-Za-zÇĞİÖŞÜçğıöşü ]+$/;

// Yup: Schema oluşturma
// Formdaki inputlardan alınan verileri geçerli olması için gerekli koşulları ifade eden bir şema oluştur

// Schema oluşturma
export const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Başlık en az 3 karakter olmalıdır")
    .matches(nameRegex, "Başlık yalnızca harf karakteri içerebilir")
    .required("Bu alan zorunludur"),

  location: yup
    .string()
    .min(3, "Lokasyon 3 karakterden uzun olmalıdır")
    .required("Lokasyon zorunludur"),

  address: yup
    .string()
    .min(3, "Adres en az 3 karakter olmalıdır")
    .required("Adres zorunludur"),

  description: yup
    .string()
    .required("Açıklama zorunludur")
    .min(10, "Açıklama 10 karakterden uzun olmalıdır"),
  amenities: yup
    .string()
    .required("Hizmetler zorunludur")
    .min(1, "En az 1 hizmet seçilmelidir"),

  rating: yup
    .number()
    .min(1, "Puan 1-5 arası olmalıdır")
    .max(5, "Puan 1-5 arası olmalıdır")
    .required("Puan zorunludur"),

  price_per_night: yup
    .number()
    .required("Fiyat zorunludur")
    .min(20, "Fiyat 20-1000 arası olmalıdır")
    .max(1000, "Fiyat 20-1000 arası olmalıdır"),
});
