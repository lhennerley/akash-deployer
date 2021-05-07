import React from "react";

type MarketplaceAppType = {
  name: string;
  onClick: () => void;
};

const MarketplaceApp = (props: MarketplaceAppType) => {
  return (
    <div className="w-3/12 p-2" onClick={() => props.onClick()}>
      <div className="bg-gradient-to-r from-akash-red-dark via-akash-red to-akash-red-darker h-10 rounded-md flex cursor-pointer">
        <div className="align-middle m-auto text-sm text-white text-center font-extralight capitalize">
          {props.name}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceApp;
