import { createStyles, Theme, makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { pink, indigo, teal, deepOrange } from "@material-ui/core/colors";



export const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            display: "flex",
        },
    })
);

export const theme = createMuiTheme({
    palette: {
        primary: pink,
        secondary: indigo,
        info: teal,
        success: deepOrange,
    },
    overrides: {
        MuiChip: {
            colorSecondary: {
                color: "white"
            }
        }
    }
});