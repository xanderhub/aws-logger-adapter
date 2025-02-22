import {Logger} from '@aws-lambda-powertools/logger';
import path from "node:path";
import * as fs from "fs";
import {LogAttributes} from "@aws-lambda-powertools/logger/lib/cjs/types/logKeys";

if(!process.env.AWS_LAMBDA_RUNTIME_API) {
    process.env.POWERTOOLS_DEV = "true";
}

let config: { excludedKeys?: string[], globalAttributes?: LogAttributes } = {};

try {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, 'logger.config.json'), 'utf-8'));
} catch (error) {
    console.warn('logger.config.json file not found, using default configuration for logger');
}

const excludedKeys: Set<string> = new Set(config.excludedKeys || []);
const globalAttributes: LogAttributes = config.globalAttributes || {};


const defaultLogger: Logger = new Logger({
    jsonReplacerFn: (key, value) => excludedKeys.has(key) ? undefined : value,
    persistentKeys: globalAttributes
});

export function getLogger(attributes?: LogAttributes): Logger {
    return attributes ? new Logger({
        jsonReplacerFn: (key, value) => excludedKeys.has(key) ? undefined : value,
        persistentKeys: {...globalAttributes, ...attributes}
    }) : defaultLogger;
}
