import cloudinary from "cloudinary";
import "@testing-library/jest-dom";
import { fileUpload } from "../../helpers/fileUpload";

// sacado de https://cloudinary.com/documentation/node_integration
cloudinary.config({
  cloud_name: "tuteh",
  api_key: "241558835436556",
  api_secret: "eMkbnN-qKub-VWSUowl9fm7Niy0",
});

describe("Pruebas en fileUpload", () => {
  test("Debe cargar un archivo y retornar el URL ", async () => {
    // traigo una imagen cualquiera de google
    const resp = await fetch(
      "https://st4.depositphotos.com/19789706/39490/i/600/depositphotos_394903360-stock-photo-bologna-italy-july-26-2020.jpg"
    );

    // la guardo como file
    const blob = await resp.blob();
    const file = new File([blob], "foto.png");

    // la subo a cloudinary, lo cual me devuelve la url de la imagen subida
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // Corto el url para tener el id de la foto que acabe de subir, ese id lo pone automaticamente cloudinary por nosotros
    // errores con enzyme - jest, no esta soportado el uso del sdk aun, esto tira error, borrar manualmente cada imagen
    const segments = url.split("/");
    const imgId = segments[segments.length - 1].replace(".jpg", "");
    // console.log(imgId);
    // sacado de https://cloudinary.com/documentation/admin_api#delete_resources
    // cloudinary.v2.api.delete_resources(public_ids, options, callback);
    // cloudinary.v2.api.delete_resources(imgId, {}, () => {
    //   done();
    // });
  }, 30000);

  test("Debe retornar un error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
