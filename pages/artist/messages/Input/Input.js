import React from 'react';


const Input = ({ setMessage, sendMessage, message }) => (
    <div className="footer container">
        <div className="upload-btn-wrapper">
            <button className="btn"><i className="far fa-file-image"></i></button>
            <input type="file" name="myfile" />
        </div>
        <form onSubmit={sendMessage}>
            <input type="text" 
                className="text_input" 
                placeholder="Type here" 
                value={message} 
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
        </form>
        <button className="enter" onClick={e => sendMessage(e)}>
          <i className="fas fa-arrow-up"></i>
        </button>
    </div>
)

export default Input;