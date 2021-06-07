import "@testing-library/jest-dom";
// para probar redux, usar https://www.npmjs.com/package/redux-mock-store
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../../types/types";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    return "https://hola-mundo.com/cosa.jpg";
  }),
}));

/*
    -- Primer Prueba con Redux --
    En las acciones creadas de las notas, en este caso startNewNote(),
    - se puede ver que lo que hace es obtener de la store el uid del usuario logueado
    - se genera una nota nueva con una plantilla con valores por defecto para q el user
      la modifique como quiera
        const newNote = {
        title: "",
        body: "",
        date: new Date().getTime(),
        };
    
    - Se la guarda en firebase con esos valores
    - se despachan 2 actions
        - Se pone a esa nota como ACTIVA activeNote(id, newNote)
        - Se agrega la nota al array de notas existentes addNewNote(id, newNote)
    
    - Ya que mockeamos a la store para pruebas, y generamos una bd en firebase para testing
      podemos obtener las acciones que se estan despacharon en la store ficticia de pruebas

    - store.getActions() devuelve un array con todas las actions que fueron despachadas
    - Si Imprimimos lo que nos devuelve en este caso es:
        [
            {
                type: '[Notes] Set active note',
                payload: {
                    id: 'aMUbr08XsoLhU1XjP41y',   
                    title: '',
                    body: '',
                    date: 1623013617721
            }
            },
            {
                type: '[Notes] New note',       
                payload: {
                    id: 'aMUbr08XsoLhU1XjP41y',   
                    title: '',
                    body: '',
                    date: 1623013617721
                }
            }
        ]

        - Ahora puedo chequear si las actions fueron despachadas con el type y payload que debe

*/

// a mockStore le pasamos el estado de la store como quiero q este
// en este momento
// En el caso de crear una neuva nota, necesito q este autorizado el user
// por ende me interesa el uid q me devuelve firebase
const initState = {
  auth: {
    uid: "IdForTesting",
  },
  notes: {
    active: {
      id: "aMUbr08XsoLhU1XjP41y",
      title: "Hola",
      body: "Mundo",
    },
  },
};

let store = mockStore(initState);

describe("Pruebas con las acciones de las notas", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  const defaultNote = {
    id: expect.any(String), //no sabemos q id le pone firebase, por eso con q sea string me sirve
    title: "",
    body: "",
    date: expect.any(Number),
  };

  test("Debe crear una nueva nota", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: defaultNote,
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: defaultNote,
    });

    const docId = actions[0].payload.id;
    await db.doc(`IdForTesting/journal/notes/${docId}`).delete();
  });

  //   test("startLoadingNotes debe cargar las notas", async () => {
  //     // recordar q todas las notas estan guardadas en
  //     // IdForTesting/journal/notes/
  //     // entonces cargo las notas q cree para testing
  //     await store.dispatch(startLoadingNotes("IdForTesting"));

  //     const actions = store.getActions();
  //     // console.log(actions);

  //     expect(actions[0]).toEqual({
  //       type: types.notesLoad,
  //       payload: expect.any(Array), //nada mas me importa q sea un array de notas
  //     });

  //     const contenidoNotaEsperado = {
  //       id: expect.any(String),
  //       title: expect.any(String),
  //       body: expect.any(String),
  //       date: expect.any(Number),
  //     };

  //     // agarro una nota (en este caso la primera del payload)
  //     // y verifico q tenga esos campos
  //     expect(actions[0].payload[0]).toMatchObject(contenidoNotaEsperado);
  //   }, 20000);

  //   test("Debe actualizar la nota", async () => {
  //     const note = {
  //       id: "aMUbr08XsoLhU1XjP41y",
  //       title: "titulo modificado cualquiera",
  //       body: "body modificado cualquiera",
  //     };

  //     await store.dispatch(startSaveNote(note));

  //     const actions = store.getActions();

  //     // console.log(actions);
  //     expect(actions[0].type).toBe(types.notesUpdated);

  //     const docRef = await db.doc(`/IdForTesting/journal/notes/${note.id}`).get();

  //     expect(docRef.data().title).toBe(note.title);
  //   }, 20000);

//   test("startUploading debe actualizar la url de la nota", async () => {
//     const file = new File([], "fotoCualquiera.jpg");

//     await store.dispatch(startUploading(file));

//     const docRef = await db.doc(`/IdForTesting/journal/notes/${note.id}`);
//   });
});
