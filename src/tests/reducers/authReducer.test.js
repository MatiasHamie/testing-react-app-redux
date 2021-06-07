import "@testing-library/jest-dom";
import { login } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  test("Debe retornar un objeto al loguearse", () => {
    const userForTest = {
      uid: "idsarasa",
      name: "nombresarasa",
    };

    const action = {
      type: types.login,
      payload: {
        uid: "idsarasa",
        displayName: "nombresarasa",
      },
    };

    const state = authReducer({}, action);

    expect(state).toEqual(userForTest);
  });

  test("Tiene que retornar un objeto vacio al desloguearse", () => {
    const initState = {
      uid: "idsarasa",
      name: "nombresarasa",
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });

  test("Debe retornar un objeto igual al initState con una action que no existe", () => {
    const initState = {
      uid: "idsarasa",
      name: "nombresarasa",
    };

    const action = {
      type: "asdad",
    };

    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
