import React, { useState } from "react";

function ImageUpload({ cover_photo, setCoverPhoto }) {

  const [message, setMessage] = useState();
  const handleFile = (e) => {
    setMessage("");
    const file = e.target.files[0];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    if (file && validImageTypes.includes(file.type)) {
      setCoverPhoto(file);
    } else {
      setMessage("Only images (JPEG, PNG, GIF) are accepted.");
    }
  };

  const removeImage = (i) => {
    setCoverPhoto(cover_photo.name !== i);
  };
  return (
    <div>
      <div className="flex  items-center px-3">
        <div className="rounded-lg  bg-gray-50 w-full">
          <div className="m-4">
            <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
              {message}
            </span>
            <div className="flex items-center justify-center w-full">
              <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFile}
                  className="opacity-0"
                  multiple={false}
                  name="cover_photo"
                />
              </label>
            </div>
            {cover_photo && (
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="overflow-hidden relative">
                  <i
                    onClick={() => {
                      removeImage(cover_photo.name);
                    }}
                    className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer z-20"
                  >
                    X
                  </i>

                  <div className="relative h-20 w-20 rounded-md">
                    <img
                      src={URL.createObjectURL(cover_photo)} fill alt="Gigs" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
