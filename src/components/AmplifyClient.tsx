'use client';

import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import outputs from '../../amplify_outputs.json';
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

I18n.putVocabularies({
  ja: {
    'User does not exist': 'ユーザーが存在しません。',
    'Incorrect username or password': 'メールアドレスまたはパスワードが正しくありません。',
    'Password attempts exceeded': 'パスワードの試行回数が上限を超えました。しばらくしてから再試行してください。',
    'Invalid password format': 'パスワードの形式が正しくありません。',
    'User is not confirmed.': 'ユーザーが確認されていません。',
    'User already exists': 'ユーザーは既に存在します。',
    'Invalid verification code': '認証コードが正しくありません。',
    'Code mismatch': '認証コードが一致しません。',
    'Limit exceeded': '回数制限を超えました。',
    'Attempt limit exceeded, please try after some time.': '試行制限を超えました。しばらくしてから再試行してください。',
    'Username cannot be empty': 'メールアドレスを入力してください。',
    'Sign In': 'サインイン',
    'Create Account': 'アカウント作成',
    'Email': 'メールアドレス',
    'Password': 'パスワード',
    'Confirm Password': 'パスワード（確認）',
    'Forgot your password?': 'パスワードをお忘れですか？',
    'Sign in': 'サインイン',
    'Send code': 'コード送信',
    'Confirm': '確認',
    'Verifying': '認証中',
    'Signing in': 'サインイン中',
    'Creating': '作成中',
  }
});
I18n.setLanguage('ja');

export default function AmplifyClient({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator.Provider>
      {children}
    </Authenticator.Provider>
  );
}
