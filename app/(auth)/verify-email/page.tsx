export default function VerifyEmail() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-2">
        <h1 className="text-2xl font-semibold">Check your inbox</h1>
        <p className="text-muted-foreground">
          We sent a confirmation link to your email. Click it to finish setting up your account.
        </p>
        <a className="underline" href="/login">Back to login</a>
      </div>
    </div>
  );
}
