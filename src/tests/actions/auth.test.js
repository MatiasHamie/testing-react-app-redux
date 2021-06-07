import "@testing-library/jest-dom";
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

// configurando store ficticia
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("Pruebas con las acciones de Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  // Para probar acciones sincronicas no hace falta crear la store ficticia
  test("login y logout deben crear la accion respectiva", () => {
    const uid = "ABC123";
    const displayName = "Matias";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
    // console.log(store.getActions());
  });

  test("Debe realizar el logout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("Debe iniciar el startLoginWithEmailPassword", async () => {
    await store.dispatch(startLoginEmailPassword("test@testing.com", "123456"));

    const actions = store.getActions();

    console.log(actions);
    // actiones
    // [
    //     { type: '[UI] Start loading' },
    //     {
    //       type: '[Auth] Login',
    //       payload: { uid: 'WKW9g8rX5Fect6uwRo4n2Cxb2yI2', displayName: null }
    //     },
    //     { type: '[UI] Finish loading' }
    // ]

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "WKW9g8rX5Fect6uwRo4n2Cxb2yI2",
        displayName: null,
      },
    });
  });
});
