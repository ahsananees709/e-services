export const CreateProfileValidation = (userInfo) => {
    let errors = {}

    // Validate bio
    if (!userInfo.bio) {
        errors.bio = "Bio is required"
        errors.hasErrors = true;
    }

    // Validate CNIC
    const cnicRegex = /^\d{5}-\d{7}-\d$/;
    if (!cnicRegex.test(userInfo.cnic)) {
        errors.cnic = "CNIC must be in '12345-1234567-1' format";
        errors.hasErrors = true;
    }

    // Validate street number
    if (!userInfo.street_no) {
        errors.street_no = "Street number is required";
        errors.hasErrors = true;
    }
    else if (userInfo.street_no < 0) {
        errors.street_no = "Street number should be a positive integer";
        errors.hasErrors = true;
    }

    // Validate city
    if (!userInfo.city) {
        errors.city = "City is required";
        errors.hasErrors = true;
    } else if (!/^[A-Za-z\s]+$/.test(userInfo.city)) {
        errors.city = "City must be a string of characters";
        errors.hasErrors = true;
    }

    // Validate state
    if (!userInfo.state) {
        errors.state = "State is required";
        errors.hasErrors = true;
    } else if (!/^[A-Za-z\s]+$/.test(userInfo.state)) {
        errors.state = "State must be a string of characters";
        errors.hasErrors = true;
    }

    // Validate postal code
    if (!userInfo.postal_code) {
        errors.postal_code = "Postal code is required";
        errors.hasErrors = true;
    } else if (!/^\d+$/.test(userInfo.postal_code)) {
        errors.postal_code = "Postal code must be a string of numbers";
        errors.hasErrors = true;
    }

    // Validate country
    if (!userInfo.country) {
        errors.country = "Country is required";
        errors.hasErrors = true;
    } else if (!/^[A-Za-z\s]+$/.test(userInfo.country)) {
        errors.country = "Country must be a string of characters";
        errors.hasErrors = true;
    }

    // Validate location (optional)
    if (userInfo.location && typeof userInfo.location !== 'string') {
        errors.location = "Location must be a string";
        errors.hasErrors = true;
    }

    return errors;
}
