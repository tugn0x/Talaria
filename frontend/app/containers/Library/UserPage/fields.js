export const fields = {
    user_id: {
        type: "number",
        required: true,
        name: "user_id",
        width: "col-md-6"
    },
    status: {
        type: "select",
        name: "status",
        placeholder: "status",
        width: "col-md-6",
        options: [
            { value: 0, name: 'pending' },
            { value: 1, name: 'success' },
        ]
    },
    
}