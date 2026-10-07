import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextInput from "@/components/common/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

const AddLocationForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      region: "",
    },
  });
  return (
    <div>
      <form className=" wrapper space-y-2 ">
        <TextInput
          errors={errors}
          label="Location Name"
          name="name"
          register={register}
          type="text"
          required
          validation={{ required: "Location Is Required" }}
          
        />

        <TextInput
          errors={errors}
          label="Region"
          name="region"
          register={register}
          type="text"
          required
          validation={{ required: "Region is Required" }}
        />
      </form>

      <div className=" flex justify-end mt-2">
        <SubmiteBtn label="save Entry" />
      </div>
    </div>
  );
};

export default AddLocationForm;
