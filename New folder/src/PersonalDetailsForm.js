import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormControl,
  TextField,
  Stack,
  InputLabel,
  Select,
  Button,
  MenuItem,
  FormHelperText,
  Container,
  Grid,
} from "@mui/material";
import { useState } from "react";
import AddressDetailsForm from "./AddressDetailsForm.js";

export default function PersonalDetailsForm({ setPersonalDetails, setPart }) {
  const [isAddress, setIsAddress] = useState(false);
  const schema = yup
    .object({
      name: yup.string().min(3).required(),
      age: yup.number().positive().typeError("Age must be a number").required(),
      sex: yup.mixed().oneOf(["male", "female"]),
      // dob: yup.string().required(),
      mobile: yup
        .number()
        .positive()
        .integer()
        .typeError("Mobile Must be nubmer")
        .test(
          "len",
          "Mobile number must be of 10 digit",
          (val) => val.toString().length === 10
        )
        .required(),
      // mobile: yup.string().length(10),
      idtype: yup.mixed().oneOf(["aadhar", "pancard"]),
      id: yup
        .string()
        .typeError("You must specify a number")
        .when("idtype", {
          is: "aadhar",
          then: (s) =>
            s
              .test(
                "len",
                "Aadhar must be of 12 digit length",
                (val) => val.toString().length === 12
              )
              .test(
                "firstChar",
                "First Char should not be 0 or 1",
                (val) =>
                  Number(val.toString()[0]) !== 0 &&
                  Number(val.toString()[0]) !== 1
              ),
          otherwise: (s) =>
            s.test(
              "len",
              "Pancard must be of 10 Char long",
              (val) => val.toString().length === 10
            ),
        }),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // setPersonalDetails(data);
    setIsAddress(true);
    // reset();
  };
  if (isAddress) {
    return <AddressDetailsForm />;
  }
  return (
    <Container autoComplete="off">
      <h1>Step : 1 Personal Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              error={Boolean(errors?.name)}
              type="text"
              variant="outlined"
              color="secondary"
              label="Name"
              fullWidth
              helperText={errors?.name?.message}
              {...register("name")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="string"
              variant="outlined"
              color="secondary"
              label="Age"
              fullWidth
              error={Boolean(errors?.age)}
              helperText={errors?.age?.message}
              {...register("age")}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="sex" error={Boolean(errors?.sex)}>
                Sex
              </InputLabel>

              <Select
                labelId="sex"
                label="Sex"
                error={Boolean(errors?.sex)}
                fullWidth
                {...register("sex")}
                defaultValue=""
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {errors?.sex ? (
                <FormHelperText style={{ color: "red" }}>
                  {errors?.sex?.message}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Mobile Number"
              fullWidth
              error={Boolean(errors?.mobile)}
              helperText={errors?.mobile?.message}
              {...register("mobile")}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="idtype" error={Boolean(errors?.sex)}>
                Govt. Issued Id
              </InputLabel>

              <Select
                labelId="idtype"
                label="Govt. Issued Id"
                {...register("idtype")}
                error={Boolean(errors?.idtype)}
                defaultValue=""
              >
                <MenuItem value="aadhar">Aadhar</MenuItem>
                <MenuItem value="pancard">Pan Card</MenuItem>
              </Select>
              {errors?.idtype ? (
                <FormHelperText style={{ color: "red" }}>
                  {errors?.idtype?.message}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Enter Id"
              fullWidth
              error={Boolean(errors?.id)}
              helperText={errors?.id?.message}
              {...register("id")}
            />
          </Grid>
        </Grid>
        <Button variant="text" type="submit" sx={{ m: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
