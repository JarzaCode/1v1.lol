import { build, $, file, write, type BuildConfig } from 'bun';
import { mkdir } from 'node:fs/promises';
import { execSync } from 'child_process';

const COMPILATION_TARGETS = {
  javascript: true,
  binary: false,
  binaryTargets: ['bun-linux-x64-modern', 'bun-linux-x64'],
  binaryType: 'js',
};

const entrypoints = ['./index.ts'];

const buildConfig: BuildConfig = {
  entrypoints: entrypoints,
  outdir: './build/',
  target: 'node',
  format: 'cjs',
  splitting: false,
  plugins: [],
  external: [],
  packages: 'bundle',
  minify: true,
  sourcemap: 'none',
  conditions: ['exports', 'development'],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  banner: `// Bundled using ${process.platform === 'linux' ? execSync('lsb_release -d').toString().trim().replace('Description:\t', '') : process.platform} on ${new Date()}`,
  footer: '',
} as BuildConfig;

// Main function to handle the build process
const main = async () => {
  await $`rm -rf ./build/`;

  if (COMPILATION_TARGETS.javascript) {
    console.log(
      `Transpiling ${entrypoints.join(', ')} (${entrypoints.length} file${entrypoints.length > 1 ? 's' : ''}) to javascript`,
    );
    await mkdir('./build/', { recursive: true });

    const js = await build(buildConfig);

    if (js.success === true) {
      console.log(
        `Successfully transpiled ${entrypoints.length} file${entrypoints.length > 1 ? 's' : ''} to javascript`,
      );
    } else {
      console.error(`Failed to transpile JavaScript. Error: ${js.logs}`);
      return; // Stop further execution if compilation fails
    }
  }

  if (COMPILATION_TARGETS.binary) {
    console.error('Compiling to binary is unsupported when compiling client code')
  }
};

// Call the main function
main().catch(error => {
  console.error('An error occurred during the build process:', error);
});