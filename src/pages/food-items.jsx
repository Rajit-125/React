import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Supabase from "../Supabase/Client"
import CartContext from "../context/CartContext"

function FoodItems() {
    const { id } = useParams()

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const cart = useContext(CartContext);
    const addHandler = (id, name, price) => {
        cart.setCartData((prev) => {
            const itemIndex = prev.findIndex(pizza => pizza.id === id && pizza.name === name)
            if (itemIndex !== -1) {
                const updatedCart = prev.map(pizza =>
                    pizza.id === id && pizza.name === name ? { ...pizza, count: pizza.count + 1 } : pizza
                )
                return updatedCart
            }
            else {
                return [...prev, { id, name, price, count: 1 }]
            }
        });
    }

    async function fetchData() {
        const { data: d, error: e } = await Supabase.from("fooditem").select("*, foodtype(*)").eq("foodtype_id", id)
        setData(d)
        setError(e)
    }


    useEffect(() => {
        fetchData()
        console.log("ID:", typeof (id))
    }, [])

    if(!data){
        return <p>loading........</p>
    }

    return (
        <>
            <div className={` flex flex-col flex-1 bg-cover`}  style={{backgroundImage:`url("${data[0].foodtype.id}.jpg")`}}>
                <h1 className=" mx-96 flex items-center text-9xl text-cyan-50">{data && data[0].foodtype.name}</h1>
                {
                    data && data.map(item =>
                        <div key={item.id}>
                            <FoodItem id={item.id} name={item.name} size={item.size} price={item.price} button="ADD" onClick={addHandler}></FoodItem>
                        </div>
                    )
                }
            </div>
        </>
    )
}

function FoodItem({ id, name, size, price, button, onClick }) {
    return (
        <>
            <p className=" mx-72 my-10 flex items-center text-3xl text-white font-bold">{name}-{size}-------${price}</p>
            <button className=" mx-72 flex items-center text-3xl text-cyan-50 font-bold bg-blue-500 w-20 hover:text-red-500 py-2 px-2 rounded-xl" onClick={() => onClick(id, name, price)}>{button}</button>
        </>
    )
}

export default FoodItems