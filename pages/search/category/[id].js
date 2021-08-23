import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import Link from "next/link";
import Router from "next/router";
import Loader from "../../../components/common/loader";
import axios from "axios";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import Layout from "../../../components/Layout";
import MultiCarousel from "../../../components/artist/carousel_many";

const CategorySearchPage = props => {
  console.log(props);

  const [loading, setLoading] = useState(true);
  const [catId, setCatId] = useState(props.id);
  const [category, setCategory] = useState({
    created_at: null,
    deleted_at: null,
    description: "",
    id: 0,
    name: "",
    updated_at: null
  });
  const [artists, setArtists] = useState([]);
  const handleSetting = event => setIsSetting(!isSetting);

  useEffect(() => {
    // Update the document title using the browser API
    setLoading(true);
    
    // this.setState({loading: true}, () => {
    axios
      .get(serverUrl + "api/search/category/" + props.id)
      .then(response => {
        // console.log("response", response);
        setCategory(response.data.category);
        // category.push(responseata.category)
        setLoading(false);
      })
      .catch(error => {
        // Router.push("/");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    setLoading(true);
    
    // this.setState({loading: true}, () => {
    axios
      .get(serverUrl + "api/search?category=1")
      .then(response => {
        console.log("response categroy", response);
        setArtists(response.data.users);
        // category.push(response.data.category)
        setLoading(false);
      })
      .catch(error => {
        // Router.push("/");
        setLoading(false);
      });
  }, []);
  // console.log("caegory data",catData);
  return (
    <Layout title={"Category Search"}>
      <div className="container">
        {loading ? (
           <center><Spinner animation="border" variant="dark" /></center>
        ) : (
          <div className="top_padding_content">
            <div className="row"></div>
            <center>
              <h3>"{category.name}" makeup artists in Brooklyn </h3>
            </center>
            <div className="carousel_list row">
              {/* heading start */}
              <div className="row heading col-sm-12">
                <div className="title">
                  <h3>Featured {category.name} artists in Brooklyn</h3>
                </div>
                <div className="right_all">
                  <span>
                    <a href="#">See all</a>&nbsp;
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </div>
              {/* heading end */}
              {/* carousel start */}
              <div className="row col-sm-12">
                <MultiCarousel dataset={artists}></MultiCarousel>
              </div>
              {/* carousel end */}
            </div>

            <div className="carousel_list row">
              {/* heading start */}
              <div className="row heading col-sm-12">
                <div className="title">
                  <h3>
                    Most popular {category.name} makeup artists in Brooklyn
                  </h3>
                </div>
                <div className="right_all">
                  <span>
                    <a href="#">See all</a>&nbsp;
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </div>
              {/* heading end */}
              {/* carousel start */}
              <div className="row col-sm-12">
                <MultiCarousel dataset={artists}></MultiCarousel>
              </div>
              {/* carousel end */}
            </div>

            <div className="carousel_list row">
              {/* heading start */}
              <div className="row heading col-sm-12">
                <div className="title">
                  <h3>
                    Most affordable {category.name} makeup artists in Brooklyn
                  </h3>
                </div>
                <div className="right_all">
                  <span>
                    <a href="#">See all</a>&nbsp;
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </div>
              {/* heading end */}
              {/* carousel start */}
              <div className="row col-sm-12">
                <MultiCarousel dataset={artists}></MultiCarousel>
              </div>
              {/* carousel end */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

CategorySearchPage.getInitialProps = ({ query: { id } }) => {
  return { id };
};

// class CategorySearchPage extends React.Component {

//     static getInitialProps ({ query: { id } }) {
//         console.log('query id', id)

//         return { id };
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: true,
//             artist: {},
//             pricings: {},
//             work_photos: {},
//         };

//     }

//     componentDidMount() {
//        this.fetchData();
//     }

//     fetchData() {
//         console.log( this.props.id)
//         console.log('fetch')
//         this.setState({loading: true}, () => {
//             axios.get(serverUrl + 'api/search/category/' + this.props.id )
//             .then((response) => {
//                 console.log('response', response)

//                 this.setState({
//                     loading: false,
//                     ...response.data
//                 });
//             })
//             .catch((error) => {
//                 Router.push('/')
//                 this.setState({loading: false});
//             });
//         });
//     }

//     render() {
//         const { artist, pricings, loading } = this.state
//         //const { artist } = this.props;
//         return (
//             <Layout title={'Category Search'}>
//                 <div className="profile">
//                     <div className="container">
//                         <h1> Category Search Results </h1>
//                     </div>
//                 </div>
//             </Layout>
//         );
//     }
//   }

export default CategorySearchPage;
