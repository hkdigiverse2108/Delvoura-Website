import { Button, Typography, message } from "antd";
import { Form as FormikForm, Formik } from "formik";
import { Mutations } from "../../Api";
import { CommonPasswordInput } from "../../Attribute";
import { useAppSelector } from "../../Store/Hooks";
import { ChangePasswordSchema } from "../../Utils/ValidationSchemas";

const { Title, Text } = Typography;

const ChangePasswordForm = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { mutate: changePassword, isPending } = Mutations.useChangePassword(token || undefined);
  const emptyValues = { currentPassword: "", newPassword: "", confirmPassword: "" };

  const handleSubmit = async ( values: { currentPassword: string; newPassword: string; confirmPassword: string }, { resetForm }: { resetForm: (next?: { values: { currentPassword: string; newPassword: string; confirmPassword: string } }) => void } ) => {
    changePassword(
      { oldPassword: values.currentPassword, newPassword: values.newPassword },
      {
        onSuccess: () => {
          message.success("Password updated successfully");
          resetForm({ values: emptyValues });
        },
        onError: (err: unknown) => {
          const errorMessage = err instanceof Error ? err.message : "Update failed";
          message.error(errorMessage);
        },
      }
    );
  };

  return (
    <div className="w-full pt-5 ">
      <div className="mb-4">
        <Title level={5} className="!mb-1">
          Change Password
        </Title>
        <Text className="text-sm text-[color:var(--color-text-muted)]">
          Use a strong password with letters, numbers, and symbols.
        </Text>
      </div>

      <div className="rounded-[15px] border border-[color:var(--color-border)] bg-white p-6">
        <Formik  initialValues={emptyValues}  validationSchema={ChangePasswordSchema}  onSubmit={handleSubmit} >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <FormikForm className="delvoura-contact-content max-w-md" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-3">
                <CommonPasswordInput name="currentPassword" label="Current Password" placeholder="Enter current password" value={values.currentPassword} onChange={handleChange} onBlur={handleBlur} error={typeof errors.currentPassword === "string" ? errors.currentPassword : undefined} touched={!!touched.currentPassword} />
                <CommonPasswordInput name="newPassword" label="New Password" placeholder="Enter new password" value={values.newPassword} onChange={handleChange} onBlur={handleBlur} error={typeof errors.newPassword === "string" ? errors.newPassword : undefined} touched={!!touched.newPassword} />
                <CommonPasswordInput name="confirmPassword" label="Confirm Password" placeholder="Re-enter new password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} error={typeof errors.confirmPassword === "string" ? errors.confirmPassword : undefined} touched={!!touched.confirmPassword} />
              </div> <br />

              <Button type="primary" htmlType="submit" loading={isPending || isSubmitting} size="large" className="mt-4 px-8 py-2 text-base font-semibold">
                Update Password
              </Button>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
