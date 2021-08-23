import React from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Layout from "../../../components/Layout";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import ProgressBar from "../../../components/common/progress_bar";
class AvailabilityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      availabilities: [],
      res: [],
      percent:70
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const res = [];
    const userInfoSource = await axios.get(
      "https://www.instagram.com/shopbetter/"
    );
    const jsonObject = userInfoSource.data
      .match(
        /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
      )[1]
      .slice(0, -1);

    const userInfo = JSON.parse(jsonObject);

    console.log(userInfo);
    console.log(
      userInfo.entry_data.ProfilePage[0].graphql.user
        .edge_owner_to_timeline_media.edges.length
    );
    // Retrieve only the first 10 results
    const mediaArray = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(
      30,
      40
    );
    for (let media of mediaArray) {
      const node = media.node;

      // Process only if is an image
      if (node.__typename && node.__typename !== "GraphImage") {
        continue;
      }

      // Push the thumbnail src in the array
      res.push(node.thumbnail_src);
    }

    console.log(res);
    this.setState({
      res: res
    });

    let token = this.props.token;
    this.setState({ loading: true }, () => {
      axios
        .get(serverUrl + "api/availability/me", {
          headers: { Authorization: token }
        })
        .then(response => {
          console.log("get policy", response);

          this.setState({
            loading: false,
            ...response.data
          });
        })
        .catch(error => {
          console.log(error);
          Router.push("/");
        });
    });
  }

  render() {
    let { percent } = this.state;
    return (
      <Layout title={"Availability"}>
        {/* start progress bar  */}
        <div className="container progress_bar">
          <div className="row">
            <ProgressBar value={percent}></ProgressBar>
          </div>
        </div>
        {/* end progress bar  */}
        <div className="profile">
          <div className="container">
            <h1> Availability </h1>
            {this.state.res.map((item, idx) => (
              <div className="item" key={idx}>
                <label className="cat_container">
                  <img src={item}></img>
                </label>
              </div>
            ))}
            <div className="page-navs">
              <div className="column-2-space">
                <span className="button">
                  <Link href={`/artist/create-profile/how-it-works`}>
                    <a className="btn btn-primary ellipsis">Back</a>
                  </Link>
                </span>
                <span className="button">
                  <Link href={`/artist/create-profile/complete`}>
                    <a className="btn btn-primary ellipsis">Next</a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default AvailabilityPage;
