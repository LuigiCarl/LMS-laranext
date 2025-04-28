export default function Background() {
    return (
      <div className="fixed inset-0 -z-10 h-full w-full">
        {/* Light mode background */}
        <div className="absolute inset-0 bg-white dark:hidden 
          bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
          bg-[size:6rem_4rem]">
          <div className="absolute inset-0 
            bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]" 
          />
        </div>
  
        {/* Dark mode background */}
        <div className="absolute inset-0 hidden dark:block bg-neutral-900">
          <div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]" />
        </div>
      </div>
    );
  }
  