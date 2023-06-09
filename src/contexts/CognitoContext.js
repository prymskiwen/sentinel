import { createContext, useCallback, useEffect, useReducer } from "react";

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

import axios from "../utils/axios";
import { cognitoConfig } from "../config";

const INITIALIZE = "INITIALIZE";
const SIGN_OUT = "SIGN_OUT";

const UserPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId || "",
  ClientId: cognitoConfig.clientId || "",
});

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === INITIALIZE) {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }
  if (action.type === SIGN_OUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserAttributes = useCallback(
    (currentUser) =>
      new Promise((resolve, reject) => {
        currentUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
          } else {
            const results = {};

            attributes?.forEach((attribute) => {
              results[attribute.Name] = attribute.Value;
            });
            resolve(results);
          }
        });
      }),
    []
  );

  const getSession = useCallback(
    () =>
      new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser();

        if (user) {
          user.getSession(async (err, session) => {
            if (err) {
              reject(err);
            } else {
              const attributes = await getUserAttributes(user);
              const token = session?.getIdToken().getJwtToken();

              if (!session.isValid()) {
                this.signOut();
                // const refreshTokenValue = await getRefreshToken();

                // if (refreshTokenValue) await refreshToken(refreshTokenValue);
                // axios.defaults.headers.common.Authorization =
                //   "Bearer " + refreshTokenValue;
              } else
                axios.defaults.headers.common.Authorization = "Bearer " + token;

              dispatch({
                type: INITIALIZE,
                payload: { isAuthenticated: true, user: attributes },
              });

              resolve({
                user,
                session,
                headers: { Authorization: token },
              });
            }
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [getUserAttributes]
  );

  const initialize = useCallback(async () => {
    try {
      await getSession();
    } catch {
      dispatch({
        type: INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [getSession]);

  useEffect(() => {
    initialize();
    const interval = setInterval(() => {
      initialize();
    }, 10000);
    return () => clearInterval(interval);
  }, [initialize]);

  const signIn = useCallback(
    (email, password) =>
      new Promise((resolve, reject) => {
        const user = new CognitoUser({
          Username: email,
          Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        user.authenticateUser(authDetails, {
          onSuccess: async (data) => {
            await getSession();
            resolve(data);
          },
          onFailure: (err) => {
            reject(err);
          },
          newPasswordRequired: function (userAttributes) {
            delete userAttributes.email_verified;
            userAttributes["name"] = userAttributes.email;
            user.completeNewPasswordChallenge(password, userAttributes, this);
          },
        });
      }),
    [getSession]
  );

  const signOut = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      dispatch({ type: SIGN_OUT });
    }
  };

  const signUp = (email, password, firstName, lastName) =>
    new Promise((resolve, reject) => {
      UserPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: "email", Value: email }),
          new CognitoUserAttribute({
            Name: "name",
            Value: `${firstName} ${lastName}`,
          }),
        ],
        [],
        async (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(undefined);
          // Set destination URL here
          window.location.href = "/sales";
        }
      );
    });

  const forgotPassword = (email) =>
    new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.forgotPassword({
        onSuccess: (result) => {
          resolve();
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });

  const resetPassword = (email, verificationCode, newPassword) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    return new Promise((resolve, reject) => {
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          resolve();
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "cognito",
        user: {
          displayName: state?.user?.name || "Undefined",
          role: "user",
          ...state.user,
        },
        initialize,
        signIn,
        signUp,
        signOut,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
