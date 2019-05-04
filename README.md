# NodeJsServer

Generic NodeJS server using Sequelize, SQLite, and Express

## DB Configuration

1. Specify the DB Configurations

    - This repo is designed to work with SQLite, which is why there are multiple DBs, the reduce the effect of DB locks.
    - Create a config file: 'server/\_shared/config.js'. This file should include your various configurations which can be formatted however you like. The only constraints are:

        - Sequelize DB configs are obtained from here by 'server/\_db/index.js' calling 'config.getDbConfigs()'. The expected return is a list of database configurations.
        - Example file:

            ```js
            const path = require("path");

            function generateDbConfigs() {
                let dbPrefix = ${process.env.ENVIRONMENT};
                return [
                    {
                        // *** The first db in this list is the 'default db' for models ***
                        // Content db
                        database: `${dbPrefix}-content`,
                        username: "username",
                        password: "password",
                        options: {
                            dialect: "sqlite",
                            host: "localhost",
                            storage: path.resolve(
                                __dirname,
                                `../_db/dbs/${dbPrefix}-content.sqlite`
                            ),
                        },
                    },
                    {
                        // User db
                        database: `${dbPrefix}-users`,
                        username: "username",
                        password: "password",
                        options: {
                            dialect: "sqlite",
                            host: "localhost",
                            storage: path.resolve(
                                __dirname,
                                `../_db/dbs/${dbPrefix}-users.sqlite`
                            ),
                        },
                    },
                ];
            }

            module.exports = {
                getDbConfigs() {
                    return generateDbConfigs();
                },
            };
            ```

2. Creating DB Models

    - All models should be created in the 'server/\_db/models' folder.
    - Models can be nested in folders, however, the model importer function will not search more than 3 folders deep.
    - Models will be associated with the DB that matches its parent folder's name, if there is no match, it will be added to the default DB (the first DB in the above list that's returned).
        - The DB matcher uses the following code:
            ```js
            let potentialDbName = `${process.env.ENVIRONMENT}-${path.basename(dir)}`;
            ```
        - Examples:
            - 'server/\_db/models/Model1.js' will be included in the "\${process.env.ENVIRONMENT}-content" db (the default db above)
            - 'server/\_db/models/other/Model2.js' will be included in the "\${process.env.ENVIRONMENT}-content" db (the default db above)
            - 'server/\_db/models/users/Model4.js' will be included in the "\${process.env.ENVIRONMENT}-users" db
            - 'server/\_db/models/users/other/Model3.js' will be included in the "\${process.env.ENVIRONMENT}-content" db (the default db above)
    - Any associations for a model should be defined in a function called "createAssociations":

        ```js
        // Where Model1 is the entity this function exists in and Model2 is the target entity
        Model1.createAssocations = function(models) {
        	Model1.belongsTo(models["Model2"]);
        };

        Profile.belongsToMany(models["User"], {
        	through: models["UserProfile"],
        });
        ```

3. Running the Server
    - The default commands are "npm run prod" and "npm run dev". These differentiate the DBs used and the logging levels:
        - "prod": "node ./main.js --environment=prod --loglevel=info" - "dev": "node ./main.js --environment=dev --loglevel=trace"
