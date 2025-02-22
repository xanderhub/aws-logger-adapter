import {Logger} from '@aws-lambda-powertools/logger';
import {LogAttributes} from "@aws-lambda-powertools/logger/lib/cjs/types/logKeys";
import {config} from "./configuration-loader";

const maskedKeys: LogAttributes = config.maskedKeys || {};
const globalAttributes: LogAttributes = config.globalAttributes || {};

const defaultLogger: Logger = new Logger({
    jsonReplacerFn: (key, value) => maskedKeys.hasOwnProperty(key) ? (maskedKeys[key] || undefined) : value,
    persistentKeys: globalAttributes
});

/**
 * Returns a Logger instance with optional attributes.
 *
 * @param {LogAttributes} [attributes] - Optional attributes to include in the logger.
 * These attributes will be included in every log message of this logger instance.
 * If no attributes provided, the single logger instance is reused across all modules.
 *
 * @returns {Logger} - A @aws-lambda-powertools/logger instance.
 *
 * The logger can be configured using a `logger.config.json` file. The configuration file should be placed in the root directory of your project.
 * To completely exclude a key from the log output, set the value to `null` in maskedKeys object.
 * To override a key's value in the log, set it to the desired value in maskedKeys object.
 *
 * Example `logger.config.json`:
 *
 * ```json
 * {
 *   "maskedKeys": {
 *     "timestamp": null,
 *     "password": "****",
 *     "token": "****"
 *   },
 *   "globalAttributes": {
 *     "service": "my-service",
 *     "environment": "production"
 *   }
 * }
 */

export function getLogger(attributes?: LogAttributes): Logger {
    return attributes ? new Logger({
        jsonReplacerFn: (key, value) => maskedKeys.hasOwnProperty(key) ? (maskedKeys[key] || undefined) : value,
        persistentKeys: {...globalAttributes, ...attributes}
    }) : defaultLogger;
}
