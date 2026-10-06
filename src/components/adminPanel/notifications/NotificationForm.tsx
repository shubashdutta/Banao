import SelectField from "@/components/common/SelectField";
import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextArea from "@/components/common/TextArea";
import TextInput from "@/components/common/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

const NotificationForm = () => {
  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      notificationTitle: "",
      type: "",
      category: "",
      englishContent: "",
      nepaliContent: "",
    },
  });

  const channeltypeOption = [
    { label: "Push Notification", value: "pushNotification" },
    {
      label: "SMS",
      value: "sms",
    },
    {
      label: "Email",
      value: "email",
    },
    {
      label: "WhatsApp",
      value: "whatsapp",
    },
    {
      label: "in-App Notification",
      value: "in-app-notification",
    },
  ];

  const categoryType = [
    { label: "OTP Authentication", value: "otpAuthentication" },
    { label: "Booking Created", value: "bookingCreated" },
    { label: "Booking Accepted", value: "bookingAccepted" },
    { label: "Provider Arriving", value: "providerArriving" },
    { label: "Job Completed", value: "jobCompleted" },
    { label: "Payout Approved", value: "payoutApproved" },
    { label: "Support Ticket", value: "supportTicket" },
  ];
  return (
    <form>
      <div className=" wrapper grid  grid-cols-2 gap-2 max-h-96 overflow-y-auto no-scrollbar">
        <div className=" col-span-2">
          <TextInput
            errors={errors}
            label="Template Title"
            name="notificationTitle"
            type="text"
            register={register}
            clearErrors={clearErrors}
            required
            validation={{ required: "Title is Required" }}
          />
        </div>

        <SelectField
          control={control}
          name="type"
          options={channeltypeOption}
          isRequired
          validation={{ required: "Channel Type is Required" }}
          label="Channel Type"
        />

        <SelectField
          control={control}
          name="category"
          options={categoryType}
          isRequired
          validation={{ required: "Workflow Category is Required " }}
          label="Workflow Category"
        />

        <div className=" col-span-2">
          <TextArea
            control={control}
            errors={errors}
            name="englishContent"
            label="English Content"
            isRequired
            // height="150px"
          />
        </div>

        <div className=" col-span-2">
          <TextArea
            control={control}
            errors={errors}
            label="Nepali Content"
            name="nepaliContent"
            isRequired
          />
        </div>
      </div>

      <div className=" flex justify-end mt-2">
        <SubmiteBtn label="Save Tempalte" />
      </div>
    </form>
  );
};

export default NotificationForm;
