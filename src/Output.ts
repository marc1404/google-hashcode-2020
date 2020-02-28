export class Output {

    private readonly libraries: OutputLibrary[] = [];

    public addLibrary(libraryId: number, books: number[]): void {
        const library = new OutputLibrary(libraryId, books);

        this.libraries.push(library);
    }

    public toString(): string {
        const lines: string[] = [`${this.libraries.length}`];

        for (const library of this.libraries) {
            lines.push(`${library.id} ${library.books.length}`);
            lines.push(library.books.join(' '));
        }

        return lines.join('\n');
    }

}

class OutputLibrary {

    constructor(
        public readonly id: number,
        public readonly books: number[]
    ) {
    }

}
