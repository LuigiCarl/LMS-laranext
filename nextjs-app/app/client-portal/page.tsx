import LibrarySystem from "@/components/libraryui/library-system"
import { AuthProvider } from "@/components/libraryui/auth-context"

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <AuthProvider>
        <LibrarySystem />
      </AuthProvider>
    </main>
  )
}
