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
  const totalItems = useSelector(selectTotalItems);
  let volume: IBook[] = useSelector(selectVolume);
  // const [volume, setVolume] = useState<IVolume | null>(null);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // change language
  useEffect(() => {
    if (currentUser) {
      let usr: IUser = { ...currentUser }!;
      usr.language = lng;
      console.log("usr", usr);
      dispatch(update(usr));
    }
  }, [lng]);

  // if search value is change refresh volume
  // useEffect(() => {
  //   dispatch(clearVolume());
  // }, [searchValue]);

  // submit request
  const onFormSubmit = async (e: any) => {
    dispatch(clearVolume());
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

  const getMoreItems = useCallback(() => {
    if (totalItems >= 0 && 15 + currentIndex < totalItems) {
      setCurrentIndex(15 + currentIndex);
      let srchopt = {
        searchValue: searchValue,
        language: lng,
        startIndex: currentIndex,
      };
      // console.log(srchopt);
      dispatch(fetchVolume(srchopt));
    }
  }, [volume]);
  // infinite scroll functionality
  // const getMoreItems = () => {
  //   if (totalItems >= 0 && 15 + currentIndex < totalItems) {
  //     setCurrentIndex(15 + currentIndex);
  //     let srchopt = {
  //       searchValue: searchValue,
  //       language: lng,
  //       startIndex: currentIndex,
  //     };
  //     // console.log(srchopt);
  //     dispatch(fetchVolume(srchopt));
  //   }
  // };

  const hasMoreItems = (): boolean | undefined => {
    let result: boolean | undefined = false;

    if (totalItems >= 0) {
      if (currentIndex < totalItems) {
        result = true;
      } else {
        result = undefined;
      }
    }
    return result;
  };

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );
  // infinite scroll
  // loadMore={getMoreItems}
  //           hasMore={hasMoreItems}
  //           loader={loader}

  const loadMore = () => {
    console.log("load more here, currentIndex = " + currentIndex);
    if (totalItems >= 0 && 15 + currentIndex < totalItems) {
      setCurrentIndex(15 + currentIndex);
      let srchopt = {
        searchValue: searchValue,
        language: lng,
        startIndex: currentIndex,
      };
      // console.log(srchopt);
      dispatch(fetchVolume(srchopt));
    }
  };
  return (
    <Fragment>
      <section className="home-page">
        <article className="search">
          <h1>home page</h1>
          <div>
            <p>lng = {lng ? lng : null}</p>
            {/* <p>volume ={JSON.stringify(volume)}</p> */}
          </div>

          <form action="" onSubmit={(e: any) => onFormSubmit(e)}>
            <input
              type="text"
              placeholder="Search book"
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
              name="search"
              id="search"
            />
            <button type="button" onClick={(e: any) => onFormSubmit(e)}>
              Submit
            </button>
          </form>
        </article>
        <article className="grid">
          <InfiniteScroll
            loadMore={getMoreItems}
            hasMore={currentIndex >= 0 && currentIndex < totalItems}
            loader={loader}
          >
            {volume.map((book: IBook, index: number) => (
              <Card style={{ width: "18rem" }}>
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
                  <Button variant="primary">Add to Library</Button>
                  <h4>
                    <Badge className="badge" bg="success">
                      In Library
                    </Badge>
                  </h4>
                </Card.Body>
              </Card>
            ))}
          </InfiniteScroll>

          {/* <button onClick={loadMore}>Load more...</button> */}
        </article>
      </section>
    </Fragment>
  );
};

export default HomePage;
