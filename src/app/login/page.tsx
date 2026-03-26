'use client';

import { Suspense } from 'react';
import { Authenticator } from "@aws-amplify/ui-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { MainLayout } from "@/components/templates/MainLayout";

function LoginContent() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (authStatus === 'authenticated') {
      const redirectPath = searchParams.get('redirect') || '/';
      router.push(redirectPath);
    }
  }, [authStatus, router, searchParams]);

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">ログイン</h1>
            <p className="text-slate-400 text-sm">アプリの全機能を利用するにはログインしてください</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <Authenticator 
              formFields={{
                signIn: {
                  username: {
                    label: "Email",
                    placeholder: "メールアドレスを入力"
                  }
                },
                signUp: {
                  email: {
                    label: "Email",
                    placeholder: "メールアドレスを入力",
                    isRequired: true
                  }
                }
              }}
            />
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => router.push('/')}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
            >
              トップページに戻る
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">ログインページを読み込み中...</div>}>
      <LoginContent />
    </Suspense>
  );
}
