import InputForm from "./InputForm"

const Window = ({ query }) => {
  //get response from the api and send it back

  return (
    <main className="flex flex-col h-full">
          <ul className="flex-1 overflow-y-auto p-4 bg-gray-100">

          </ul>
          <InputForm />
    </main>
  )
}

export default Window
