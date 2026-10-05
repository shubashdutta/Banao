import FileUploader from "@/components/common/FileUploader";
import SelectField from "@/components/common/SelectField";
import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextInput from "@/components/common/TextInput";
import { useFileInput } from "@/hooks/useFileInput";
import React from "react";
import { useForm } from "react-hook-form";

const PaymentPayoutForm = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      paymentDate: "",
      methods: "",
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

  const paymentMethods = [
    { label: "E-Wallet", value: "e-wallet" },
    { label: "Cash", value: "cash" },
    { label: "Bank", value: "bank" },
  ];
  return (
    <form>
      <div className=" grid grid-cols-2 gap-2 wrapper mb-2 max-h-96 overflow-y-auto no-scrollbar">
        <TextInput
          errors={errors}
          label="Title"
          name="title"
          register={register}
          type="text"
          required
          validation={{ required: "Title is Required" }}
        />

        <TextInput
          errors={errors}
          label="Payment Date"
          name="date"
          register={register}
          type="date"
          required
          validation={{ required: "Payment Date is Required" }}
        />

        <div className=" col-span-2">
          <SelectField
            control={control}
            errors={errors}
            name="paymentMethod"
            label="Payment Method"
            options={paymentMethods}
            placeholder="Select payment method"
            isRequired
            validation={{
              required: "Payment method is required",
            }}
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
            label="Payment Receipt"
            description="Upload payment receipt image"
            multiple={false}
          />
        </div>
      </div>

      <div className=" flex justify-end">
        <SubmiteBtn label="Pay" />
      </div>
    </form>
  );
};

export default PaymentPayoutForm;
