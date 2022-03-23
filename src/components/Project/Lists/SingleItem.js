import React from "react";

const styles = {
  item: {
    border: "1px solid #333",
    margin: "8px",
    padding: "10px",
    backgroundColor: "#282828",
    borderRadius: "6px",
    wordWrap: "break-word",
    maxWidth: '100%'
  },
  title: {},
  description: {
    color: "#888",
    maxWidth: "23%",
  },
};

const SingleItem = ({ task }) => {
  return (
    <div style={styles.item}>
      <span style={styles.title}> {task.name} </span> <br />
      <span style={styles.description}>
        {task.description ? task.description.slice(0, 25) + "..." : ""}
      </span>
    </div>
  );
};

export default SingleItem;
