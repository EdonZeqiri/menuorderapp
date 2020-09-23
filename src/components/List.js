import React, {Component} from 'react'
import './style/List.css'

class List extends Component {
    constructor(){
        super()
        this.state={
            listItem:null,
            subMenu:null,
            invoice:[],
            meal:[],
            discountInvoice:[],
            discountMeal:[]
        }
    }

    render(props) {
        // Function to set main menu in the listItem state
        const handleClick=(e)=>{
            let x = e.currentTarget.id
            this.setState({listItem:this.props.mainMenu[x]},()=>{
            })
        }
        // Function to handle back icon to send the user back
        const handleBack = ()=>{
            this.setState({listItem:null})
        }

        // Function to set submenu in the subMenu state and price of items to invoice state
        const handleSubMenu = (e)=>{
            let y = e.currentTarget.id
            this.setState({subMenu:this.state.listItem.items[y].subMenus},()=>{
            })
            this.setState({
                invoice:[...this.state.invoice, this.state.listItem.items[y].price]
            },() =>{})

            this.setState({
                meal:[...this.state.meal, this.state.listItem.items[y].name]
            },() =>{})
        }
        //Function to add the submenu the after the modal was open 
        const handleOrderButton = ()=>{
            this.setState({subMenu:null})
        }

        return ( 
            
        <div className='menuandinvoice'>
            <div className='list_container'>

            {/* here we show the main menu just after user you enters the page */}
            {this.props.mainMenu.map(function(item, i){
            return <div key={i} className='list_item'>
                        <p>{item.name}</p>
                        <button onClick={handleClick} id={i} key={i}>Click</button>
                        <img alt='item' src={require(`${item.image}`)} />
                    </div>
            })}

            {/* we check here if the listItem is fulfill with mainmenu from data and its filled
                we open a modal to show the other type of the selected menus */}
            {(()=>{
                if(this.state.listItem != null ){
                    return(
                    <div className='modal_container'>
                        
                        <div className='modal_title'>
                            <img alt='back' onClick={handleBack} src={"https://img.icons8.com/material-rounded/60/000000/back.png"} />
                            <h1>{this.state.listItem.name}</h1>
                        </div>
                        <div className='modal'>
                            {this.state.listItem.items.map(function(item,i){
                                return <div onClick={handleSubMenu} id={i} className='modal_item'>
                                    <img alt='sub' src={require(`${item.image}`)} />
                                    <p>{item.name}</p>
                                    <p>Price:{item.price}₺</p>
                                    <button>Choose</button>
                                </div>
                            })}
                        </div>
                    </div>)
 
                } else {
                    
                }
            }
            )()}

            {/* we check here if the subMenu is fulfill with data and its filled
                we open a modal to show and allow user to select submenus */}
            {(()=>{
                if(this.state.subMenu != null || undefined){
                    return(
                        <div className='submenu_container' >
                            {this.state.subMenu.map(function(item){
                                return <li>
                                    <input type="checkbox"/> {item}      
                                    </li>
                            })}
                            <br/>
                            <button onClick={handleOrderButton}>Add</button>
                        </div>
                    )
                } else {}
                
            })()}
            
            {/* here we show the selected item and prices at the invoices on the right */}
            </div>
            <div className='invoice_main_container'>
                <div className='invoice_container'>

                        <div className='invoice_container_left'>
                            {this.state.meal.map(function(item,i){
                                return(
                                    <li key={i}>
                                        {item} 
                                    </li>
                                )
                            })}
                        </div>
                        
                        <div className='invoice_container_right'>
                        {this.state.invoice.map(function(item,i){
                            return(
                                <li key={i}>
                                    {item} <span>₺</span>
                                </li>
                            )
                        })}
                        </div>
                    </div>

                    {/* here we have presented the total of the invoice*/}
                    <div className='invoice_total'>
                    {(()=>{
                        
                        if(this.state.invoice.length > 0){
                            let numberArray = this.state.invoice.map(el=>parseInt(el))
                            let sum = numberArray.reduce((result,number)=>result+number)
                            return(
                            <>
                            <h1>Total:{sum} <span>₺</span></h1>
                            </>
                            )
                        }
                        else {

                        }
                    })()}
                    </div>
                </div>

                {/* {(()=>{
                if(this.state.subMenu != null || undefined){
                    return(
                        <div className='submenu_container' >
                            {this.state.subMenu.map(function(item){
                                return <li>
                                    <input type="checkbox"/> {item}      
                                    </li>
                            })}
                            <br/>
                            <button onClick={handleOrderButton}>Add</button>
                        </div>
                    )
                } else {
                
                }
                
            })()}    */}
                </div>
         );
    }
}
 
export default List;