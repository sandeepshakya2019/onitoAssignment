const initialFormState = {
  fromStep: 0,
  personalDetails: {},
  addressDetails: {},
  finalDetails: {},
};

export const fromDetailsReduer = (state = initialFormState, action) => {
  switch (action.type) {
    case "action/personaldetails":
      return { ...state, personalDetails: action.payload };

    case "action/formstep":
      return { ...state, fromStep: action.payload };

    case "action/addressdetails":
      return { ...state, addressDetails: action.payload };

    case "action/finalDetails":
      return {
        ...state,
        finalDetails: { ...state.personalDetails, ...action.payload },
      };

    default:
      return state;
  }
};

export const setFromStep = (data) => {
  return { type: "action/formstep", payload: data };
};

export const setPersonalDetails = (data) => {
  return { type: "action/personaldetails", payload: data };
};

export const setAddressDetails = (data) => {
  return { type: "action/addressdetails", payload: data };
};

export const setFinalDetails = (data) => {
  return { type: "action/finalDetails", payload: data };
};
