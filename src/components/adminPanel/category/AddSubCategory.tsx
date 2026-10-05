import FileUploader from "@/components/common/FileUploader";
import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextInput from "@/components/common/TextInput";
import { useFileInput } from "@/hooks/useFileInput";
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

  const [
    files,
    handleFilesChange,
    removeFiles,
    setFiles,
    loadingFiles,
    fileError,
  ] = useFileInput(null, "PHOTO");
  return (
    <form>
      <div className="  grid grid-cols-2 gap-2 max-h-96 overflow-y-auto  wrapper ">
        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Subcategory Title (English) "
            name="enTitle"
            type="text"
            register={register}
            required={true}
            validation={{ required: "Title is Required" }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Subcategory Title (नेपाली नाम)"
            name="npTitle"
            register={register}
            type="text"
          />
        </div>

        <div className=" col-span-2">
          <FileUploader
            value={files}
            onChange={handleFilesChange}
            onRemove={removeFiles}
            loading={loadingFiles}
            error={fileError}
            type="PHOTO"
            label="Sub-Category Image"
            description="Upload Sub-Category image"
            multiple={false}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-4 pt-4 border-t border-neutral-100">
        <SubmiteBtn label="Add SubCategory" />
      </div>
    </form>
  );
};

export default AddSubCategory;
