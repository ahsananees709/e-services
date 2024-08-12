import React, {useState, useEffect} from "react";
import axios from "axios";
import { GET_ALL_CATEGORIES } from '../Common/utils/constants';
import { useStateProvider } from "../context/StateContext";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../loadingIndicator";


const Category = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [{ authData, userInfo, isSeller }, dispatch] = useStateProvider();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const response = await axios.get(GET_ALL_CATEGORIES
                    , {
                }
                );
                setLoading(false)
                setCategories(response.data.data);
            } catch (error) {
                setLoading(false)
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);
    return (
    <>
        {loading && <LoadingIndicator/>}
        <div className="px-2 py-10">
            <div id="features" className="mx-auto max-w-6xl">
                <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    Our Category
                </h2>
                <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
                {categories.map((category, index) => (
                    <li className="cursor-pointer rounded-xl bg-white px-6 py-8 shadow-sm" key={index}
              onClick={() => navigate(`/search?category=${category.title}`)}
              >
                        <h3 className="my-3 font-display font-medium">{category.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                            {category.description}
                        </p>
                    </li>
                     ))}
                </ul>
            </div>
            <div></div>
            </div>
            </>

    );
};

export default Category;