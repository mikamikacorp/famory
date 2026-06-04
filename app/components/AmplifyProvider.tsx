"use client";

import { Amplify } from "aws-amplify";
import { I18n } from "aws-amplify/utils";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID ?? "",
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID ?? "",
    },
  },
});

I18n.putVocabulariesForLanguage("ja", {
  // サインイン画面
  "Sign in to your account": "アカウントにサインイン",
  "Sign In": "サインイン",
  "Sign in": "サインイン",
  "Signing in": "サインイン中...",
  "Username": "メールアドレス",
  "Enter your username": "メールアドレスを入力",
  "Please enter your username first": "メールアドレスを入力してください",
  "Email": "メールアドレス",
  "Email Address": "メールアドレス",
  "Enter your Email": "メールアドレスを入力",
  "Enter your email": "メールアドレスを入力",
  "Password": "パスワード",
  "Enter your Password": "パスワードを入力",
  "Enter your password": "パスワードを入力",
  "Forgot Password?": "パスワードをお忘れですか？",
  "Forgot your password?": "パスワードをお忘れですか？",
  "Reset Password": "パスワードをリセット",
  "or": "または",

  // アカウント作成
  "Create Account": "アカウントを作成",
  "Create a new account": "新しいアカウントを作成",
  "Creating Account": "アカウント作成中...",
  "Confirm Password": "パスワードを確認",
  "Please confirm your Password": "パスワードをもう一度入力してください",
  "Have an account? ": "アカウントをお持ちの方は ",
  "Back to Sign In": "サインインに戻る",

  // メール確認
  "Confirm Sign Up": "メール確認",
  "Confirmation Code": "確認コード",
  "Enter your Confirmation Code": "確認コードを入力",
  "Enter your code": "確認コードを入力",
  "Confirm": "確認",
  "Confirming": "確認中...",
  "Resend Code": "コードを再送する",
  "We Emailed You": "確認メールを送信しました",
  "Your code is on the way. To log in, enter the code we emailed to":
    "確認コードを送信しました。次のアドレスに届いたコードを入力してください：",
  "It may take a minute to arrive": "届くまで少し時間がかかる場合があります",

  // パスワードリセット
  "Send code": "コードを送信",
  "Sending": "送信中...",
  "Submit": "送信",
  "Submitting": "送信中...",
  "New password": "新しいパスワード",
  "Reset your Password": "パスワードをリセット",
  "Reset your password": "パスワードをリセット",
  "Your code is on the way. To log in, enter the code we sent you":
    "確認コードを送信しました。届いたコードを入力してください",
  "Code": "確認コード",

  // パスワード強度・バリデーション
  "Password must have at least 8 characters":
    "パスワードは8文字以上にしてください",
  "Password must have upper case letters": "大文字を含めてください",
  "Password must have lower case letters": "小文字を含めてください",
  "Password must have numbers": "数字を含めてください",
  "Password must have special characters": "記号を含めてください",
  "Your passwords must match": "パスワードが一致しません",

  // Cognito エラー
  "Incorrect username or password.":
    "メールアドレスまたはパスワードが正しくありません。",
  "User does not exist.": "このメールアドレスは登録されていません。",
  "User already exists": "このメールアドレスはすでに登録されています。",
  "An account with the given email already exists.":
    "このメールアドレスはすでに登録されています。",
  "Invalid verification code provided, please try again.":
    "確認コードが正しくありません。もう一度お試しください。",
  "Invalid code provided, please request a code again.":
    "確認コードが無効です。コードを再送してください。",
  "Attempt limit exceeded, please try after some time.":
    "試行回数の上限を超えました。しばらく時間をおいてからお試しください。",
  "Password attempts exceeded":
    "パスワードの試行回数が上限を超えました。しばらく時間をおいてからお試しください。",
  "Username cannot be empty": "メールアドレスを入力してください。",
  "Custom auth lambda trigger is not configured for the user pool.":
    "認証設定にエラーがあります。管理者にお問い合わせください。",
  "User is not confirmed.": "メールアドレスの確認が完了していません。",
  "Confirmation code cannot be empty": "確認コードを入力してください。",
  "Cannot reset password for the user as there is no registered/verified email or phone_number":
    "パスワードをリセットできません。登録済みのメールアドレスがありません。",
  "Network error": "ネットワークエラーが発生しました。接続を確認してください。",
  "Password did not conform with policy: Password not long enough":
    "パスワードは8文字以上にしてください。",
  "Password did not conform with policy: Password must have uppercase characters":
    "パスワードに大文字を含めてください。",
  "Password did not conform with policy: Password must have lowercase characters":
    "パスワードに小文字を含めてください。",
  "Password did not conform with policy: Password must have numeric characters":
    "パスワードに数字を含めてください。",
  "Password did not conform with policy: Password must have symbol characters":
    "パスワードに記号を含めてください。",

  // その他
  "Loading": "読み込み中...",
  "Verify": "確認",
  "Skip": "スキップ",
  "Show password": "パスワードを表示",
  "Hide password": "パスワードを非表示",
  "Account recovery requires verified contact information":
    "アカウント復旧には確認済みの連絡先情報が必要です",
  "Verify Contact": "連絡先を確認",
});

I18n.setLanguage("ja");

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
