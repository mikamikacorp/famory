import os
import json
import uuid
import boto3
from botocore.exceptions import ClientError

s3 = boto3.client("s3")
BUCKET = os.environ["PHOTOS_BUCKET"]
PRESIGNED_URL_TTL = 300  # seconds

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Content-Type": "application/json",
}


def reply(status_code, body):
    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(body),
    }


def lambda_handler(event, context):
    # API GatewayのCognito AuthorizerがJWTを検証済み。claimsを信頼して使う。
    claims = ((event.get("requestContext") or {}).get("authorizer") or {}).get("claims") or {}
    if not claims.get("sub"):
        return reply(401, {"message": "Unauthorized"})

    user_id = claims["sub"]

    try:
        body = json.loads(event.get("body") or "{}")
        filename = body.get("filename")
        content_type = body.get("contentType")
    except (json.JSONDecodeError, ValueError):
        return reply(400, {"message": "Invalid JSON body"})

    if not filename or not content_type:
        return reply(400, {"message": "filename and contentType are required"})

    # ユーザーごとにフォルダを分けて保存
    key = f"{user_id}/{uuid.uuid4()}_{filename}"

    try:
        upload_url = s3.generate_presigned_url(
            "put_object",
            Params={"Bucket": BUCKET, "Key": key, "ContentType": content_type},
            ExpiresIn=PRESIGNED_URL_TTL,
        )
        return reply(200, {"uploadUrl": upload_url})
    except ClientError as e:
        print(f"Failed to generate presigned URL: {e}")
        return reply(500, {"message": "Internal server error"})
