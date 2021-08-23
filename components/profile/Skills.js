import React from 'react';
import Link from 'next/link';

class Skills extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const { skills } = this.props

        var words = skills.split(',');

        return (
            <div className="skill_group">
                { words.map((word, i) => {     
                    return (
                        <p key={i} className="skill">{ word }</p>
                    )
                    
                })}
            </div>
        );
    }
}

export default Skills;
