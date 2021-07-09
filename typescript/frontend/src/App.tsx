import React, {Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import Layout from "./components/Layout/Layout";
import routes from "./routes/routes";
import Blocks from "./components/Blocks/Blocks";
import './App.sass';

function App() {
  return (
    <div>
        <Provider store={store}>
            <Router>
                <Layout>
                    <Suspense fallback={<div> Loading...</div>}>
                        <Switch>
                            {routes.map((route) => (
                                <Route
                                    path={route.path}
                                    component={route.component}
                                    key={route.path}
                                />
                            ))}
                            <Route path="/" exact component={Blocks}/>
                        </Switch>
                    </Suspense>
                </Layout>
            </Router>
        </Provider>
    </div>
  );
}

export default App;
