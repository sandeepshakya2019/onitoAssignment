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

export default function AddressDetailsForm({ setAddressdeatils, setPart }) {
  const schema = yup
    .object({
      address: yup.string(),
      state: yup.string(),
      city: yup.string(),
      country: yup.string().required(),
      pincode: yup.number().typeError("Must be a number"),
    })
    .required();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // setAddressdeatils([data]);
    setPart(1);
    // reset();
  };

  return (
    <Container>
      <h1>Step : 2 Address Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} s={12}>
            <TextField
              error={Boolean(errors?.address)}
              type="text"
              variant="outlined"
              color="secondary"
              label="Address"
              fullWidth
              helperText={errors?.address?.message}
              {...register("address")}
            />
          </Grid>

          <Grid item xs={12} md={3} s={12}>
            <TextField
              error={Boolean(errors?.state)}
              type="text"
              variant="outlined"
              color="secondary"
              label="State"
              fullWidth
              helperText={errors?.state?.message}
              {...register("state")}
            />
          </Grid>

          <Grid item xs={12} md={3} s={12}>
            <TextField
              error={Boolean(errors?.city)}
              type="text"
              variant="outlined"
              color="secondary"
              label="City"
              fullWidth
              helperText={errors?.city?.message}
              {...register("city")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="country" error={errors?.sex}>
                Country
              </InputLabel>

              <Select
                labelId="country"
                label="Country"
                error={Boolean(errors?.country)}
                fullWidth
                {...register("country")}
                defaultValue=""
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {errors?.country ? (
                <FormHelperText style={{ color: "red" }}>
                  {errors?.country?.message}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Pincode"
              fullWidth
              error={Boolean(errors?.pincode)}
              helperText={errors?.pincode?.message}
              {...register("pincode")}
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
