import sharedConfig from '@sapphire-sh/utils/eslint';
import { globalIgnores } from 'eslint/config';

export default [...sharedConfig, globalIgnores(['src/user-script.js'])];
