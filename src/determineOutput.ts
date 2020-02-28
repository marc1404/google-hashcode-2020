import {Context} from './Context';
import {Output} from './Output';
import {Library} from './Library';
import consola from 'consola';

export function determineOutput(context: Context): Output {
    const output: Output = new Output();
    const libraryIds: Set<number> = new Set<number>();
    const bookIds: Set<number> = new Set<number>();
    let [firstLibrary, filteredLibraries] = findFirstLibrary(context.libraries);
    let daysLeft: number = context.daysForScanning;

    addLibrary(libraryIds, bookIds, output, firstLibrary);

    daysLeft -= firstLibrary.signupProcess;

    let lastProgress: number = 0;

    while (filteredLibraries.length > 0) {
        const result = findNextLibrary(libraryIds, bookIds, filteredLibraries);
        const library = result[0];
        filteredLibraries = result[1];

        addLibrary(libraryIds, bookIds, output, library);

        daysLeft -= library.signupProcess;

        if (daysLeft <= 0) {
            return output;
        }

        const progress: number = 100 - Math.round(daysLeft / context.daysForScanning * 100);

        if (progress - lastProgress >= 10) {
            consola.info(`${progress}%`);

            lastProgress = progress;
        }
    }

    return output;
}

function addLibrary(libraryIds: Set<number>, bookIds: Set<number>, output: Output, library: Library): void {
    libraryIds.add(library.id);

    for (const book of library.books) {
        bookIds.add(book.id);
    }

    output.addLibrary(library.id, library.getSortedBookIds());
}

function findNextLibrary(libraryIds: Set<number>, bookIds: Set<number>, libraries: Library[]): [Library, Library[]] {
    if (libraries.length === 1) {
        return [
            libraries[0],
            []
        ];
    }

    for (const library of libraries) {
        library.filterDuplicates(bookIds);
    }

    const filteredLibraries: Library[] = [];
    let nextLibrary: Library = libraries[0];

    nextLibrary.filterDuplicates(bookIds);

    for (let i = 1; i < libraries.length; i++) {
        const library = libraries[i];

        library.filterDuplicates(bookIds);

        if (library.getBookRateScore() > nextLibrary.getBookRateScore()) {
            filteredLibraries.push(nextLibrary);

            nextLibrary = library;

            continue;
        }

        filteredLibraries.push(library);
    }

    return [
        nextLibrary,
        filteredLibraries
    ];
}

function findFirstLibrary(libraries: Library[]): [Library, Library[]] {
    let filteredLibraries: Library[] = [];
    let firstLibrary: Library = libraries[0];

    filteredLibraries = libraries.sort((a, b) => a.score - b.score);

    return [
        firstLibrary,
        filteredLibraries
    ];
}
