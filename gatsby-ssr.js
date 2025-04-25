
import { getInitColorSchemeScript } from '@mui/material';

export function onRenderBody({ setPreBodyComponents }) {
   setPreBodyComponents([getInitColorSchemeScript()]);
}
