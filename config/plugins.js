module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID', 'AKIAQ6QIJJ5NKLV2KEEX'),
        secretAccessKey: env('AWS_ACCESS_SECRET', '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'),
        region: env('AWS_REGION', 'eu-central-1'),
        params: {
          ACL: 'public-read',
          Bucket: env('AWS_BUCKET', 'strapi-aws-s3-images-bucket-v1')
        }
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {}
      }
    }
  }
});
