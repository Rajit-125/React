import {
    createBrowserRouter,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Otp from "../pages/Otp";
import Home from "../components/Home";
import RootLayout from "../layouts/RootLayout";
import Profile from "../components/Profile";
import AddCart from "../components/AddCart";
import Pizza from "../components/Pizza";
import Dosa from "../components/Dosa"; 
import Meals from "../components/Meals";
import Chats from "../components/Chats";
import Juice from "../components/Juice";
import IceCream from "../components/IceCream";
import FoodItems from "../pages/food-items";

const router=createBrowserRouter(
    [
        {
            path:"/login",
            element:<LoginPage/>,
        },
        {
            path:"/otp",
            element:<Otp/>
        },
        {
            path:"/",
            element:<RootLayout/>,
            children:[
                {
                    path:"/",
                    element:<Home/>,
                },
                {
                    path:"/addcart",
                    element:<AddCart/>,
                },
                {
                    path:"/profile",
                    element:<Profile/>,
                },
                {
                    path: "/:id",
                    element: <FoodItems />
                },
                // {
                //     path:"/pizza",
                //     element:<Pizza/>,
                // },
                // {
                //     path:"/dosa",
                //     element:<Dosa/>,
                // },
                // {
                //     path:"/meals",
                //     element:<Meals/>,
                // },
                // {
                //     path:"/chats",
                //     element:<Chats/>,
                // },
                // {
                //     path:"/juice",
                //     element:<Juice/>
                // },
                // {
                //     path:"/icecream",
                //     element:<IceCream/>,
                // },
            ],
        },
    ],
)
export { router}