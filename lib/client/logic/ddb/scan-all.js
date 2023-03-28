export default async function scanAll() {
  const AWS = require('aws-sdk');
  AWS.config.update({ region: 'ap-northeast-1' });

  const ddb = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: 'washify-data',
  }
  const items = []

  const scan = async () => {
    const result = await ddb.scan(params).promise()
    items.push(...result.Items)

    // 1MB以上データが有った場合の処置
    if (result.LastEvaluatedKey) {
      params.ExclusiveStartKey = result.LastEvaluatedKey
      await scan()
    }
  }

  try {
    await scan()
    return items
  } catch (err) {
    console.error(`[Error]: ${JSON.stringify(err)}`)
    return err
  }
}

