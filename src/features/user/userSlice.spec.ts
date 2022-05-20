import { IUser, IUsers, login, logout, update } from "./userSlice"
import usersReducer from './userSlice'
describe('test user reducer', () => {

    let initialState:IUsers={
        users:[],
        currentUser:null
    }

    test('should handle initial state', () => {
        expect(usersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
      });

      test('login reducer', () => {
          const abcUser={
            email: "abc@email.com",
            password: "abc",
            books: [],
            language: "en"
        }
        const actual = usersReducer(initialState, login(abcUser));
        expect(actual.currentUser).toEqual(abcUser);
      });

      test('update reducer', () => {
        const abcUser={
          email: "abc@email.com",
          password: "abc",
          books: [],
          language: "en"
      }
      const actual = usersReducer(initialState, update({
        email: "abc@email.com",
        password: "abc",
        books: [],
        language: "pl"
    }));
      expect(actual.currentUser?.language).toEqual("pl");
    });
      
      test('logout reducer', () => {
        const abcUser={
          email: "abc@email.com",
          password: "abc",
          books: [],
          language: "en"
      }
      const actual = usersReducer(initialState, logout());
      expect(actual.currentUser).toEqual(null);
    });
})