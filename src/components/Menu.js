import React, {Component} from 'react'
import jsondata from '../menu.json'
import './style/Menu.css'
import List from './List'

class Menu extends Component {
    state = { 
        mainMenu:[],
     }
    
    componentDidMount(){
        {
            this.setState({mainMenu:jsondata.menus[0].items})
        }
    }

    render() { 
        return ( 
            <div className='menu_container'>
                <div className='menu_container_left'>
                    <List mainMenu={this.state.mainMenu}/>
                </div>
            </div>
         );
    }
}
 
export default Menu;