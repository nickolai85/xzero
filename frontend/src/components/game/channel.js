import React from "react";
export default props => (

    <div className = {"channel_row_"+props.item.id}>
        <div id={props.item.id} onClick={props.selectChannel}>
            {props.item.owner}
        </div>
    </div>
);
