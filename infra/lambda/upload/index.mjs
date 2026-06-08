import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3 = new S3Client({});
const BUCKET = process.env.PHOTOS_BUCKET;
const PRESIGNED_URL_TTL = 300; // seconds

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Content-Type": "application/json",
};

const reply = (statusCode, body) => ({
  statusCode,
  headers: CORS_HEADERS,
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  // API GatewayのCognito AuthorizerがJWTを検証済み。claimsを信頼して使う。
  const claims = event.requestContext?.authorizer?.claims;
  if (!claims?.sub) return reply(401, { message: "Unauthorized" });

  const userId = claims.sub;

  let filename, contentType;
  try {
    ({ filename, contentType } = JSON.parse(event.body ?? "{}"));
  } catch {
    return reply(400, { message: "Invalid JSON body" });
  }

  if (!filename || !contentType) {
    return reply(400, { message: "filename and contentType are required" });
  }

  // ユーザーごとにフォルダを分けて保存
  const key = `${userId}/${randomUUID()}_${filename}`;

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: PRESIGNED_URL_TTL });

    return reply(200, { uploadUrl });
  } catch (err) {
    console.error("Failed to generate presigned URL", err);
    return reply(500, { message: "Internal server error" });
  }
};
