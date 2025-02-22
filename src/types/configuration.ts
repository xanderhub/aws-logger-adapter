import {LogAttributes} from "@aws-lambda-powertools/logger/lib/cjs/types/logKeys";

export type Configuration = {
    prettyPrint?: boolean,
    excludedKeys?: string[],
    globalAttributes?: LogAttributes
}
