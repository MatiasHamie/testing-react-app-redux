import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
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
import { types } from "../../../types/types";
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
// store.dispatch = jest.fn(); no hace falta si el componente usa acciones sincronas

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <RegisterScreen />", () => {
  test("Debe mostrar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe hacer el dispatch de la accion respectiva", () => {
    // obtener input por el name
    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    const actions = store.getActions();

    // console.log(actions);
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: "Email is not valid",
    });
  });
});
