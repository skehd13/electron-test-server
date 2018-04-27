import React from 'react'
import {test} from "./pages"
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path="/" component={test} />
            </Switch>
        )
    }
}

export default App