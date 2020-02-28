import {Library} from './Library';

export class Context {

    constructor(
        public readonly totalBooks: number,
        public readonly totalLibraries: number,
        public readonly daysForScanning: number,
        public readonly bookScores: number[],
        public readonly libraries: Library[]
    ) {
    }

}
