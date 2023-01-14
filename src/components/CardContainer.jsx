import React from "react";

import { Card } from "./";

const CardContainer = ({ data }) => {

  return (
    <div className="grid grid-cols-2 gap-4 px-2 md:px-10">
      {data?.map((item, idx) => {
        return <Card key={idx} data={item} />;
      })}
    </div>
  );
};

export default CardContainer;
