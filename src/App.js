import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Soin, Pyjamas,Peluche, } from "./components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Form from "./components/Login/Form";



import Home from "./components/Home/Home"

import { message } from "antd";
import Pslider from "./components/Pslider/Pslider";
import Slider from './components/Slider/Slider';
import Footer from "./components/Footer/Footer";
import Nav2 from "./components/Navbar/Nav2";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const [products, setProducts] = useState([]);
  const [cart, SetCart] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    SetCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const cart = await commerce.cart.add(productId, quantity);
    SetCart(cart);
    if (cart) {
      messageApi.open({
        key,
        type: "success",
        content: "Produit Ajoutè",
        duration: 2,
        style: {
          marginTop: "10vh",
        },
      });
    }
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    SetCart(cart);
  };

  const handleremoveFromcart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    SetCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    SetCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log(cart);

  return (
    <>
      {contextHolder}
      <Router>
        <div className="app">
          <Navbar totalItems={cart?.total_items} />
          
          <Switch>
            <Route exact path="/">
              <Products products={products} onAddToCart={handleAddToCart} />
            </Route>
            <Route exact path="/cart">
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleremoveFromcart={handleremoveFromcart}
                handleEmptyCart={handleEmptyCart}
              />
            </Route>
            <Route exact path="/mugs">
              <Pyjamas products={products} onAddToCart={handleAddToCart} />
            </Route>
            <Route exact path='/soin'>
              <Soin products={products} onAddToCart={handleAddToCart}/>
            </Route>
            <Route exact path='/peluche'>
              <Peluche products={products} onAddToCart={handleAddToCart}/>
            </Route>
            
            <Route exact path='login'>
              <Form/>
            </Route>
          
  
            <Route exact path='/home'>
            
            <Slider/>
            <Pslider></Pslider> 
            <Footer/>
           </Route> 
            
          </Switch>
       
        </div>
      </Router>
      
    </>
  );
}
export default App;
