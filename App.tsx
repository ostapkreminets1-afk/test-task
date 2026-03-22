import './App.css'
import { MainMatrixForm } from './pages/matrix/matrix-form/components/main-matrix-form'
import { MatrixProvider } from './pages/matrix/common/context/matrix-context'
import { MainMatrixTable } from './pages/matrix/matrix-table/components/main-matrix-table'

function App() {
  return (
    <MatrixProvider>
      <MainMatrixForm />
      <MainMatrixTable />
    </MatrixProvider>
  )
}

export default App
