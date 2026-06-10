import {
  RekognitionClient,
  CreateCollectionCommand,
  IndexFacesCommand,
} from "@aws-sdk/client-rekognition";

const rekognition = new RekognitionClient({});
const BUCKET = process.env.PHOTOS_BUCKET;
const COLLECTION_PREFIX = "famory-";

export const handler = async (event) => {
  for (const record of event.Records) {
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
    const userId = key.split("/")[0];
    const collectionId = `${COLLECTION_PREFIX}${userId}`;

    // コレクションが存在しない場合のみ作成
    try {
      await rekognition.send(new CreateCollectionCommand({ CollectionId: collectionId }));
      console.log(`Created collection: ${collectionId}`);
    } catch (err) {
      if (err.name !== "ResourceAlreadyExistsException") throw err;
    }

    // アップロードされた画像から顔をインデックス化
    try {
      const result = await rekognition.send(
        new IndexFacesCommand({
          CollectionId: collectionId,
          Image: { S3Object: { Bucket: BUCKET, Name: key } },
          ExternalImageId: key.replace(/[^a-zA-Z0-9_.\-:]/g, "_").slice(0, 255),
          DetectionAttributes: [],
        })
      );
      console.log(`Indexed ${result.FaceRecords?.length ?? 0} face(s) from ${key}`);
    } catch (err) {
      // 顔が検出できない画像はスキップ（処理続行）
      console.warn(`IndexFaces failed for ${key}:`, err.message);
    }
  }
};
