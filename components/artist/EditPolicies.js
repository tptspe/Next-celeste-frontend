import React, { useState, useEffect, Profiler } from "react";
import Router from "next/router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import StepButtons from "./StepButtons";

export default function EditCategory(props) {

    const  [loading, setLoading] =  useState(false)
    const  [distances, setDistances] =  useState([])
    const  [created, setCreated] =  useState(false)
    const  [policy, setPolicy] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        travel_distance_id: ""        
      })

    const backLinks = {
        'create' : '/artist/create-profile/service-complete',
        'edit' : '/artist/shop'
    }
    useEffect(() => {
        let token = props.token;
        setLoading(true)

        axios
            .get(serverUrl + "api/policies/me", {
                headers: { Authorization: token }
            })
            .then(response => {
                console.log('policy', response.data)
                setLoading(false)
                if(response.data.policy) {
                  setPolicy(response.data.policy)
                }
                setDistances(response.data.distances)
                setCreated(response.data.created)
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
                Router.push("/");
            });
       
    }, []);

    let handleChange = e => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
    
        policy[name] = value;
        setPolicy({...policy})
    };


    let save = async () => {
        let token = props.token;
        let mode = props.mode;

        let params = { ...policy };
        
        try {
            if (created) {
                let resp = await axios.put(
                  serverUrl + "api/policies/me",
                  params,
                  {
                    headers: { Authorization: token }
                  }
                );
              } else {
                let resp = await axios.post(
                  serverUrl + "api/policies/me",
                  params,
                  {
                    headers: { Authorization: token }
                  }
                );
              }
            if(mode == 'create')
                Router.push("/artist/create-profile/how-it-works");
            else
                Router.push("/artist/shop");
        }
        catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="profile">
          {loading ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            <div className="container">
              <div className="row">
                <div className="row">
                  <h3> Policies </h3>
                </div>
                <div className="row description">
                  <p>Where is your home or studio?</p>
                </div>
                <div className="row">
                  <textarea
                    id="address2"
                    placeholder="Address1"
                    className="form-control"
                    onChange={handleChange}
                    name="address1"
                    value={policy.address1}
                  />
                  <div className="row divider15"></div>
                  <textarea
                    id="address2"
                    placeholder="Address2"
                    className="form-control"
                    onChange={handleChange}
                    name="address2"
                    value={policy.address2}
                  />
                </div>
                <div className="row divider15"></div>
                <div className="row">
                  <div className="col-md-5 nopadding rightSpace15">
                    <input
                      id="city"
                      placeholder="city"
                      className="form-control"
                      onChange={handleChange}
                      name="city"
                      value={policy.city}
                    />
                  </div>
                  <div className="col-md-5 nopadding rightSpace15">
                    <input
                      id="state"
                      placeholder="state"
                      className="form-control"
                      onChange={handleChange}
                      name="state"
                      value={policy.state}
                    />
                  </div>
                  <div className="col-md-2 nopadding">
                    <input
                      id="zip"
                      placeholder="zip"
                      className="form-control"
                      onChange={handleChange}
                      name="zip"
                      value={policy.zip}
                    />
                  </div>
                </div>
                <div className="row divider15"></div>
                <div className="row divider15"></div>
                <div className="row">
                  <label>How far will you travel for the booking?</label>
                  <select
                    id="travel_distance_id"
                    className="police_select"
                    onChange={handleChange}
                    name="travel_distance_id"
                    value={policy.travel_distance_id}
                  >
                    <option disabled value=""></option>
                    {distances.map(item => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <StepButtons save={save} mode={props.mode} backLink={backLinks[props.mode]}></StepButtons>
              </div>

              
            </div>
          )}
          
        </div>
    )
}