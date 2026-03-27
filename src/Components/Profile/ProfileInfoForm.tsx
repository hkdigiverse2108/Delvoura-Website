import { Button, Typography, message } from "antd";
import { useMemo, useState } from "react";
import { Form as FormikForm, Formik } from "formik";
import { Mutations } from "../../Api";
import { useAppDispatch } from "../../Store/Hooks";
import { setUser } from "../../Store/Slices/AuthSlice";
import { KEYS } from "../../Constants";
import { CommonTextInput, CommonEmailInput, CommonPhoneInput } from "../../Attribute";
import { ProfileInfoSchema } from "../../Utils/ValidationSchemas";

const { Text } = Typography;

interface ProfileInfoFormProps {
  isEditing: boolean;
  onEditChange: (next: boolean) => void;
  user?: any;
}

const ProfileInfoForm = ({ isEditing, onEditChange, user }: ProfileInfoFormProps) => {
  const dispatch = useAppDispatch();
  const [formVersion, setFormVersion] = useState(0);
  const { mutate: updateUser, isPending } = Mutations.useUpdateUser({  invalidateQueryKeys: [[KEYS.USER.GET_SINGLE_USER_BY_ID]], });

  // -------- Initial Values --------
  const initialValues = useMemo(() => {
    const fullName = user?.fullName || user?.name || "";
    const [firstName = "", ...rest] = fullName.split(" ");

    return { firstName: user?.firstName || firstName, lastName: user?.lastName || rest.join(" "), email: user?.email || "", countryCode: user?.contact?.countryCode || "+91", phone: user?.contact?.phoneNo ? String(user.contact.phoneNo) : "",};
  }, [user]);

  // -------- Submit --------
  const handleSubmit = (values: any) => {
    if (!user?._id) {
      message.error("User not found");
      return;
    }

    updateUser(
      {
        userId: user._id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        contact: {
          countryCode: values.countryCode,
          phoneNo: values.phone,
        },
      },
      {
        onSuccess: (res: any) => {
          dispatch(setUser(res?.data?.user || res?.data || res));
          onEditChange(false);
          message.success("Profile updated");
          setFormVersion((v) => v + 1);
        },
        onError: () => message.error("Update failed"),
      }
    );
  };

  return (
    <div className="space-y-5">
      {/* -------- VIEW MODE -------- */}
      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text className="profile-info-label">First Name</Text>
            <Text className="profile-info-value">{initialValues.firstName}</Text>
          </div>
          <div>
            <Text className="profile-info-label">Last Name</Text>
            <Text className="profile-info-value">{initialValues.lastName}</Text>
          </div>
          <div>
            <Text className="profile-info-label">Email</Text>
            <Text className="profile-info-value">{initialValues.email}</Text>
          </div>
          <div>
            <Text className="profile-info-label">Phone</Text>
            <Text className="profile-info-value">
              {initialValues.countryCode} {initialValues.phone}
            </Text>
          </div>
        </div>
      ) : (
        /* -------- EDIT MODE -------- */
        <Formik<any> key={`${isEditing}-${formVersion}`} initialValues={initialValues} validationSchema={ProfileInfoSchema} onSubmit={handleSubmit} enableReinitialize={true} >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
            <FormikForm className="delvoura-contact-content" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CommonTextInput  name="firstName"  label="First Name"  placeholder="Enter first name"  value={values.firstName}  onChange={handleChange}  onBlur={handleBlur}  error={typeof errors.firstName === 'string' ? errors.firstName : undefined}  touched={!!touched.firstName} />
                <CommonTextInput  name="lastName"  label="Last Name"  placeholder="Enter last name"  value={values.lastName}  onChange={handleChange}  onBlur={handleBlur}  error={typeof errors.lastName === 'string' ? errors.lastName : undefined}  touched={!!touched.lastName} />
                <CommonEmailInput name="email" label="Email" placeholder="you@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} error={typeof errors.email === 'string' ? errors.email : undefined} touched={!!touched.email} />
                <CommonPhoneInput name="phone" label="Phone" placeholder="Enter phone number" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={typeof errors.phone === 'string' ? errors.phone : undefined} touched={!!touched.phone} countryValue={values.countryCode} onCountryChange={(value: string) => setFieldValue("countryCode", value)} />
              </div>

              <div className="mt-6 flex gap-3">
                <Button type="primary" htmlType="submit" loading={isPending || isSubmitting} size="large" className="px-8 py-2 text-base font-semibold">
                  Save
                </Button>
                <Button danger onClick={() => onEditChange(false)} size="large" className="px-8 py-2 text-base font-semibold profile-action-cancel">
                  Cancel
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ProfileInfoForm;

