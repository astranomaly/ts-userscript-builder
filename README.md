# Userscript Typescript Template
## Or, how I learned to stop Googling and take matters into my own hands

This is a template that generates a userscript from Typescript using Gulp 4. While the actual functionality of the userscript is completely up to you, this template will provide an easily customizable workflow to simplify development. Or that's the theory anyway! Gulp 4 is not currently documented and I've never developed with Typescript before (especially not within the constraints of a userscript), so piecing together something functional has not been an easy task. Please feel free to reports bugs/suggestions.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- tslint (not currently included because vscode has baked-in linting)

# Initializing your userscript

- Clone this repository to your disk, then rename the folder to whatever your userscript will be called.
- If you are planning to host the compiled script with the source files, remove `release` from `.gitignore`. You will also have to change the `clean` build step to not delete the `release/` directory
- Run `npm install` in this directory to download the dependencies.
- Open `metadata.txt` and customize the Include URL(s) & Icon URL
  - **NOTE**: The script includes every page by default. This is bad. Please limit it as soon as you confirm that the generated script is valid.
- Open `package.json` and customize the `name` through `repository` entries. Many of these entries will be automatically inserted into the userscript's metadata block.
  - **Note**: The script assumes your desired metadata namespace will be your GitHub page, and that your `author` entry is the same as your GitHub name. If this isn't true, you can hard-code the `metadata.txt` as you see fit.
- The template requests access for `GM_setValue, GM_getValue, GM_listValue, GM_deleteValue` and `GM_addStyle` as they are commonly needed. Additionally, `GM_info` is included to pass down package data into the script. Add or remove permissions as needed.
- If you need to add information to your script that changes at compile-time (like a timestamp), you can `gulp-inject` it in the typescript processing tasks in `gulpfile.js`.
  - The included timestamp function returns UTC time formatted as "Jan 1"

# Developing your userscript

To start developing, simply run `npm run build`. Assuming everything works, this will transpile the Typescript files into a single JavaScript file (in the `build/` dir) with a userscript header and inline sourcemaps. Additionally, the userscript will have `_dev` appended to its name, to differentiate between the developmental version and the release version.

For best results, use [Violentmonkey](https://violentmonkey.github.io/get-it/) with Google Chrome. Allow the extension to access to file URLs (found at chrome://extensions) and select "track local file" when installing the userscript. As long as you keep the tab open, any changes you save will be automatically loaded in your browser when you reload.

For continuous development, run `npm run watch`. This task may halt when Typescript encounters an error, but will otherwise retranspile the script every time you save. If the script is halted, close the tab and drag the userscript into the browser window again to reinstall.

When you are ready to release your script, use [`npm version <patch|minor|major>`](https://docs.npmjs.com/cli/version) to increment your script. This will increment the version, output a minified JavaScript file without the `_dev` suffix, push the changes, and clean the project directory.
