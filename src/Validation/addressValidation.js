import * as yup from "yup";

export function schemaFunc(countrydata) {
  return yup
    .object({
      address: yup.string(),
      state: yup.string(),
      city: yup.string(),
      country: yup.mixed().oneOf(countrydata, "Please select correct value"),
      pincode: yup.number().typeError("Must be a number"),
    })
    .required();
}
