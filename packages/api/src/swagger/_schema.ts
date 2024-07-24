// THIS FILE IS AUTO-GENERATED BY swagger/generate.ts
export const _schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "CreateUserRequest": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            },
            "required": [
                "name",
                "password",
                "username"
            ]
        },
        "CreateUserResponse": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "name",
                "username"
            ]
        }
    }
};