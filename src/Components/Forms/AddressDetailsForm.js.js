import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  TextField,
  Autocomplete,
  Button,
  FormHelperText,
  Container,
  Grid,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { schemaFunc } from "../../Validation/addressValidation";
import { useDispatch } from "react-redux";
import {
  setAddressDetails,
  setFinalDetails,
  setFromStep,
} from "../../Redux/Redux-reducers/stateReducer";

export default function AddressDetailsForm() {
  const disaptch = useDispatch();
  const inputRef = useRef();

  const [countrydata, setCountrydata] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaFunc(countrydata)),
  });

  const getAllCountry = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.map((d, index) => {
          arr.push(d.name.common);
        });
        setCountrydata(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    disaptch(setAddressDetails(data));
    disaptch(setFinalDetails(data));
    disaptch(setFromStep(0));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    getAllCountry();
  }, []);

  return (
    <Container>
      <h1>Step : 2 Address Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} s={12}>
            <TextField
              inputRef={inputRef}
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
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    disableClearable
                    options={countrydata}
                    fullWidth
                    {...register("country")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        {...field}
                        error={Boolean(errors?.country)}
                      />
                    )}
                  />
                )}
              />

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
