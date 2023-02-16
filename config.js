const configJson = require("./config.json");
const AWS = require("aws-sdk");

class Config {
  constructor() {
    //set sql for session store
    //set atlas mongo database
    //set s3
    AWS.config.update(configJson.s3);
    this.s3 = new AWS.S3();
  }

  getS3() {
    return this.s3;
  }
  getDB() {
    return this.mongo;
  }
}

const config = new Config();

module.exports = config;
