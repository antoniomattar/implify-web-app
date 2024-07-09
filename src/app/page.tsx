export default function Home() {
  return (
    <section className="w-full h-screen py-20 md:py-32 bg-gradient-to-r from-[#7928CA] to-[#FF0080]">
      <div className=" align-middle px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
            Welcome to Implify&apos;s <br/> Admin Dashboard
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl font-medium">
            Manage your business with ease and efficiency.
          </p>
          <div className="mt-8">
            <a
              className="rounded-md bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              href="/login"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}