export const CreateOrderValidation = (orderData) => {
    let errors = {};

    if (!orderData.order_date) {
        errors.order_date = "Order date is required";
        errors.hasErrors = true;
    }
    else {
        const currentDate = new Date();
        const selectedDate = new Date(orderData.order_date);
        if (isNaN(selectedDate.getTime()) || selectedDate <= currentDate) {
            errors.order_date = "Order date must be a valid future date";
            errors.hasErrors = true;
        }
    }

    if (!orderData.service_id) {
        errors.service_id = "Service ID is required";
        errors.hasErrors = true;
    }

    if (!orderData.payment_method) {
        errors.payment_method = "Payment method is required";
        errors.hasErrors = true;
    }

    if (!orderData.additional_notes) {
        errors.additional_notes = "Additional_notes is required";
        errors.hasErrors = true;
    }
    return errors;
};


export const UpdateOrderValidation = (orderData) => {
    let errors = {};
    if (!orderData.order_date) {
        errors.order_date = "Order date is required";
        errors.hasErrors = true;
    }
    else {
        const currentDate = new Date();
        const selectedDate = new Date(orderData.order_date);
        if (isNaN(selectedDate.getTime()) || selectedDate <= currentDate) {
            errors.order_date = "Order date must be a valid future date";
            errors.hasErrors = true;
        }
    }

    if (!orderData.additional_notes) {
        errors.additional_notes = "Additional_notes is required";
        errors.hasErrors = true;
    }
    return errors;
};
