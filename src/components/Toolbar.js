import React from "react";

const Toolbar = (props) => {
  const { izbor1, izbor2, izbor3 } = props;

  return (
    <div>
      <button type="button" onClick={izbor1}>
        {props.dugme1}
      </button>
      <button type="button" onClick={izbor2}>
        {props.dugme2}
      </button>
      <button type="button" onClick={izbor3}>
        {props.dugme3}
      </button>
    </div>
  );
};

export default Toolbar;
