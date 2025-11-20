import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between py-4">
      <h2 className="pl-10 text-2xl font-bold">SkillConnect</h2>
      <div className="mr-10 gap-5 flex font-bold">
        <Link href="/login" className="cursor-pointer">Login</Link>
        <button className="bg-[#E46A5D] text-white px-3 rounded-sm cursor-pointer">Sign Up</button>
      </div>
    </header>
  );
}

export default Header;
