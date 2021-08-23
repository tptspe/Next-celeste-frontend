import React from "react";
import Link from "next/link";

export default function StepButtons(props) {

    return (
        <div className="page-navs">

            <div className="column-2-space">
                <span className="button">
                    <Link href={props.backLink}>
                        <a className="btn btn-secondary btn-block">Back</a>
                    </Link>
                </span>
                <span className="button">
                    <button
                        type={props.type ? "submit" : "button" }
                        className="btn btn-primary ellipsis btn-block"
                        onClick={props.save}
                        disabled={props.disabled}
                    >
                        { props.mode == 'create' ? 'Next' : 'Save' }
                    </button>
                </span>
            </div>
            
        </div>
    )
}