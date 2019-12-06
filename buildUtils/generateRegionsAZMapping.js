const tempCreds = require('./tempCreds.json');
const fs = require('fs');

// TODO: Support other AWS partitions

const getEc2Client = (region) => {
  const AWS = require('aws-sdk');

  AWS.config.region = region;
  const creds = new AWS.Credentials(tempCreds.credentials.accessKeyId, tempCreds.credentials.secretAccessKey, tempCreds.credentials.sessionToken);
  AWS.config.credentials = creds;
  const ec2 = new AWS.EC2();
  return ec2;
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const regionToAZmap = {};

const callApisSync = async () => {
  const regionsResponse = await getEc2Client("us-east-1").describeRegions().promise();

  console.log(regionsResponse);

  await asyncForEach(regionsResponse.Regions, async (region) => {
    const regionName = region.RegionName;
    console.log(`Querying: ${regionName}`)
    const azData = await getEc2Client(regionName).describeAvailabilityZones().promise();
    regionToAZmap[regionName] = [];
    azData.AvailabilityZones.forEach((az) => {
      regionToAZmap[regionName].push(az.ZoneName)
    });
  });

  console.log(regionToAZmap);
  fs.writeFileSync('./src/AZMap.json', JSON.stringify(regionToAZmap, null, 2));
};

callApisSync();
