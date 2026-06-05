const allFieldRequired = (fields) => {
    // Check if the input is a valid object
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
        return false;
    }


    // Check each field for required values
    for (const key in fields) {
        // Skip internal/system fields
        if (key.startsWith('_')) continue;

        const value = fields[key];

        // Check if field is empty, null, undefined, or whitespace
        if (
            value === undefined ||
            value === null ||
            String(value).trim() === ""
        ) {
         console.log(`Missing required field: ${key}`, value);
            return {
                success: false,
                field: key
            };
        }
    }

    return {
        success: true
    };
};

module.exports = allFieldRequired;