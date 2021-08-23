import React from 'react';
import Link from 'next/link';

class Rate extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const {rate, groupClass} = this.props
        return (
            <div className={groupClass ? groupClass : 'igroup' }>
                <i className={`fas fa-dollar-sign ${rate >= 1 ? 'active' : 'inactive'}`}></i>
                <i className={`fas fa-dollar-sign ${rate >= 2 ? 'active' : 'inactive'}`}></i>
                <i className={`fas fa-dollar-sign ${rate >= 3 ? 'active' : 'inactive'}`}></i>
                <i className={`fas fa-dollar-sign ${rate >= 4 ? 'active' : 'inactive'}`}></i>
                
            </div>
        );
    }
}

export default Rate;
