import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextInput from "@/components/common/TextInput";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enName]);

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

        {/* <TextInput
          errors={errors}
          label="Category Description"
          name="discription"
          register={register}
          type="text"
          clearErrors={clearErrors}
          validation={{
            maxLength: {
              value: 300,
              message: "Keep the description under 300 characters",
            },
          }}
        /> */}

        <div className=" col-span-2">
          <TextInput
            errors={errors}
            label="Banner Image URL"
            name="image"
            register={register}
            type="text"
            clearErrors={clearErrors}
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

        <div className="col-span-2 flex flex-col gap-1 rounded-xl border border-neutral-800/70 bg-slate-100 px-4 py-3">
          {categoryToggles.map(({ name, label, description }) => {
            const { ref, onChange, onBlur, name: regName } = register(name);
            const checked = Boolean(watch(name));

            return (
              <label
                key={name}
                htmlFor={name}
                className="flex w-full cursor-pointer select-none items-center justify-between gap-4 py-2"
              >
                <span className="flex flex-col">
                  <span
                    className={`text-sm font-bold ${
                      name === "emergency"
                        ? "text-red-500"
                        : "text-neutral-900 dark:text-white"
                    }`}
                  >
                    {label}
                  </span>
                  <span className="mt-0.5 text-xs font-medium text-neutral-500">
                    {description}
                  </span>
                </span>

                <input
                  type="checkbox"
                  id={name}
                  name={regName ?? name}
                  ref={ref}
                  checked={checked}
                  onChange={onChange}
                  onBlur={onBlur}
                  className="h-4 w-4 shrink-0 cursor-pointer rounded border-neutral-300 accent-[#FF6B35]"
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        <SubmiteBtn label="create Category" />
      </div>
    </form>
  );
};

export default AddCategoryForm;
