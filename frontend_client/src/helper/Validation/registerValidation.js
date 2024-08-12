export const RegisterValidation = (userInfo) => {
    let errors = {};

    // First Name
    if (!userInfo.first_name) {
        errors.first_name = "First name is required";
        errors.hasErrors = true;
    } 
    else if (!/^[A-Za-z\s]+$/.test(userInfo.first_name)) {
        errors.first_name = "Only letters and spaces are allowed";
        errors.hasErrors = true;
    }

    // Last Name
    if (!userInfo.last_name) {
        errors.last_name = "Last name is required";
        errors.hasErrors = true;
    } 
    else if (!/^[A-Za-z\s]+$/.test(userInfo.last_name)) {
        errors.last_name = "Only letters and spaces are allowed";
        errors.hasErrors = true;
    }

    // Email
    if (!userInfo.email) {
        errors.email = "Email is required";
        errors.hasErrors = true;
    } 
    else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
        errors.email = "Email is invalid";
        errors.hasErrors = true;
    }

    // Phone
    if (!userInfo.phone) {
        errors.phone = "Phone number is required";
        errors.hasErrors = true;
    } 
    else if (!/^\d+$/.test(userInfo.phone)) {
        errors.phone = "Only digits are allowed";
        errors.hasErrors = true;
    } else if (userInfo.phone.length < 11 || userInfo.phone.length > 15) {
        errors.phone = "Only 11 and 15 digits long";
        errors.hasErrors = true;
    }

    // Password
    // Password must be a mixture of numbers and characters and at least 8 characters long
    if (!userInfo.password) {
        errors.password = "Password is required";
        errors.hasErrors = true;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(userInfo.password)) {
        errors.password = "Password is invalid";
        errors.hasErrors = true;
    }

    // Re-entered Password
    if (!userInfo.repassword) {
        errors.repassword = "Re-password is required";
        errors.hasErrors = true;
    } else if (userInfo.password !== userInfo.repassword) {
        errors.repassword = "Re-password does not match";
        errors.hasErrors = true;
    }

    // Gender
    if (!userInfo.gender) {
        errors.gender = "Gender is required";
        errors.hasErrors = true;
    } else if (!["male", "female", "other"].includes(userInfo.gender)) {
        errors.gender = "Invalid gender";
        errors.hasErrors = true;
    }

    return errors;
};
