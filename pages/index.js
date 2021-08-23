import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import Rate from "../components/profile/Rate";
import Layout from "../components/Layout";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import MultiCarousel from "../components/artist/carousel_many";
import SingleCarousel from "../components/common/carousel_single";
import ArtistList from "../components/artist/ArtistList";
import CategoryButtonList from "../components/artist/CategoryBtnList";

const file_data = [
  "user4.jpg",
  "user5.png",
  "user9.jpg",
  "makeup_1.jpg",
  "makeup_3.png",
  "lowerRight.png",
  "user4.jpg",
  "user5.png",
  "user9.jpg",
  "makeup_1.jpg",
  "makeup_3.png",
  "lowerRight.png"
];
const HomePage = props => {
// class HomePage extends React.Component {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState({
    email: "",
    role: "",
    name: "",
    avatar: "",
    bio: "",
    is_public: false
  });

  useEffect(() => {
    setLoading(true);
   
    axios
      .get(serverUrl + "api/search")
      .then(response => {
        // console.log("response", response);
        setArtists(response.data.users);
        
        // category.push(response.data.category)
        setLoading(false);
      })
      .catch(error => {
        // Router.push("/");
        setLoading(false);
      });
  }, []);
  console.log(artists)
  // componentDidMount() {
  //   this.fetchData();
  // }

 

  // render() {
    //const { artists } = this.state
    

    return (
      <Layout title={"Guest Homepage"}>
        <div className="overall" id="artist-landing">
          <div className="content">
            <div className="container">
              <div className="artist_landing join">
                <div className="artist_landing_item">
                  <div>
                    <h3>Find a makeup artist near you</h3>
                  </div>
                  <div className="button">
                    <a href="#" className="btn btn-primary btn-block">
                      Search
                    </a>
                  </div>
                </div>
              </div>

              <div className="row">
                <CategoryButtonList></CategoryButtonList>
              </div>

              <div className="carousel_list row">
                {/* heading start */}
                <Link href="/search/artist/2">
                  <div className="row heading col-sm-12 link">
                    <div className="title">
                      <h3>Featured makeup artists near Brooklyn</h3>
                    </div>
                    <div className="right_all">
                      <span>
                        <a href="#">See all</a>&nbsp;
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
                {/* heading end */}
                {/* carousel start */}
                <div className="row col-sm-12">
                  <MultiCarousel dataset={artists}></MultiCarousel>
                </div>
                {/* carousel end */}
              </div>

              <div className="carousel_list row">
                {/* heading start */}
                <Link href="/search/artist/2">
                  <div className="row heading col-sm-12 link">
                    <div className="title">
                      <h3>Wedding makeup artists near Brooklyn</h3>
                    </div>
                    <div className="right_all">
                      <span>
                        <a href="#">See all</a>&nbsp;
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
                {/* heading end */}
                {/* carousel start */}
                <div className="row col-sm-12">
                  <MultiCarousel dataset={artists}></MultiCarousel>
                </div>
                {/* carousel end */}
              </div>

              <div className="artist_spotlight">
                <div className="row">
                  <div className="col-sm-6">
                    <h3>Artist Spotlight</h3>
                    <Link href="/search/artist/2">
                      <div className="photo_name_area link">
                        <div className="artist_photo">
                          <img src="./images/makeup_1.jpg" width="30" />
                        </div>
                        <div className="artist_name">
                          <div>
                            <h2>Mylah Morales</h2>
                            <span>
                              BRIDAL <b>&#183;</b> COSTUME
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="description">
                      <p>
                        do beautiful, flawlessly blended work on all ages, skin
                        types and skin colors at an affordable price. I am not
                        trying to exploit you just because you're getting
                        married!
                      </p>
                      <p>
                        I love being a part of someone's special day and the
                        pressure that comes with it. Its so unbelievably
                        satisfying to have someone look at their own reflection
                        and be so happy they want to cry because of my work.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6 single_carousel">
                    <SingleCarousel></SingleCarousel>
                  </div>
                </div>
              </div>

              <div className="available_artist">
                {/* heading start */}
                <Link href="/search/artist/2">
                <div className="row heading col-sm-12 link">
                  <div className="title">
                    <h3>Artists available today near Brooklyn</h3>
                  </div>
                  <div className="right_all">
                    <span>
                      <a href="#">See all</a>&nbsp;
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
                </Link>
                {/* heading end */}

                {/*  */}
                <div className="cardlist">
                  <ArtistList></ArtistList>
                </div>
              </div>

              <div className="makeup_lessons">
                {/* heading start */}
                <Link href="/search/artist/2">
                <div className="row heading col-sm-12 link">
                  <div className="title">
                    <h3>Makeup lessons near Brooklyn</h3>
                  </div>
                  <div className="right_all">
                    <span>
                      <a href="#">See all</a>&nbsp;
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
                </Link>
                {/* heading end */}

                {/*  */}
                <div className="cardlist">
                  <ArtistList></ArtistList>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  // }
}

export default HomePage;
