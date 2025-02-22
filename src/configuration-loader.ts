import path from "node:path";
import * as fs from "fs";
import { Configuration } from "./types/configuration";

let config: Configuration = {};

try {
    config = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'logger.config.json'), 'utf-8'));
} catch (error) {
    console.warn('logger.config.json file not found, using default configuration for @aws-lambda-powertools/logger\n' +
        'Searched in: ' + path.resolve(process.cwd()));
}

if(!process.env.AWS_LAMBDA_RUNTIME_API && config.prettyPrint) {
    process.env.POWERTOOLS_DEV = "true";
}

export { config };
