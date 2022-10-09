module.exports = {
    content: ["./resources/**/*.{html,edge,js}"],
    theme: {
        extend: {
            keyframes: {
                life: {
                    "0%": { width: "100%" },
                    "100%": { width: "0%" },
                },
            },
            animation: {
                life: "life 4750ms linear forwards",
            },
        },
    },
    plugins: [],
}