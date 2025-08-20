import Link from "next/link";

interface AuthLinksProps {
  showSignUp?: boolean;
  showHome?: boolean;
}

export default function AuthLinks({
  showSignUp = true,
  showHome = true,
}: AuthLinksProps) {
  return (
    <div className="space-y-4 mt-2">
      {showSignUp ? (
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary-600 hover:underline">
            Sign up
          </Link>
        </p>
      ) : (
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-600 hover:underline">
            Sign In
          </Link>
        </p>
      )}

      {showHome && (
        <p className="text-center text-gray-600">
          <Link href="/" className="text-primary-600 hover:underline">
            ← Back to home
          </Link>
        </p>
      )}
    </div>
  );
}
