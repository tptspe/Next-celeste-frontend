import React, { useState, useEffect } from "react";
import Link from 'next/link';
//import queryString from 'query-string';
import io from "socket.io-client";
import cookie from "js-cookie";

import Layout from '../../../components/Layout';

import Messages from './Messages/Messages';
import Input from './Input/Input';

let socket;

function ChattingPage(props) {

    console.log('name', cookie.get("name"))
    const pageTitle = 'Chatting'
    const [name, setName] = useState(cookie.get("name"));
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:4000/';
    
    useEffect(() => {
        //const { name, room } = queryString.parse(location.search);
    

        const room = 'test'
        socket = io(ENDPOINT);
    
        setRoom(room);
    
        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });
      }, [ENDPOINT]);
    
      useEffect(() => {
        socket.on('message', (message) => {
          setMessages([...messages, message ]);
        });
    
        socket.on('roomData', ({ users }) => {
          setUsers(users);
        })
    
        return () => {
          socket.emit('disconnect');
    
          socket.off();
        }
      }, [messages])
    
      const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    return (
        <Layout title={ pageTitle }>
            <div className="message">
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-4 left_profile">
                                <div className="my_history">
                                    <img src={"/images/user2.jpg"} />
                                    <h3>Mylah Morales</h3>
                                    <h5>Brooklyn, NY</h5>
                                    <p>5 appointments</p>
                                    <div className="requests">
                                        <div className="inner_req">
                                            <p>Open requests:</p>
                                            <p>Bridal on 12/4/2019</p>
                                        </div>
                                        <p>view</p>
                                    </div>
                                    <Link href="/"><a>Report</a></Link>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <Messages messages={messages} name={name} />
                                <div className="message_item">
                                    {/* <p className={mes_flag ? "show" : "hidden"}>{showmessage}</p> */}
                                    <p className={"show"}>asdfasdf</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    {/* <div className="footer container">
                        <div className="upload-btn-wrapper">
                            <button className="btn"><i className="far fa-file-image"></i></button>
                            <input type="file" name="myfile" />
                        </div>
                        <form onSubmit={sendMessage}>
                            <input type="text" className="text_input" placeholder="Type here" value={message} onChange={e => setMessage(e.target.value)}/>
                        </form>
                        <div className="enter">
                            <i className="fas fa-arrow-up"></i>
                        </div>
                    </div> */}
                </div>
            </div>
        </Layout>
    );
}
  
export default ChattingPage;