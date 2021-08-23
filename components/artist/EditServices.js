import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import StepButtons from "./StepButtons";
import ServiceModal from "./ServiceModal";
import ConfirmModal from "../common/ConfirmModal";

export default function EditServices(props) {

    const  [loading, setLoading] =  useState(false)
    const  [services, setServices] = useState([])
    const  [data, setData] = useState({ 
      locations: [],
      durations: [],
      templates: []
    })
    const  [mode, setMode] = useState('new')
    const  [delId, setDelId] = useState(null)
    const  [editId, setEditId] = useState(null)
    const  [isModalVisible, setIsModalVisible] = useState(false)
    const  [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)


    const backLinks = {
        'create' : '/artist/create-profile/profile-complete',
        'edit' : '/artist/shop'
    }

    useEffect(() => {
        let token = props.token;
        setLoading(true)

        axios
            .get(serverUrl + "api/services/me/getServices", {
                headers: { Authorization: token }
            })
            .then(response => {
                setLoading(false)
                console.log('service response', response)
                setServices(response.data.services)
                setData(response.data)
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
                Router.push("/");
            });
       
    }, []);


    let toggleDetails = (e, id) => {
      var downArrow = e.currentTarget.childNodes[0].childNodes[0];
      var upArrow = e.currentTarget.childNodes[0].childNodes[1];
      var itemPanel = e.currentTarget.closest(".item");
  
      if (downArrow.classList.contains("hidden")) {
        // do some stuff
        downArrow.classList.remove("hidden");
        upArrow.classList.add("hidden");
      } else {
        downArrow.classList.add("hidden");
        upArrow.classList.remove("hidden");
      }
  
      var detailPanel = itemPanel.childNodes[1];
      detailPanel.classList.toggle("hidden");
    };
  
    let addService = newService => {
      let token = props.token;
      console.log("parent newservice", newService);
      setServices([...services, newService])
      setIsModalVisible(false)
    };
  
    let getLocation = (id) => {
      let location = "";
      if (id != null) {

        let location = data.locations.find(item => {
          return item.id == id;
        });

        console.log('getLocation', data, location, id)
        return location ? location.name : ''
      }
      return location;
    }
  
    let getTime = (id) => {
      let sTime = "";
      if (id != null) {
        let sTime = data.durations.find(item => {
          return item.id == id;
        })
        return sTime ? sTime.name : '';
      }
  
      return sTime;
    }
  
    let editService = service => {
      console.log('edited', service)
      const list = services.map(item => {
        console.log(item.id, service.id)
        if (item.id == service.id) {
          Object.entries(service).forEach(([key, value]) => {
            item[key] = value;
          });
        }
        return item;
      });
      console.log(list)
      setServices(list)
      setIsModalVisible(false)

      console.log("updated service", services);
    };
  
    let deleteService = () => {
      console.log("delete id", id);
      let id = delId;
      let token = props.token;

      setLoading(true)

     
        axios
          .delete(serverUrl + "api/services/me/deleteService", {
            headers: { Authorization: token },
            data: {
              id: id
            }
          })
          .then(response => {
            console.log("service delete", response);
            let Services = services.filter(item => item.id != id);

            setServices(Services)
            setLoading(false)
            
          })
          .catch(error => {
            console.log(error);
            //Router.push("/");
          });
      
    };

    let showServiceModal = (mode, editId = null) => {
      setIsModalVisible(!isModalVisible)
      setMode(mode)
      setEditId(editId)
      
      console.log("new modal", isModalVisible);
    };
  
    let showConfirmModal = (delId = null) => {
      setIsConfirmModalVisible(!isConfirmModalVisible)
      setDelId(delId)
    };

    let save = async () => {
        let token = props.token;
        let mode = props.mode;

        try {
            // let resp = await axios.put(
            //         serverUrl + "api/services/me",
            //         { images, new_images, deleted_images },
            //         { headers: { Authorization: token } }
            //     )
            if(mode == 'create')
                Router.push("/artist/create-profile/service-complete");
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
              {console.log("render services", services)}
              <div className="row">
                <div className="column-2-space col-sm-12">
                  <div className="imgPreview">
                    <h3> Services </h3>
                    <h6> What services do you offer? </h6>
                  </div>
                  <div className="button-group">
                    <span className="button">
                      <button
                        type="button"
                        className="btn btn-primary ellipsis btn-block"
                        onClick={() => showServiceModal("new")}
                      >
                        New Service
                      </button>
                    </span>
                  </div>
                </div>

                {services.map((service, idx) => (
                  <div className="row service" key={idx}>
                    <div className="item col-sm-12">
                      <div className=" row column-2-space">
                        <div className="body">
                          <h6>{service.name}</h6>
                          <p>{service.description}</p>
                        </div>
                        <div className="action  ">
                          <div className="column-2-space">
                            <label>
                              <b
                                onClick={() =>
                                  showServiceModal("edit", service.id)
                                }
                              >
                                Edit
                              </b>
                            </label>
                            &nbsp;&nbsp;
                            <label>
                              <b
                                onClick={() =>
                                  showConfirmModal(service.id)
                                }
                              >
                                Remove
                              </b>
                            </label>
                          </div>
                          <div
                            className="center"
                            onClick={e => {
                              toggleDetails(e, "a");
                            }}
                          >
                            <label>
                              <i className="fas fa-chevron-down"></i>
                              <i className="fas fa-chevron-up hidden"></i>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="details hidden">
                        <div className=" row column-2-start">
                          <div className="left_detail">
                            <h6>Max number of people:</h6>
                            <p>{service.max_number_of_people}</p>
                            <h6>Extra per person:</h6>
                            <p>{service.extra_per_person}</p>
                            <h6>Base Price:</h6>
                            <p>{service.base_price}</p>
                          </div>
                          <div className="">
                            <h6>Location:</h6>
                            <p>{getLocation(service.location_id)}</p>
                            <h6>Time:</h6>
                            <p>{getTime(service.duration_id)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* start service tempate  */}
                <h6> Try starting with one of these services </h6>
                <div className="row column-2-space">
                  {data.templates.map((template, idx) => {
                    return (
                      <div className="col-md-5 templateOut" key={idx}>
                        <div className="templateInner">
                          <div className="column-2-space ">
                            <div>
                              <label> {template.name} - ${template.base_price} </label>
                            </div>
                            <i className="fas fa-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}                  
                </div>
              {/* end service tempate  */}
              
              <StepButtons save={save} mode={props.mode} backLink={backLinks[props.mode]}></StepButtons>
              </div>
            </div>
          )}
          <ServiceModal
            show={isModalVisible}
            onClose={showServiceModal}
            services={data}
            token={props.token}
            editId={editId}
            mode={mode}
            action={
              mode == "new" ? addService : editService
            }
          ></ServiceModal>
          <ConfirmModal
            show={isConfirmModalVisible}
            onClose={showConfirmModal}
            action={deleteService}
            title="Are you sure to remove this service?"
          ></ConfirmModal>
          
        </div>
    );
}