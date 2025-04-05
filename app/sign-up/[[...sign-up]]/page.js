import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto my-10">
      <div className="mb-8">
        <Link href="/blog" className="btn btn-ghost">
          ← 블로그로 돌아가기
        </Link>
      </div>

      <div className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300">
        <h1 className="text-2xl font-bold mb-6 text-center">계정 생성</h1>
        <p className="text-center mb-6 text-gray-500">
          참고: 관리자 권한은 지정된 이메일 주소만 가질 수 있습니다.
        </p>
        <div className="flex justify-center">
          <SignUp
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
