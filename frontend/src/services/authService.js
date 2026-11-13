import {DEMO} from '../context/Auth';
// Demo only. A real implementation would POST credentials to the backend and store a token.
export const authService={roles:Object.keys(DEMO),profile:role=>({role,...DEMO[role]})};
