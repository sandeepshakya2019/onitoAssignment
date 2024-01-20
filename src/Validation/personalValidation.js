import * as yup from "yup";

export const schema = yup
  .object({
    name: yup.string().min(3).required(),
    age: yup.number().positive().typeError("Age must be a number").required(),
    sex: yup.mixed().oneOf(["male", "female"]),
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
