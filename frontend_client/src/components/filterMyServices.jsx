import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_ALL_CATEGORIES, GET_FILTER_SERVICE_ROUTE } from './Common/utils/constants';
import { useStateProvider } from './context/StateContext';
import { cities } from "./Common/utils/cities"
import LoadingIndicator from './loadingIndicator';

const FilterMyServices = ({ setMyServices }) => {
    const [loading,setLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    const [{ authData }, dispatch] = useStateProvider();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(GET_ALL_CATEGORIES
                    , {
                        headers: {
                            Authorization: `Bearer ${authData}`,
                        },
                    }
                );
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        filterServices();
    }, [selectedCategory, selectedCity, selectedPrice]);

    const filterServices = async () => {
        setLoading(true)
        try {
            const response = await axios.get(GET_FILTER_SERVICE_ROUTE, {
                params: {
                    city: selectedCity,
                    category_id: selectedCategory,
                    ...(selectedPrice === 'PLTH' && { PLTH: true }),
                    ...(selectedPrice === 'PHTL' && { PHTL: true }),
                },
            });
            setLoading(false)
            setMyServices(response.data.data)
        } catch (error) {
            setLoading(false)
            console.error("Error filtering services:", error);
        }
    };

    return (
        <>
            {loading && <LoadingIndicator/>}
        <div className="mx-auto max-w-screen-lg sm:p-10 md:p-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="mb-4 flex flex-col w-full space-y-2">
                    <p className="mr-3 w-full px-2 font-sm">Category</p>
                    <div className="mr-3 w-full px-2">
                        <select
                            className="block p-2 w-full text-black bg-gray-50 rounded-lg border border-gray-300"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            value={selectedCategory}
                        >
                            <option value="">Choose a Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-4 flex flex-col w-full font-sm space-y-2">
                    <p className="mr-3 w-full px-2">City</p>
                    <div className="mr-3 w-full px-2">
                        <select
                            className="block p-2 w-full text-black bg-gray-50 rounded-lg border border-gray-300"
                            onChange={(e) => setSelectedCity(e.target.value)}
                            value={selectedCity}
                        >
                            <option value="">Choose a City</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-4 flex flex-col w-full font-sm space-y-2">
                    <p className="mr-3 w-full px-2">Price</p>
                    <div className="mr-3 w-full px-2">
                        <select
                            className="block p-2 w-full text-black bg-gray-50 rounded-lg border border-gray-300"
                            onChange={(e) => setSelectedPrice(e.target.value)}
                            value={selectedPrice}
                        >
                            <option value="">Choose Price Range</option>
                            <option value="PLTH">Price low to high</option>
                            <option value="PHTL">Price high to low</option>
                        </select>
                    </div>
                </div>
            </div>
            </div>
            </>
    );
};

export default FilterMyServices;
