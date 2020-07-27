let projectsInitialState = {
  authorised: false,
};

export default function (state = projectsInitialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        authorised: action.authorised,
      };

    default:
      return state;
  }
}
