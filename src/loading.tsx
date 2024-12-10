import { Spin } from "antd";
import React from "react";

export default () => {
  return (
    <div style={{ height: "50vh",  display: "flex", justifyContent: "center",alignItems: "center" }}>
      <Spin size="large" spinning />
    </div>
  );
};
