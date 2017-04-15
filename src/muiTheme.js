import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
  fullWhite,
  grey900,
  grey700,
  grey300,
  yellowA700
} from 'material-ui/styles/colors';

import spacing from 'material-ui/styles/spacing';

import { fade } from 'material-ui/utils/colorManipulator';

export const muiTheme = getMuiTheme({
  spacing: spacing.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: grey900,
    primary2Color: grey900,
    primary3Color: grey700,
    accent1Color: yellowA700,
    accent2Color: yellowA700,
    accent3Color: yellowA700,
    textColor: fullWhite,
    secondaryTextColor: (0, fade)(fullWhite, 0.7),
    alternateTextColor: grey300,
    canvasColor: grey300,
    borderColor: (0, fade)(fullWhite, 0.3),
    disabledColor: (0, fade)(fullWhite, 0.3),
    pickerHeaderColor: (0, fade)(fullWhite, 0.12),
    clockCircleColor: (0, fade)(fullWhite, 0.12)
  }
});
