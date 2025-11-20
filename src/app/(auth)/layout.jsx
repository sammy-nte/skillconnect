import "../globals.css";

function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden flex items-center justify-between bg-linear-to-br from-[#e3e5e6] from-40% to-[#e46b5d9e] p-3">
        <main className="w-[45%] h-screen flex flex-col justify-between overflow-y-auto p-3">
        <h1 className="border border-gray-600 w-fit px-4 py-2 rounded-full">SkillConnect</h1>
          {children}
        <p></p>
        </main>
        <div className="w-[50%] h-full rounded-2xl bg-gray-600">
          <video
            className="w-full h-full object-cover rounded-2xl"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/login_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </body>
    </html>
  );
}

export default AuthLayout;
