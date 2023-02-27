const s3 = require("../config").getS3();

exports.imageUpload = async (userId, base64) => {
  const base64Data = new Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64.split(";")[0].split("/")[1];
  const params = {
    Bucket: "mmmclone.test2.s3",
    Key: `rollingpaper/userImage/${userId}.png`,
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/png`,
  };
  let location = "";
  let key = "";
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    console.log(error);
  }
  return location;
};

exports.copyBase = async (gradientId, paperId) => {
  const params = {
    Bucket: "mmmclone.test2.s3",
    CopySource: `mmmclone.test2.s3/rollingpaper/baseImage/${gradientId}.png`,
    Key: `rollingpaper/userImage/${paperId}.png`,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/png`,
  };
  let location = "";
  let key = "";
  try {
    const { Location, Key } = await s3.copyObject(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    console.log(error);
  }
  return location;
};
