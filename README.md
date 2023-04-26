# rollup-plugin-runner

Rollup plugin that executes code after bundling

## Installation

```shell
yarn add rollup-plugin-runner -D
// or
npm i rollup-plugin-runner -D
// or
pnpm i rollup-plugin-runner -D
```

## Usage

```javascript
import runner from 'rollup-plugin-runner'
 
export default {

  plugins: [
      // this will search for "AfterFx.exe" in Process, and run `"Path to AfterFx.exe" - r foo.jsx`
        runner({
            programName: "AfterFx.exe",
            cmd: `-r "foo.jsx"`,
        }),

        // if cmd only, this will run `npm build`
        runner({
            cmd: `npm build`,
        }),
  ]
}
```

## Why I publish this script

I am using rollup to write AfterEffect script, I need get AfterEffect application path, and run my script
