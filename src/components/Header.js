import React, {Component} from 'react';
import CartScrollBar from './CartScrollBar';
import Counter from './Counter';
import EmptyCart from '../empty-states/EmptyCart';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {findDOMNode} from 'react-dom';
import $ from 'jquery'; 

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            username: ''
        };
    }
    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }
    handleSubmit(e){
        e.preventDefault();
        var user = this.state.username;
        this.setState({
            username: user
        });
    }

    addOrder(e){
        e.preventDefault();
        $.ajax({
            url:"https://api.myjson.com/bins/m73yf",
            type:"PUT",
            data: JSON.stringify({"user":this.state.username,"cost":this.props.total,"order": this.props.totalItems}),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data, textStatus, jqXHR){
                alert('Order Added');
            }
        }); 
    }

    handleUserChange(e){
        e.preventDefault();
        this.setState({
            username: e.target.value
        });
    }

    handleClickOutside(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        const buttonNode = findDOMNode(this.refs.cartButton);
        if(cartNode.classList.contains('active')){
            if (!cartNode || !cartNode.contains(event.target)){
                this.setState({
                    showCart: false
                })
                event.stopPropagation();
            }
        } 
    }
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }
    render(){
        let cartItems;
        cartItems = this.state.cart.map(product =>{
			return(
				<li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">{product.price}</p>
                    </div>
                    <div className="product-total">
                        <p className="quantity">{product.quantity} {product.quantity > 1 ?"Nos." : "No." } </p>
                        <p className="amount">{product.quantity * product.price}</p>
                    </div>
                    <a className="product-remove" href="#" onClick={this.props.removeProduct.bind(this, product.id)}>×</a>
                </li>
			)
		});
        let view;
        if(cartItems.length <= 0){
			view = <EmptyCart />
		} else{
			view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items">{cartItems}</CSSTransitionGroup>
		}
        return(
            <header>
                <div className="container">
                    <div className="brand">
                        <img className="logo" src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png" alt="Veggy Brand Logo"/>
                    </div>  
                    <div className="search">
                        <form onSubmit={(e) => this.handleSubmit}>
                            <input value={this.state.username} onChange={e => this.handleUserChange(e)} />
                            <button onClick={(e) => this.handleSubmit(e)}>Add Username</button>
                        </form>    
                    </div>
                    <div className="cart"> 
                        <div className="cart-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>No. of items</td>
                                        <td>:</td>
                                        <td><strong>{this.props.totalItems}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Sub Total</td>
                                        <td>:</td>
                                        <td><strong>{this.props.total}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img className={this.props.cartBounce ? "tada" : " "} src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png" alt="Cart"/>
                            {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" }
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                            <CartScrollBar>
                                {view}
                            </CartScrollBar>
                            <div className="action-block">
                            <form onSubmit={(e) => this.addOrder}>
                                <button onClick={(e) => this.addOrder(e)} type="button" className={this.state.cart.length > 0 ? " " : "disabled"}>PROCEED TO CHECKOUT</button>
                            </form>    
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;
