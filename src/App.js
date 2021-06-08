import React from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

// import Keluarga from "./views/KeluargaIndex.js"
// import UserLogin from "./views/UserLogin";


function Tes(){
  let { id } = useParams();
  return <div>Now showing post {id}</div>;

  // return (<Keluarga/>);
}

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker(props => {
              return (
                
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              );
            })}
          >
            {/* <Keluarga/> */}
          </Route>
        );
      })}
    </div>
  </Router>
);
