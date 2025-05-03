export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      {/* Light mode background with updated grid effect */}
      <div className="absolute inset-0 bg-white dark:hidden
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
        bg-[size:14px_24px]">
      </div>

      {/* Dark mode background with grid effect */}
      <div className="absolute inset-0 hidden dark:block bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 
          bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] 
          bg-[size:14px_24px]">
        </div>
      </div>
    </div>
  );
}