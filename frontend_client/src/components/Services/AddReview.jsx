import { useStateProvider } from "../context/StateContext";
import { useNavigate } from "react-router-dom"
import { reducerCases } from "../context/constants";
import axios from "axios";
import { useParams } from 'react-router-dom';
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CREATE_REVIEW } from "../Common/utils/constants";
import { toast } from "react-toastify";

function AddReview() {
  const navigate = useNavigate()
  const [{ userInfo, authData }, dispatch] = useStateProvider();
  const [data, setData] = useState({ review_message: "", rating: 0 });
  const { id } = useParams();
  const addReview = async () => {
    try {
      const { review_message, rating } = data
      const response = await axios.post(CREATE_REVIEW, {
        service_id: id,
        review_message: review_message,
        rating: rating
      }, {
        headers: {
          Authorization: `Bearer ${authData}`,
        },
      });
      console.log(response.status)
      if (response.status === 200) {
        console.log(response.data.data[0])
        setData({ review_message: "", rating: 0 });
        dispatch({
          type: reducerCases.ADD_REVIEW,
          newReview: response.data.data[0],
        });
      }
      toast.success("Review Added!")
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login")
      }
      else {
        toast.error(error.response.data.message)
        // alert(error.response.data.message)
      }
    }
  };
  return (
    <>
      <div className="mb-10">
        <h3 className="text-2xl my-5 font-normal   text-[#404145]">
          Give {userInfo.users.first_name} a Review
        </h3>
        <div className="flex  flex-col  items-start justify-start gap-3">
          <textarea
            name="review_message"
            id="review_message"
            onChange={(e) => setData({ ...data, review_message: e.target.value })}
            value={data.review_message}
            className="block p-2.5 w-4/6 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Add Review"
          ></textarea>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <FaStar
                key={num}
                className={`cursor-pointer ${data.rating >= num ? "text-yellow-400" : "text-gray-300"
                  }`}
                onClick={() => setData({ ...data, rating: num })}
              />
            ))}
          </div>
          <button
            className="flex items-center bg-[#1DBF73] text-white py-2 justify-center text-md relative rounded px-5"
            onClick={addReview}
          >
            Add Review
          </button>
        </div>
      </div>
    </>
  );
}

export default AddReview;
