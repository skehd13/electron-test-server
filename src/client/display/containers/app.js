import React from 'react'
import {main, dongk} from "./pages"
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path="/" component={main} />
                <Route exact path="/dongk" component={dongk}/>
            </Switch>
        )
    }
}

export default App