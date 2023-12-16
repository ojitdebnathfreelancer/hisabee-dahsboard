import { useFormik } from "formik";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import * as Yup from "yup";

const CreateCategoryModal = ({ closeModal }) => {
  const [showImg, setShowImg] = useState("");

  const createCategorySchema = Yup.object({
    name: Yup.string().required("Please write name"),
    file: Yup.string().required("Please attach a image"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      file: "",
    },
    validationSchema: createCategorySchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4 py-12">
        <div className="space-y-2">
          <label className="block text-[18px]">
            Name:<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="w-full rounded border py-2 px-4 focus:outline-0"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            placeholder="Enter Name"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="font-medium text-meta-1">{formik.errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-[18px]">Change Logo:</h3>
          <div className="relative h-[75px] w-[75px] shadow-lg">
            <div className="absolute right-0">
              <input
                className="absolute right-0 z-50 cursor-pointer opacity-0"
                title="Change Logo"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                id="file"
                name="file"
                onChange={formik.handleChange}
                onMouseOut={(e) => {
                  setShowImg(e.target.files[0]);
                }}
                value={formik.values.file}
                onBlur={formik.handleBlur}
              />
              <span className="absolute right-0 z-10">
                <BiPencil />
              </span>
            </div>
            {showImg ? (
              <img
                className="h-full w-full"
                src={URL.createObjectURL(showImg)}
                alt="img-uploader"
              />
            ) : (
              <img
                className="h-full w-full"
                src="https://infypos.infyom.com/images/productCategory_logo.jpeg?40b774756dfcc6539f1ec08e9d03b41d"
                alt="img-uploader"
              />
            )}
          </div>
          {formik.errors.file && formik.touched.file && (
            <p className="font-medium text-meta-1">{formik.errors.file}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-x-4">
        <button
          type="submit"
          className="rounded bg-[#9ba3ff] px-6 py-2 text-[18px] text-white"
        >
          Save
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="rounded bg-[#adb5bd] px-6 py-2 text-[18px]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateCategoryModal;
