import React from 'react';

import Rate from '../components/profile/Rate';
import Layout from '../components/Layout';

class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            artists: [1,2,3,4,5,6,7,8,9,10,11,12]
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let { artists } = this.state
        artists = artists.map(artist => {
            return {
                name : "Claire beckham",
                year : artist * 7 % 10 + 1,
                rate : artist * 3 % 4 + 1,
                location : "Brooklyn, New York"
            }
        })
        this.setState({artists});
    }

    render() {
        const { artists } = this.state
        
        return (
            <Layout title={'Index'}>
                <div className="suggest">
                    <div className="divider"></div>
                    <div className="inner_suggest">
                        <div className="container-fluid">
                            <div className="filter_part">
                                <i className="fas fa-filter"></i>
                                <button className="filter_btn">Location</button>
                                <button className="filter_btn">Experience</button>
                                <button className="filter_btn">Rate</button>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="inner_suggest">
                        <div className="container-fluid">
                            <div className="artists">
                                <h3>Suggested Artists</h3>
                                <div className="row">
                                    { artists.map((artist, i) => {     
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                                                <div className="card">
                                                    <div className="card-header">
                                                        <img src="/images/artist2.png" className="card-img-top" alt=""/>
                                                        <span className="avatar">
                                                            <img src="/images/artist1.png" alt=""/>
                                                            
                                                        </span>
                                                        <span className="vetted">
                                                                <p>Vetted</p>
                                                            </span>
                                                    </div>
                                                    <div className="card-body">
                                                        <h3>Clarie beckham</h3>
                                                        <h5 className="experience">{artist.year} years of experience</h5>
                                                        <div className="rate">
                                                            <Rate rate={+artist.rate}></Rate>
                                                            <h6>Brooklyn, NY</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) 
                                    })}
                                </div>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true"><i className="fas fa-chevron-left"></i></span>
                                    </a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                                    <li className="page-item"><a className="page-link" href="#"><i className="fas fa-ellipsis-h"></i></a></li>
                                    <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">
                                            <i className="fas fa-chevron-right"></i>
                                        </span>
                                    </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
  }
  
  export default IndexPage;