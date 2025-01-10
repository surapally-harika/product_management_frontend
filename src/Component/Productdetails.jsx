import React,{useState} from "react";
import "./Product.css"


function Product() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");
    
        const onSubmitValue = ( name, value )  => {
             
              if(name === 'name') { 
                setName(value)
              }
              if(name === 'price'){
                 setPrice(value)
            }
            if (name === 'url') {
                setUrl(value)
            }
        } 
        
        const  handleSubmit  = () => {
              console.log("Handle submit is clicked : " + name  + " " + price + " " + url)
        }
    return (
        <>
            <div>
                <h3>Add New Product</h3>
            </div>
            <div className="product">
                <label>Name:</label><br/>
                <input type="text" name="name"></input>
                <br></br>
                <label>Price:</label><br/>
                <input type="text" name="price"></input>
                <br></br>
                <label>Url:</label><br/>
                <input type="text" name="url"></input><br/><br/>
                <input type="button" value={"submit"}/>
            </div>
        
        </>
    )

}
export default Product;