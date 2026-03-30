import { Button, Modal, Switch } from "antd";
import { Form as FormikForm, Formik } from "formik";
import { useMemo } from "react";
import type { AddressData } from "./AddressCard";
import { CommonCountrySelect, CommonPinCodeInput, CommonTextInput } from "../../Attribute";
import { AddressSchema } from "../../Utils/ValidationSchemas";
import type { AddressFormValues } from "../../Types";


interface AddressFormModalProps {
  open: boolean;
  initialValues?: AddressData | null;
  onCancel: () => void;
  onSubmit: (values: AddressFormValues) => void | Promise<void>;
}

const AddressFormModal = ({ open, initialValues, onCancel, onSubmit }: AddressFormModalProps) => {
const emptyValues: AddressFormValues = useMemo(() => ({ country: "India", address1: "", address2: "", city: "", state: "", pinCode: "", isDefault: false, isActive: true, }), [] );

  const resolvedInitialValues = useMemo<AddressFormValues>(() => {
    if (!initialValues) return emptyValues;
    return {
      country: initialValues.country ?? "India",
      address1: initialValues.address1 ?? "",
      address2: initialValues.address2 ?? "",
      city: initialValues.city ?? "",
      state: initialValues.state ?? "",
      pinCode: initialValues.pinCode ?? "",
      isDefault: Boolean(initialValues.isDefault),
      isActive: typeof initialValues.isActive === "boolean" ? initialValues.isActive : true,
    };
  }, [emptyValues, initialValues]);

  return (
    <Modal open={open} title={initialValues ? "Edit Address" : "Add New Address"} onCancel={onCancel} footer={null} width={760} centered className="profile-address-modal" > 
      <Formik<AddressFormValues> initialValues={resolvedInitialValues} validationSchema={AddressSchema} onSubmit={onSubmit} enableReinitialize >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <FormikForm className="delvoura-contact-content space-y-5 mt-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <CommonCountrySelect name="country" label="Country" placeholder="Select country" value={values.country} onChange={(nextValue: string) => setFieldValue("country", nextValue)} onBlur={handleBlur} error={typeof errors.country === "string" ? errors.country : undefined} touched={!!touched.country} />
              <CommonTextInput name="state" label="State" placeholder="State" value={values.state} onChange={handleChange} onBlur={handleBlur} error={typeof errors.state === "string" ? errors.state : undefined} touched={!!touched.state}/>
              <CommonTextInput  name="city"  label="City"  placeholder="City"  value={values.city}  onChange={handleChange}  onBlur={handleBlur}  error={typeof errors.city === "string" ? errors.city : undefined}  touched={!!touched.city} />
              <CommonPinCodeInput name="pinCode" label="Pin Code" placeholder="Pin code" value={values.pinCode} onChange={handleChange} onBlur={handleBlur} error={typeof errors.pinCode === "string" ? errors.pinCode : undefined} touched={!!touched.pinCode} />
              <CommonTextInput name="address1" label="Address Line 1" placeholder="Flat / House / Building" value={values.address1} onChange={handleChange} onBlur={handleBlur} error={typeof errors.address1 === "string" ? errors.address1 : undefined} touched={!!touched.address1}   />
              <CommonTextInput name="address2" label="Landmark" placeholder="Landmark (optional)" value={values.address2} onChange={handleChange} onBlur={handleBlur} error={typeof errors.address2 === "string" ? errors.address2 : undefined} touched={!!touched.address2}   />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-[color:var(--color-text)]">Set as default</span>
                <Switch checked={!!values.isDefault} onChange={(checked) => setFieldValue("isDefault", checked)} />
              </div>
              <div className="flex gap-3">
                <Button danger size="large" className="px-8 py-2 text-base font-semibold profile-action-cancel" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={isSubmitting} size="large" className="px-8 py-2 text-base font-semibold">
                  {initialValues ? "Save Address" : "Add Address"}
                </Button>
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddressFormModal;

