import React, { useState, useEffect } from "react";

const ProgressBar = (props) => {
    const [percent, setValue] = useState(props.value);
    
    const divStyle = {
        width: `${percent}%`,
        borderTop: 'solid 2px'
        
      };
  return <div style={divStyle}></div>;
};

export default ProgressBar;
