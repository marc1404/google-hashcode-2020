import fs from 'fs';
import path from 'path';
import {Context} from './Context';
import {Library} from './Library';
import {Book} from './Book';

export function parseInput(fileName: string): Context {
    const filePath: string = path.join('input', fileName);
    const content: string = fs.readFileSync(filePath, {encoding: 'utf8'});
    const [firstLine, secondLine, ...lines] = content
        .split('\n')
        .filter((line: string) => line.length > 0);
    const [totalBooks, totalLibraries, daysForScanning] = splitAndParseInt(firstLine);
    const bookScores: number[] = splitAndParseInt(secondLine);
    const libraries: Library[] = [];
    let nextLibraryId: number = 0;

    for (let i = 0; i < lines.length - 1; i += 2) {
        const libraryContext: string = lines[i];
        const libraryBooks: string = lines[i + 1];
        const library: Library = parseLibrary(nextLibraryId++, libraryContext, libraryBooks, bookScores);

        libraries.push(library);
    }

    return new Context(
        totalBooks, totalLibraries, daysForScanning, bookScores, libraries
    );
}

function parseLibrary(libraryId: number, libraryContext: string, libraryBooks: string, bookScores: number[]): Library {
    const [totalBooks, signupProcess, shippingRate] = splitAndParseInt(libraryContext);
    const bookIds: number[] = splitAndParseInt(libraryBooks);
    const books: Book[] = bookIds.map((bookId: number) => new Book(bookId, bookScores[bookId]));

    return new Library(
        libraryId, totalBooks, signupProcess, shippingRate, books
    );
}

function splitAndParseInt(input: string): number[] {
    return input
        .split(' ')
        .map((part: string) => Number.parseInt(part, 10));
}
