export const ServiceValidation = (service) => {
    let errors = {};

    if (!service.service_name) {
        errors.service_name = "Service name is required";
        errors.hasErrors = true;
    }
    else if (!/^[A-Za-z\s]+$/.test(service.service_name)) {
        errors.service_name = "Only letters and spaces are allowed";
        errors.hasErrors = true;
    }
    if (!service.category_id) {
        errors.category_id = "Category is required";
        errors.hasErrors = true;
    }
    if (!service.description) {
        errors.description = "Description is required";
        errors.hasErrors = true;
    }
    else if (service.description.length < 1 || service.description.length > 1000) {
        errors.description = "Description must be between 1 and 1000 characters";
        errors.hasErrors = true;
    }
    if (!service.price) {
        errors.price = "Price is required";
        errors.hasErrors = true;
    }
    else if (service.price < 0) {
        errors.price = "Price should be a positive integer";
        errors.hasErrors = true;
    }
    if (!service.start_time) {
        errors.start_time = "Start time is required";
        errors.hasErrors = true;
    }
    if (!service.end_time) {
        errors.end_time = "End time is required";
        errors.hasErrors = true;
    }

    return errors;
};
