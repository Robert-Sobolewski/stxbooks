import axios from "axios";
import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import "./HomePage.scss";

interface IVolume {
  kind: string;
  totalItems: number;
  items: any[];
}
const HomePage = () => {
  let { lng } = useParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [volume, setVolume] = useState<IVolume | null>(null);

  // submit request
  const onFormSubmit = async (e: any) => {
    if (!lng) {
      lng = "en";
    }
    if (searchValue) {
      e.preventDefault();
      console.log("search value", searchValue);
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&langRestrict=${lng}`
        )
        .then((response) => {
          setVolume(response.data);
        })
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    }
  };

  return (
    <Fragment>
      <section className="home-page">
        <article className="search">
          <h1>home page</h1>
          <div>
            <p>lng = {lng ? lng : null}</p>
            <p>volume ={JSON.stringify(volume)}</p>
          </div>

          <form action="" onSubmit={(e: any) => onFormSubmit(e)}>
            <input
              type="text"
              placeholder="Search book"
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
              name="search"
              id="search"
              // cols={30}
              // rows={10}
            />
            <button type="button" onClick={(e: any) => onFormSubmit(e)}>
              Submit
            </button>
          </form>
        </article>
        <article className="grid">
          <p>{JSON.stringify(volume?.totalItems)}</p>
        </article>
      </section>
    </Fragment>
  );
};

export default HomePage;
