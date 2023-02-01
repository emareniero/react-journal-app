export const fileUpload = async (file) => {
  // Chequeamos que venga file
  // if ( !file ) throw new Error('No hay archivos para subir!')
  if (!file) return null; // Esto lo hacemos para las pruebas

  // URL para postear en cloudinary
  const cloudURL = "https://api.cloudinary.com/v1_1/dbjyiitng/upload";

  // Creamos el body tal cual lo hicimos en postman
  const formData = new FormData();
  formData.append("upload_preset", "react-journal-img");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudURL, {
      method: "POST",
      body: formData,
    });

    // console.log( resp)
    if (!resp.ok) throw new Error("No se pudo subir imágen!");

    // So todo sale bien
    const cloudResp = await resp.json();
    // console.log( cloudResp )

    return cloudResp.secure_url;
  } catch (error) {
    // console.log(error)
    // throw new Error( error.message )
    return null; // Esto lo hacemos para las pruebas
  }
};
