import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button,
  MenuItem,
  FormHelperText,
  Container,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { schema } from "../../Validation/personalValidation.js";
import {
  setFromStep,
  setPersonalDetails,
} from "../../Redux/Redux-reducers/stateReducer.js";
import { useEffect, useRef } from "react";

export default function PersonalDetailsForm() {
  const disaptch = useDispatch();
  const inputRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onSubmit = (data) => {
    disaptch(setPersonalDetails(data));
    disaptch(setFromStep(1));
  };

  return (
    <Container autoComplete="off">
      <h1>Step : 1 Personal Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <TextField
              inputRef={inputRef}
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
          <Grid item xs={12} md={4} sm={12}>
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
          <Grid item xs={12} md={2} sm={12}>
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

          <Grid item xs={12} md={6} sm={12}>
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
          <Grid item xs={12} md={2} sm={12}>
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
          <Grid item xs={12} md={4} sm={12}>
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
