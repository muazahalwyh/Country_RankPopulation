import { Outlet } from "react-router-dom";
import CardCompare from "../component/compare/CardCompare";

function Comperation() {
  return (
      <>
        <div className="">
          <CardCompare/>
        </div>
        <Outlet/>
      </>  
  );
}

export default Comperation;


