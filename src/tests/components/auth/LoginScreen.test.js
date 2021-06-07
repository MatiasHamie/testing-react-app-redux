import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/auth/LoginScreen";

import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

import { MemoryRouter } from "react-router-dom";

/**
 * Hay que considerar el estado de la store al principio, cuando no
 * hay nadie logueado, lo saco de las redux dev tools, y la emulo
 *
 * Se debe configurar el router para testing tmb, porque
 * Hay un <Link/> en la pagina, eso lo hago con el MemoryRouter
 */

// configurando store ficticia
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msg: null,
  },
};

let store = mockStore(initState);
// tengo que simular el dispatch y la funcion de loginGoogle
// solo me interesa saber si fue llamada
store.dispatch = jest.fn();
jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <LoginScreen />", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("Debe mostrar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe disparar la accion de startGoogleLogin", () => {
    wrapper.find(".google-btn").simulate("click");
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("Debe disparar la accion de startLoginEmailPassword", () => {
    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      "nando@gmail.com",
      "1234568"
    );
  });
});
