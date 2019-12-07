const fs = require('fs');
const fsExtra = require('fs-extra');
const yargs = require('yargs');

const argv = yargs
  .option('defaultRegion', {
    alias: 'r',
    describe: 'provide a path to input file',
  })
  .option('credentialsFile', {
    alias: 'c',
    describe: 'credentials file'
  })
  .option('output', {
    alias: 'o',
    describe: 'output file'
  }).option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .help()
  .argv

const tempCreds = JSON.parse(fs.readFileSync(argv.credentialsFile, 'utf8'));

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
  const regionsResponse = await getEc2Client(argv.defaultRegion).describeRegions().promise();

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

  const mergeBase = fs.existsSync(argv.output) ? JSON.parse(fs.readFileSync(argv.output)) : {};
  console.log("Base map: ");
  console.log(mergeBase);

  const mergedMap = { ...mergeBase, ...regionToAZmap };
  fsExtra.outputFileSync(argv.output, JSON.stringify(mergedMap, null, 2));
};

callApisSync();
