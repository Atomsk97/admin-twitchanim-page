import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAnims } from "../context/AnimProvider";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function AnimForm() {
  const { createAnim, getAnim, updateAnim } = useAnims();
  const [anim, setAnim] = useState({
    title: "",
    description: "",
    media: null,
  });
  const [disabled, setDisabled] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const data = await getAnim(params.id);
        setAnim(data);
        setDisabled(false);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-700 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">
            {params.id ? "Editar" : "Subir"} una animación
          </h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Atrás
          </Link>
        </header>

        <Formik
          initialValues={anim}
          enableReinitialize
          validationSchema={yup.object({
            title: yup
              .string()
              .trim("El nombre no puede tener espacios en blanco")
              .strict(true)
              .required("El titulo es requerido")
              .transform((value) => value.split(" ").join("")),
            description: yup.string(),
          })}
          onSubmit={async (values) => {
            if (params.id) {
              await updateAnim(params.id, values);
            } else {
              await createAnim(values);
            }
            navigate("/");
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Titulo
              </label>
              <Field
                name="title"
                placeholder="Nombre de la animación"
                className="px-3 py-2 mb-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-400 text-sm mb-2"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Descripcion
              </label>
              <Field
                name="description"
                placeholder="Descripción"
                className="px-3 py-2 mb-4 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-400 text-sm mb-2"
              />
              {params.id ? (
                <br />
              ) : (
                <div>
                  <label
                    htmlFor="media"
                    className="text-sm block font-bold text-gray-400"
                  >
                    Archivo Multimedia
                  </label>
                  <input
                    type="file"
                    name="media"
                    className="px-3 py-2 mb-4 focus:outline-none rounded bg-gray-600 text-white w-full"
                    onChange={(e) => {
                      const type = e.target.files[0]?.type.split("/")[0];
                      if (
                        type === "image" ||
                        type === "video" ||
                        type === "audio"
                      ) {
                        setFieldValue("media", e.target.files[0]);
                        setDisabled(false);
                      } else {
                        toast.error(
                          "Solo se puede subir archivos de tipo imagen, video o audio"
                        );
                        setDisabled(true);
                      }
                    }}
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting || disabled}
                className="block bg-indigo-500 hover:bg-indigo-400 px4 p-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-300 disabled:text-slate-500"
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-6 w-6" />
                ) : (
                  "Guardar"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
}
