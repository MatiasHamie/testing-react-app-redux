import {
  finishLoading,
  startLoading,
  removeError,
  setError,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("Pruebas en ui-actions", () => {
  test("Todas las acciones tienen que funcionar", () => {
    const setErrorAction = setError("Mensaje de error cualquiera");
    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(setErrorAction).toEqual({
      type: types.uiSetError,
      payload: "Mensaje de error cualquiera",
    });

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError,
    });

    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading,
    });

    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
