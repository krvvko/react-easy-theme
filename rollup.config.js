import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'named',
    },
    plugins: [
        resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
        commonjs(),
        babel({ exclude: 'node_modules/**', extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    ],
    external: ['react', 'react-dom'],
};
