import InputForm from "./InputForm"

const Window = () => {
  return (
    <main className="flex flex-col h-full">
          <ul className="flex-1 overflow-y-auto p-4 bg-gray-100">Message</ul>
          <InputForm />
    </main>
  )
}

export default Window
