import js from "@eslint/js";
import globals from "globals";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  {
		rules: {
			"no-unused-vars": "warn",
		},
	},
  globalIgnores(["webpack.*"]),
]);
