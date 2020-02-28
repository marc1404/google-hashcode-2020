import {Context} from './Context';

export const scoreLibs = (context: Context) => {
    for (let lib of context.libraries) {
        lib.score += lib.signupProcess;
        lib.score += lib.shippingRate * -1;
        let bookDelta = context.totalBooks - lib.totalBooks;
        lib.score += bookDelta;
        lib.score += lib.shippingRate * (context.daysForScanning - lib.signupProcess) * -1
    }
};