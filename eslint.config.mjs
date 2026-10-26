import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([...nextVitals, ...nextTs, globalIgnores([".next/**", ".eastwave-build/**", ".browser-preview/**", ".npm-cache/**", "node_modules/**", "next-env.d.ts"])]);
