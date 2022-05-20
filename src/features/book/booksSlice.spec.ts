import { IBooks } from "./booksSlice";
import booksReducer from "./booksSlice"

describe('test book reducer', () => {

    let initialState:IBooks={
        volume: [],
        library: [],
        totalItems:-1,
        isLoading:false
      }

    test('should handle initial state', () => {
        expect(booksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
      });

    }); // end describe