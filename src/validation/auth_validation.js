const { checkSchema } = require("express-validator");
const { checkEmailIfExists, checkifUsernameIsExist, checkIfUserIDExists } = require('./../common/index');
const creatUserValidator = checkSchema({
    username: {
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMessage: 'Username must be between 3 and 32 characters'
        },
        matches: {
            // Regular expression to allow only alphanumeric characters (no spaces or special characters)
            options: /^[a-zA-Z0-9]+$/,
            errorMessage: 'Username can only contain letters and numbers, with no spaces or special characters'
        },
        custom: {
            options: async value => {
                const checkifUsernameIsExists = await checkifUsernameIsExist(value);
                if (checkifUsernameIsExists._id) throw new Error("Username not available!");
            }
        },
        errorMessage: 'Username is required'
    },
    fullname: {
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMessage: 'Name must be between 3 and 32 characters'
        },
        errorMessage: 'Name is required'
    },
    email: {
        isEmail: true,
        errorMessage: 'Invalid email address',
        custom: {
            options: async value => {
                const ifEmailExists = await checkEmailIfExists(value);
                if (ifEmailExists._id) throw new Error("email already registered!");
            }
        }
    },
    tel: {
        isString: true,
        errorMessage: 'Phone Number must be provided!',
        custom: {
            options: async value => {
                const nineDigitRegex = /^\d{9}$/; // Regular expression for 9-digit phone number

                const tenDigitRegex = /^\d{10}$/; // Regular expression for 10-digit phone number
                if (nineDigitRegex.test(value) || tenDigitRegex.test(value)) {
                    return true;
                } {
                    throw new Error("Invalid phone number format");
                }
            }
        }
    },
    roles: {
        custom: {
            options: async value => {
                if (!typeof value === 'array') throw new Error("Role must be a array");
                if (value.length < 1) throw new Error("At least one role is required!");
            }
        }
    },
    password: {
        isLength: {
            options: {
                max: 30,
                min: 6
            },
            errorMessage: "Password length must be 20 characters maximum and 3 characters minimum."
        }
    },
    confirmedPassword: {
        isLength: {
            options: {
                max: 30,
                min: 6
            },
            errorMessage: "Password length must be 20 characters maximum and 3 characters minimum."
        },
        custom: {
            options: async (value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("Password mismatched!")
                }
            }
        }
    }
});
const userLoginValidator = checkSchema({
    email: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isEmail: {
            errorMessage: 'Invalid email address',
        },
        custom: {
            options: async (value) => {
                if (value) {
                    const ifEmailExists = await checkEmailIfExists(value);
                    if (!ifEmailExists) {
                        throw new Error("Email not registered!");
                    }
                }
            }
        }
    },
    username: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        custom: {
            options: async (value) => {
                if (value) {
                    const checkifUsernameIsExists = await checkifUsernameIsExist(value);
                    if (!checkifUsernameIsExists) {
                        throw new Error("Username not registered!");
                    }
                }
            }
        }
    },
    password: {
        isLength: {
            options: {
                max: 30,
                min: 6
            },
            errorMessage: "Password length must be between 6 and 30 characters."
        }
    }
});
const IdValidator = checkSchema({
    id: {
        isLength: {
            options: {
                max: 24,
                min: 24
            },
            errorMessage: "invalid user id!"
        }
    },
})
const passwordValidator = checkSchema({
        password: {
            isLength: {
                options :{
                    max : 100,
                    min : 6
                },
                errorMessage: "Your password is required!"
            }
        }
})
const userUpdateSelfProfile = checkSchema({
    email: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isEmail: {
            errorMessage: 'Invalid email address',
        },
        custom: {
            options: async (value) => {
                if (value) {
                    const ifEmailExists = await checkEmailIfExists(value);
                    if (ifEmailExists && ifEmailExists.email !== value) {
                        throw new Error("email is already in used!");
                    }
                }
            }
        }
    },
    username: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        custom: {
            options: async (value) => {
                if (value) {
                    const checkifUsernameIsExists = await checkifUsernameIsExist(value);
                    if (checkifUsernameIsExists && checkifUsernameIsExists.username !== value) {
                        throw new Error("username is already used!");
                    }
                }
            }
        }
    },
    fullname: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMessage: 'Name must be between 3 and 32 characters'
        },
        errorMessage: 'Name is required'
    },
    tel: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isString: true,
        errorMessage: 'Phone Number must be provided!',
        custom: {
            options: async value => {
                const nineDigitRegex = /^\d{9}$/; // Regular expression for 9-digit phone number
                const tenDigitRegex = /^\d{10}$/; // Regular expression for 10-digit phone number
                if (nineDigitRegex.test(value) || tenDigitRegex.test(value)) {
                    return true;
                } {
                    throw new Error("Invalid phone number format");
                }
            }
        }
    },
    roles: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        custom: {
            options: async value => {
                if (!typeof value === 'array') throw new Error("Role must be a array");
                if (value.length < 1) throw new Error("At least one role is required!");
            }
        }
    },
    password: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isLength: {
            options: {
                max: 30,
                min: 6
            },
            errorMessage: "Password length must be 20 characters maximum and 3 characters minimum."
        }
    },
    confirmedPassword: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isLength: {
            options: {
                max: 30,
                min: 6
            },
            errorMessage: "Password length must be 20 characters maximum and 3 characters minimum."
        },
        custom: {
            options: async (value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("Password mismatched!")
                }
            }
        }
    }

})
const updateUserDataValidation = checkSchema({
    id: {
        isLength: {
            options: {
                max: 24,
                min: 24
            },
            errorMessage: "invalid user id!"
        },
        custom: {
            options: async (value) => {
                if (value) {
                    const ifUserExists = await checkIfUserIDExists(value);
                    if (!ifUserExists) {
                        throw new Error("user doesn't exist!")
                    }
                }
            }
        }
    },
    email: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isEmail: {
            errorMessage: 'Invalid email address',
        },
        custom: {
            options: async (value) => {
                if (value) {
                    const ifEmailExists = await checkEmailIfExists(value);
                    if (ifEmailExists && ifEmailExists.email !== value) {
                        throw new Error("email is already in used!");
                    }
                }
            }
        }
    },
    username: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        custom: {
            options: async (value) => {
                if (value) {
                    const checkifUsernameIsExists = await checkifUsernameIsExist(value);
                    if (checkifUsernameIsExists && checkifUsernameIsExists.username !== value) {
                        throw new Error("username is already used!");
                    }
                }
            }
        }
    },
    fullname: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMessage: 'Name must be between 3 and 32 characters'
        },
        errorMessage: 'Name is required'
    },
    tel: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isString: true,
        errorMessage: 'Phone Number must be provided!',
        custom: {
            options: async value => {
                const nineDigitRegex = /^\d{9}$/; // Regular expression for 9-digit phone number
                const tenDigitRegex = /^\d{10}$/; // Regular expression for 10-digit phone number
                if (nineDigitRegex.test(value) || tenDigitRegex.test(value)) {
                    return true;
                } {
                    throw new Error("Invalid phone number format");
                }
            }
        }
    },
    roles: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        custom: {
            options: async value => {
                if (!typeof value === 'array') throw new Error("Role must be a array");
                if (value.length < 1) throw new Error("At least one role is required!");
            }
        }
    },
    password: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isLength: {
            options: {
                max: 30,
                min: 6
            },
            errorMessage: "Password length must be 20 characters maximum and 3 characters minimum."
        }
    },
    confirmedPassword: {
        optional: {
            options: { checkFalsy: true } // Allow empty strings but still validate if provided
        },
        isLength: {
            options: {
                max: 30,
                min: 6
            },
            errorMessage: "Password length must be 20 characters maximum and 3 characters minimum."
        },
        custom: {
            options: async (value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("Password mismatched!")
                }
            }
        }
    }

})

module.exports = { creatUserValidator, userLoginValidator, IdValidator, passwordValidator, userUpdateSelfProfile, updateUserDataValidation }