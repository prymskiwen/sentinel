import React from "react";
import styled from "styled-components/macro";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Box,
  Button,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const VerificationCodeForm = ({ code, email, setCode, setStep }) => {
  const { forgotPassword } = useAuth();

  const handleResend = () => {
    forgotPassword(email);
  };

  return (
    <>
      <Typography component="h2" variant="body1" align="center">
        Enter your OTP code here
      </Typography>
      <Formik
        initialValues={{
          code: code,
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().required("Verification code is required"),
        })}
        onSubmit={(values) => {
          setCode(values.code);
          setStep(1);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="text"
              name="code"
              label="Verification code"
              value={values.code}
              error={Boolean(touched.code && errors.code)}
              fullWidth
              helperText={touched.code && errors.code}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Link href="#" onClick={handleResend} my={3}>
              Resend
            </Link>
            <Box pt={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Next
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default VerificationCodeForm;
