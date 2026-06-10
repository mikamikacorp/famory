import os
import re
import json
import boto3
from urllib.parse import unquote
from botocore.exceptions import ClientError

rekognition = boto3.client("rekognition")
BUCKET = os.environ["PHOTOS_BUCKET"]
COLLECTION_PREFIX = "famory-"


def lambda_handler(event, context):
    for record in event["Records"]:
        key = unquote(record["s3"]["object"]["key"].replace("+", " "))
        user_id = key.split("/")[0]
        collection_id = f"{COLLECTION_PREFIX}{user_id}"

        # コレクションが存在しない場合のみ作成
        try:
            rekognition.create_collection(CollectionId=collection_id)
            print(f"Created collection: {collection_id}")
        except ClientError as e:
            if e.response["Error"]["Code"] != "ResourceAlreadyExistsException":
                raise

        # アップロードされた画像から顔をインデックス化
        try:
            external_image_id = re.sub(r"[^a-zA-Z0-9_.\-:]", "_", key)[:255]
            result = rekognition.index_faces(
                CollectionId=collection_id,
                Image={"S3Object": {"Bucket": BUCKET, "Name": key}},
                ExternalImageId=external_image_id,
                DetectionAttributes=[],
            )
            count = len(result.get("FaceRecords", []))
            print(f"Indexed {count} face(s) from {key}")
        except ClientError as e:
            # 顔が検出できない画像はスキップ（処理続行）
            print(f"IndexFaces failed for {key}: {e}")
