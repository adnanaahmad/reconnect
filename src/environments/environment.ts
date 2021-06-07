const serverUrl = 'https://narsunprojects.com:5000';
//const  serverUrl = 'http://192.168.0.25:5000';
const clientUrl = 'https://reconnect-stagging.web.app';

export const environment = {
  production: false,
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
