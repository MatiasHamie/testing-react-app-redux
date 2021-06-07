import "@testing-library/jest-dom";
import { types } from "../../types/types";

describe("Pruebas en types.js", () => {
  test("Debe tener estos tipos", () => {
    const typesForTesting = {
      login: "[Auth] Login",
      logout: "[Auth] Logout",

      uiSetError: "[UI] Set Error",
      uiRemoveError: "[UI] Remove Error",

      uiStartLoading: "[UI] Start loading",
      uiFinishLoading: "[UI] Finish loading",

      notesAddNew: "[Notes] New note",
      notesActive: "[Notes] Set active note",
      notesLoad: "[Notes] Load notes",
      notesUpdated: "[Notes] Updated note",
      notesFileUrl: "[Notes] Updated image url",
      notesDelete: "[Notes] Delete note",
      notesLogoutCleaning: "[Notes] Logout Cleaning",
    };

    expect(typesForTesting).toEqual(types);
  });
});
