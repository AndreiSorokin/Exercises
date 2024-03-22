import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [formVisible, setFormVisible] = useState(false);

  const hideBlogs = {
    display: formVisible ? "none" : "",
  };
  const showBlogs = {
    display: formVisible ? "" : "none",
  };

  const toggleVisibility = () => {
    setFormVisible(!formVisible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideBlogs}>
        <button className="button button-toggle" onClick={toggleVisibility} style={{width: '150px', height: '50px', fontSize: '20px'}}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showBlogs} className="togglable">
        {props.children}
        <button className="button button-toggle" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";
export default Togglable;
