import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IRootBooks {
  books: IBooks;
}
export interface IVolume {
  kind: string;
  totalItems: number;
  items: IBook[];
}
export interface IBooks {
  volume: IBook[];
  library: string[];
  totalItems: number;
}

export interface IBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: any[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: any;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };

  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo: any;
  searchInfo: any;
}

const init: IBooks = {
  volume: [],
  library: [],
  totalItems:-1
};
export const fetchVolume: any = createAsyncThunk(
  "books/fetchVolume",
  async (searchOptions: { searchValue: string; language: string, startIndex:number }) => {
    const { searchValue, language, startIndex } = searchOptions;
    let result = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&langRestrict=${language}&startIndex=${startIndex}&maxResults=15`
      )
      // .then((response) => {
      //   return response.data
      // })
      .catch((error) => {
        // alert(error.message);
        console.error(error);
      });
    return result?.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: init,
  reducers: {
      clearVolume: (state:any) =>{
        state.volume =[]
      }
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchVolume.fulfilled,
      (state: IBooks, action: PayloadAction<IVolume>) => {
          state.totalItems = action.payload.totalItems
          let books = action.payload.items;
          let currentIDs = state.volume.map((b:IBook)=> b.id);
          for(let newBook of books){
              if(!currentIDs.includes(newBook.id)){
                  state.volume.push(newBook);
              }
          }
        //   state.volume=state.volume.concat(books)
      }
    );
  },
});

export default booksSlice.reducer;
export const {clearVolume} = booksSlice.actions;
export const selectVolume = (state: IRootBooks) => state.books.volume;
export const selectLibrary = (state: IRootBooks) => state.books.library;
export const selectTotalItems = (state: IRootBooks) => state.books.totalItems;
