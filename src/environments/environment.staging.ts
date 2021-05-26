
const serverUrl = 'https://narsunprojects.com:5000';
const clientUrl = 'https://reconnect-stagging.web.app';
export const environment = {
    production: true,
    apiUrl: `${serverUrl}/api`,
    serverUrl: `${serverUrl}`,
    clientUrl: `${clientUrl}`,
    s3BucketName: 'reconnect-staging-s3',
    s3Bucket: {
        accessKeyId: 'AKIAYFXOPQIA7O6AHXFJ',
        secretAccessKey: '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',
        region: 'us-east-2'
    }
};
