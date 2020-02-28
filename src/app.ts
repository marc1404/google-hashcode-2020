import {parseInput} from './parseInput';
import {Context} from './Context';
import {Output} from './Output';
import {writeOutput} from './writeOutput';
import {scoreLibs} from './scoreLibs'
import consola from 'consola';
import {determineOutput} from './determineOutput';

const inputFileNames: string[] = [
    'a_example.txt',
    'b_read_on.txt',
    'c_incunabula.txt',
    'd_tough_choices.txt',
    'e_so_many_books.txt',
    'f_libraries_of_the_world.txt'
];

for (const inputFileName of inputFileNames) {
    consola.start(`START: ${inputFileName}`);
    consola.start('Parsing input...');

    const context: Context = parseInput(inputFileName);

    consola.success('Done!');
    consola.start('Thinking...');

    scoreLibs(context);

    const output: Output = determineOutput(context);

    consola.success('Done!');
    consola.start(`Writing output...`);

    writeOutput(inputFileName, output);

    consola.success('Done!');
    consola.success(`END: ${inputFileName}`);
}
