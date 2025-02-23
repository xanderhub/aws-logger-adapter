# AWS Logger Adapter

Adapter for `@aws-lambda-powertools/logger` with external configuration option and logger instance provider.
How to use `@aws-lambda-powertools/logger` read here: https://www.npmjs.com/package/@aws-lambda-powertools/logger

## Installation

To install the package, use npm:

```sh
npm install aws-logger-adapter
```

## Usage

### Importing the Logger

You can import the logger instance using the `getLogger` function:

```typescript
import { getLogger } from "aws-logger-adapter";

const logger = getLogger();  // gets the instance of `@aws-lambda-powertools/logger` 
logger.info("This is an info message");  
```
You can provide optional attributes to include in the logger:

```typescript

const logger = getLogger({"key": "value"});  
 
```

These attributes will be included in every log message of this logger instance.
If no attributes provided, the single logger instance is reused across all modules.

### Configuration

Create a `logger.config.json` file in the root of your project to configure the logger. Example:

The logger can be configured using a `logger.config.json` file. Create the file and place it in the root directory of your project. To completely exclude a key from the log output, set the value to `null` in maskedKeys object. To override a key's value in the log, set it to the desired value in maskedKeys object.

```json
{
  "prettyPrint": false,
  "maskedKeys": {
    "sampling_rate": null,
    "service": null,
    "user": "*** hidden by logger ***",
    "password": "*** hidden by logger ***",
    "long_list_of_objects": "*** omitted by logger ***",
    "big_json_object": "*** omitted by logger ***"
  },
  "globalAttributes": {
    "project": "my-project",
    "foo": "bar"
  }
}

```

You can enable pretty format of json logs when working locally by setting `"prettyPrint": true` (it's not recomended to use pretty format in real environment) 


## Dependencies

- `@aws-lambda-powertools/logger`: ^2.14.0

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

Alex Ivanov - alex.ivn@outlook.com
