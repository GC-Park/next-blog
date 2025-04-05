import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto my-10">
      <div className="mb-8">
        <Link href="/blog" className="btn btn-ghost">
          ← 블로그로 돌아가기
        </Link>
      </div>

      <div className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300">
        <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none border-none",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
