import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import {
  clearVolume,
  fetchVolume,
  IBook,
  // fetchVolume,
  IVolume,
  selectIsLoading,
  selectTotalItems,
  selectVolume,
} from "../../../features/book/booksSlice";
import {
  IUser,
  selectCurrentUser,
  update,
} from "../../../features/user/userSlice";
import "./HomePage.scss";
import { Badge, Button, Card } from "react-bootstrap";

const HomePage = () => {
  let { lng } = useParams();
  const [searchValue, setSearchValue] = useState<string>("");
  let currentUser = useSelector(selectCurrentUser);
  let isLoading = useSelector(selectIsLoading);
  const totalItems = useSelector(selectTotalItems);
  let volume: IBook[] = useSelector(selectVolume);
  // const [volume, setVolume] = useState<IVolume | null>(null);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMore, setIsMore] = useState<boolean>(true);

  // change language
  useEffect(() => {
    if (currentUser) {
      let usr: IUser = { ...currentUser }!;
      usr.language = lng;
      console.log("usr", usr);
      dispatch(update(usr));
    }
  }, [lng]);

  // submit request
  const onFormSubmit = async (e: any) => {
    dispatch(clearVolume());
    setCurrentIndex(0);
    if (searchValue !== "" && lng !== undefined) {
      let srchopt = {
        searchValue: searchValue,
        language: lng,
        startIndex: currentIndex,
      };
      console.log(srchopt);
      dispatch(fetchVolume(srchopt));
    }
  };
  // infinite scroll functionality
  const getMoreItems = useCallback(() => {
    console.log("volume length = ", volume.length);
    if (!isLoading) {
      // if (currentIndex >= 0 && 15 + currentIndex < totalItems) {
      if (volume.length < totalItems) {
        setCurrentIndex(15 + currentIndex);
        console.log("current index", currentIndex);
        let srchopt = {
          searchValue: searchValue,
          language: lng,
          startIndex: 15 + currentIndex,
        };
        // console.log(srchopt);
        dispatch(fetchVolume(srchopt));
      }
    }
  }, [volume]);

  // add loader
  const loader = (
    <div key="loader" className="loader">
      <h2>Loading...</h2>
    </div>
  );

  // add/ remove from library
  const onAddToLibraryClick = (id: string) => {
    // console.log("cuser= ", currentUser);
    let usr: IUser = JSON.parse(JSON.stringify(currentUser));

    console.log(
      `is id: ${id} in library, books: ${usr?.books!} szt `,
      usr!.books!.includes(id)
    );
    if (usr!.books!.includes(id)) {
      usr!.books!.splice(usr!.books!.indexOf(id), 1);
    } else {
      console.log("books push id");
      usr!.books!.push(id);
    }

    dispatch(update(usr));
  };
  return (
    <Fragment>
      <section className="home-page">
        <article className="search">
          <div className="sticky">
            <h1>Home page</h1>
            <div>
              <p>lng = {lng ? lng : null}</p>
            </div>

            <form
              data-testid="searchForm"
              onSubmit={(e: any) => onFormSubmit(e)}
            >
              <input
                type="text"
                placeholder="Search book"
                value={searchValue}
                onChange={(e: any) => setSearchValue(e.target.value)}
                name="search"
                id="search"
                data-testid="search"
              />
              <Button
                style={{ marginLeft: "10px" }}
                // type="button"
                variant="primary"
                onClick={(e: any) => onFormSubmit(e)}
              >
                Submit
              </Button>
            </form>
          </div>
        </article>
        <article className="grid">
          <InfiniteScroll
            className="infinite-scroll-component"
            initialLoad={false}
            loadMore={getMoreItems}
            pageStart={0}
            hasMore={isMore}
            loader={currentIndex === 0 ? undefined : loader}
          >
            {volume.map((book: IBook, index: number) => (
              <Card key={index} style={{ width: "18rem" }}>
                <Card.Img
                  style={{ maxWidth: "200px", objectFit: "cover" }}
                  variant="top"
                  src={book!.volumeInfo?.imageLinks?.smallThumbnail}
                  alt={`${book!.volumeInfo?.title}`}
                />
                <Card.Body>
                  <Card.Title>{book!.volumeInfo.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Date: {book!.volumeInfo?.publishedDate}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Description: </strong>$
                    {book!.volumeInfo?.description?.length > 200
                      ? book!.volumeInfo?.description?.slice(0, 200) + "..."
                      : book!.volumeInfo?.description!}
                  </Card.Text>
                  <Button
                    onClick={(e: any) => onAddToLibraryClick(book!.id!)}
                    variant={
                      currentUser!.books!.includes(book!.id!)
                        ? "danger"
                        : "primary"
                    }
                  >
                    {currentUser?.books!.includes(book!.id!) ? "Remove" : "Add"}
                    {/* Add to Library */}
                  </Button>

                  <h4
                    style={{
                      display: currentUser?.books!.includes(book!.id!)
                        ? "block"
                        : "none",
                    }}
                  >
                    <Badge className="badge" bg="success">
                      In Library
                    </Badge>
                  </h4>
                </Card.Body>
              </Card>
            ))}
          </InfiniteScroll>
        </article>
      </section>
    </Fragment>
  );
};

export default HomePage;
