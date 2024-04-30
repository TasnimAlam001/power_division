module.exports = {
    apps: [
        {
            name: 'power-next',
            script: 'npm',
            args: 'run start',
            env: {
                NODE_ENV: 'production',
                PORT: 2154
                // Add other environment variables as needed
            },
        },
    ],
};
