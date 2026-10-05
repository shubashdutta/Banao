import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextInput from "@/components/common/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

const AddSubCategory = () => {
  const {
    clearErrors,
    control,
    formState: { errors },
    getErrors,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      enTitle: "",
      npTitle: "",
      price: "",
    },
  });
  return (
    <form>
      <div className="  max-h-96 overflow-y-auto  space-y-1">
        <TextInput
          errors={errors}
          label="Subcategory Title (English) "
          name="enTitle"
          type="text"
          register={register}
          required={true}
          validation={{ required: "Title is Required" }}
        />

        <TextInput
          errors={errors}
          label="Subcategory Title (नेपाली नाम)"
          name="npTitle"
          register={register}
          type="text"
        />

        <TextInput
          errors={errors}
          label="Base Service Price (NPR रू) "
          name="price"
          register={register}
          type="number"
          required={true}
          validation={{ required: "Price is Required" }}
        />
      </div>
      <div className="flex items-center justify-end gap-x-4 pt-4 border-t border-neutral-100">
        <SubmiteBtn label="Add SubCategory" />
      </div>
    </form>
  );
};

export default AddSubCategory;
