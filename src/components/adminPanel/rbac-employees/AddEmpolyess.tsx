import SelectField from "@/components/common/SelectField";
import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextInput from "@/components/common/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

const AddEmpolyess = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    clearErrors,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
    },
  });

  const roleOptions = [
    { label: "Finance Admin (Payout)", value: "payout" },
    { label: "Operations Manager", value: "manager" },
    { label: "Verification Officer", value: "officer" },
    { label: "Support Lead", value: "supportLead" },
  ];

  return (
    <form>
      <div className=" max-h-96 overflow-y-auto no-scrollbar wrapper grid grid-cols-2 gap-2.5">
        <TextInput
          errors={errors}
          label="Full Name"
          name="fullName"
          register={register}
          type="text"
          clearErrors={clearErrors}
          required
          validation={{ required: "Full Name is Required" }}
        />

        <TextInput
          errors={errors}
          label="Email"
          name="email"
          register={register}
          type="email"
        />

        <div className=" col-span-2">
          <SelectField
            control={control}
            name="role"
            options={roleOptions}
            errors={errors}
            isRequired
            isMulti
            label="Role Assigement"
          />
        </div>
      </div>

      <div className=" flex justify-end mt-3">
        <SubmiteBtn label="Add Staff" />
      </div>
    </form>
  );
};

export default AddEmpolyess;
