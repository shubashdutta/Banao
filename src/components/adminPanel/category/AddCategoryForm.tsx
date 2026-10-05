import FileUploader from "@/components/common/FileUploader";
import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextInput from "@/components/common/TextInput";
import { useFileInput } from "@/hooks/useFileInput";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export interface AddCategoryFormValues {
  enName: string;
  npName: string;
  slug: string;
  discription: string;
  image: string;
  featuredCategory: boolean;
  emergency: boolean;
}

interface AddCategoryFormProps {
  /** Receives trimmed values on a valid submit. Await it to show a busy button. */
  onSubmit?: (data: AddCategoryFormValues) => void | Promise<void>;
  /** Called when Cancel is clicked. Omit to hide the Cancel button. */
  onCancel?: () => void;
  cancelLabel?: string;
  submitLabel?: string;
}

/** Turns a title into a URL-safe slug: lowercase latin letters, digits and dashes. */
const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Toggle rows rendered inside the "category options" panel. */
const categoryToggles = [
  {
    name: "featuredCategory",
    label: "Featured Category",
    description: "Display prominently on mobile home page",
  },
  {
    name: "emergency",
    label: "Emergency Category",
    description: "Allow instant night/holiday emergency bookings",
  },
] as const;

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
  onSubmit,
  onCancel,
  cancelLabel = "Cancel",
  submitLabel = "Create Category",
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddCategoryFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      enName: "",
      npName: "",
      slug: "",
      discription: "",
      image: "",
      featuredCategory: true,
      emergency: false,
    },
  });

  /** Last slug we generated ourselves, so a manual edit is never overwritten. */
  const [autoSlug, setAutoSlug] = useState("");
  const enName = watch("enName") ?? "";
  const slug = watch("slug") ?? "";
  const image = watch("image") ?? "";

  useEffect(() => {
    const generated = slugify(enName);
    setAutoSlug(generated);
    if (!slug || slug === autoSlug) {
      setValue("slug", generated);
    }
  }, [enName]);

  const [
    files,
    handleFilesChange,
    removeFiles,
    setFiles,
    loadingFiles,
    fileError,
  ] = useFileInput(null, "PHOTO");

  const onValid = async (data: AddCategoryFormValues) => {
    await onSubmit?.({
      ...data,
      enName: data.enName.trim(),
      npName: data.npName.trim(),
      slug: data.slug.trim(),
      discription: (data.discription ?? "").trim(),
      image: (data.image ?? "").trim(),
    });
    reset();
  };

  const showBannerPreview = Boolean(image.trim()) && !errors.image;

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-5">
      <div className="  grid grid-cols-2 gap-1.5 max-h-96 overflow-y-auto no-scrollbar wrapper">
        <TextInput
          errors={errors}
          label="English Category Name"
          name="enName"
          register={register}
          type="text"
          required
          clearErrors={clearErrors}
          validation={{
            required: "English Category Name is Required",
            maxLength: {
              value: 60,
              message: "Keep the name under 60 characters",
            },
          }}
        />

        <TextInput
          errors={errors}
          label="Nepali Category Name (नेपाली नाम)"
          name="npName"
          register={register}
          type="text"
          required
          clearErrors={clearErrors}
          validation={{
            required: "Nepali Category Name is Required",
            maxLength: {
              value: 60,
              message: "Keep the name under 60 characters",
            },
          }}
        />

        <div className=" col-span-2">
          <TextInput
            errors={errors}
            label="Category URL Slug"
            name="slug"
            register={register}
            type="text"
            clearErrors={clearErrors}
            validation={{
              required: "Category URL Slug is Required",
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
            label="Category Image"
            description="Upload Category  image"
            multiple={false}
          />
        </div>

        {showBannerPreview && (
          <div className="overflow-hidden rounded-xl border border-neutral-800">
            <img
              src={image.trim()}
              alt="Banner preview"
              className="h-32 w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="col-span-2 space-y-2">
          <label
            htmlFor="discription"
            className="block text-sm font-medium text-neutral-500"
          >
            Category Description
          </label>
          <TextArea
            id="discription"
            rows={4}
            maxLength={300}
            {...register("discription", {
              maxLength: {
                value: 300,
                message: "Keep the description under 300 characters",
              },
            })}
          />
          {errors.discription?.message && (
            <span className="block pl-1 text-xs text-red-500">
              {errors.discription.message}
            </span>
          )}
        </div>

        <div className="col-span-2 rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-slate-950">
          <div className="flex flex-col gap-2">
            {categoryToggles.map(({ name, label, description }) => {
              const checked = Boolean(watch(name));

              return (
                <div
                  key={name}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg border px-3.5 py-3 transition-all duration-200 ${
                    checked
                      ? "border-[#FF6B35]/40 bg-[#FF6B35]/5"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-slate-950 dark:hover:border-neutral-700 dark:hover:bg-slate-900"
                  }`}
                >
                  <label
                    htmlFor={name}
                    className="min-w-0 flex-1 cursor-pointer select-none"
                  >
                    <div
                      className={`text-sm font-semibold ${
                        name === "emergency"
                          ? "text-red-500"
                          : "text-neutral-900 dark:text-white"
                      }`}
                    >
                      {label}
                    </div>

                    <div className="mt-0.5 text-xs font-medium leading-5 text-neutral-500 dark:text-neutral-400">
                      {description}
                    </div>
                  </label>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-label={label}
                    onClick={() =>
                      setValue(name, !checked, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 ${
                      checked
                        ? "bg-[#FF6B35]"
                        : "bg-neutral-300 dark:bg-neutral-700"
                    }`}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        checked ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        <SubmiteBtn label="create Category" />
      </div>
    </form>
  );
};

export default AddCategoryForm;
