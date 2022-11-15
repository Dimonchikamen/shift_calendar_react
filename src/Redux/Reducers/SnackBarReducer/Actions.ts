import { SnackBarActionTypes } from "./SnackBarActionTypes";

export const openSnackBar = () => ({
    type: SnackBarActionTypes.OPEN_SNACKBAR,
});

export const closeSnackBar = () => ({
    type: SnackBarActionTypes.CLOSE_SNACKBAR,
});
