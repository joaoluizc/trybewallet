// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

type ActionType = {
  type: string;
  payload: {
    email: string;
  }
};

const user = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case ('SET_USER'):
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return {
        ...state,
      };
  }
};

export default user;
