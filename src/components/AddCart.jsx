import { useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Supabase from "../Supabase/Client";

function AddCart() {
    const cart = useContext(CartContext);
    const removeFromCart = (id, name) => {
        cart.setCartData((prev) => {
            const updatedCart = prev.map((item) =>
                item.id === id && item.name === name ? { ...item, count: Math.max(item.count - 1, 0) } : item
            );
            return updatedCart.filter((item) => item.count > 0)
        });
    };
    // useEffect(async () => {
    //     const { data: { user } } = await Supabase.auth.getUser()
    //     console.log(user)
    // }, [])
    const totalAmount = cart.cartData.reduce(
        (total, item) => total + item.price * item.count, 0
    );
    let navigate = useNavigate()
    async function placeOrderHandler() {
        try {

            const { data: { user } } = await Supabase.auth.getUser()
            const orderDetails = cart.cartData.map((item) => ({
                itemname: item.name,
                totalprice: item.price,
                user_id:user.id,
                phone_number:"91-9483846545",
                no_of_items:item.count,
            }))
            const { error } = await Supabase.from("orderdetail").insert(orderDetails)
            console.log(error)
            cart.setCartData([])
            navigate("/profile")
            alert("Order placed successfully");
        } catch (error) {
            console.error(error)
            alert("Error occurred while placing the order");
        }
    }

    return (
        <>
            <div>
                {
                    cart.cartData.length ? (
                        cart.cartData.map(item => {
                            return (
                                <>
                                    <p className=" mx-10 my-10 flex items-center text-2xl text-blue-400">{item.name}----${item.price} *{item.count}</p>
                                    <button className=" mx-10 flex items-center text-xl font-bold bg-blue-400 hover:text-slate-100 py-2 px-2 rounded-xl" onClick={() => removeFromCart(item.id, item.name)}>remove </button>
                                </>
                            )
                        })
                    ) : (
                        <h1 className=" mx-40 my-40 flex text-8xl">First Order karo bhaiiiiiiiiiiiii</h1>
                    )
                }
                {cart.cartData.length > 0 && (
                    <div>
                        <p className="mx-10 mt-5 mb-10 text-2xl text-blue-400">
                            Total Amount: ${totalAmount.toFixed(2)}
                        </p>
                        <button
                            className="mx-10 flex items-center text-xl font-bold bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={placeOrderHandler}>
                            Place Order
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
export default AddCart