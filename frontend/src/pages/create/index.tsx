import { type FC } from "react";
import { useCreatePlace } from "../../utils/service";
import type { PlaceData } from "../../types";
import { Field, Form, Formik } from "formik";
import { initialValues, inputs } from "../../utils/constants";
import { schema } from "../../utils/schema";

const Create: FC = () => {
  // Sayfa yüklenince api isteği atılacaksa : useQuery
  // Herhangi bir kullanıcı etkileşiminde atılacaksa: useMutation
  const { mutate, isPending } = useCreatePlace();

  // Form gönderilince çalışacak fonk.
  const handleSubmit = (values: PlaceData) => {
    mutate(values);
  };
  return (
    <div className="container">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={initialValues}
      >
        {({ errors, touched }) => (
          <Form className="max-w-2xl mx-auto grid gap-2">
            {inputs.map((input, key) => (
              <div key={key} className="field">
                <label>{input.label}</label>
                <Field
                  placeholder={input.placeholder}
                  type={input.type || "text"}
                  name={input.name}
                  className="input"
                />
                {errors[input.name as keyof typeof errors] &&
                touched[input.name as keyof typeof errors] ? (
                  <span className="text-red-500 text-sm">
                    {errors[input.name as keyof typeof errors]}
                  </span>
                ) : (
                  <span className="text-transparent select-none text-sm">
                    .
                  </span>
                )}
              </div>
            ))}
            <button
              disabled={isPending}
              type="submit"
              className="my-5 bg-blue-500 py-2 text-white rounded-md transition hover:bg-blue-600"
            >
              Gönder
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
