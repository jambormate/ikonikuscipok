import { useEffect, useState } from "react"
import type { Cipo } from "./type/types"

function App() {
  const [shoes, setShoes] = useState<Cipo[]>([])
  const [name, setName] = useState<string>("")
  const [size, setSize] = useState<number>()
  const [stock, setStock] = useState<boolean>(false)
  const [release, setRelease] = useState<Date>(new Date())
  useEffect(() => {
    async function fetchCipos() {
      try {
        const response = await fetch("http://localhost:3000/cipok")
        const data: Cipo[] = await response.json()
        setShoes(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCipos()
  }, [])

  async function UjCipello(e) {
    e.preventDefault()
    const newShoeee = {
      name,
      size,
      stock,
      release: release?.toISOString().split("T")[0]
    }
    try {
      const response = await fetch("http://localhost:3000/cipok", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(newShoeee)
      })
      if (!response.ok) {
        throw new Error("Hiba az adatok mentése közben");
      }
      const cipo = await response.json() as Cipo;
      setShoes((elozo) => [...elozo, cipo]);
    }
    catch (error) {
      console.log(error)
    } finally {
      setName("");
      setSize(0);
      setStock(false);
      let AAAAA = new Date();
      setRelease(AAAAA);
    }
  }


  return (
    <main className="container py-5">
        <header className="mb-4">
          <h1 className="display-6 fw-bold mb-1">Cipők</h1>
        </header>
        <section className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-white border-0 px-4 pt-4">
            <h2 className="h4 mb-0">Cipő lista</h2>
          </div>
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Név</th>
                    <th scope="col">Méret</th>
                    <th scope="col">Raktáron</th>
                    <th scope="col">Megjelenés dátuma</th>
                  </tr>
                </thead>
                <tbody>
                  {shoes.map(shoe => (
                    <tr key={shoe.id}>
                      <td className="fw-medium">{shoe.nev}</td>
                      <td>{shoe.meret}</td>
                      <td>
                        <span className={`badge ${shoe.raktaron ? "text-bg-success" : "text-bg-secondary"}`}>
                          {shoe.raktaron ? "Igen" : "Nem"}
                        </span>
                      </td>
                      <td>{shoe.megjelenes.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="card shadow-sm border-0">
          <div className="card-header bg-white border-0 px-4 pt-4">
            <h2 className="h4 mb-0">Új cipő felvétele</h2>
          </div>
          <div className="card-body p-4">
            <form onSubmit={UjCipello} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Cipő neve</label>
                <input id="name" className="form-control" type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              <div className="col-md-6">
                <label htmlFor="meret" className="form-label">Méret</label>
                <input id="meret" type="number" name="meret" className="form-control" value={size} onChange={(e) => setSize(e.target.valueAsNumber)} />
              </div>
              <div className="col-md-6">
                <label htmlFor="megjelenes" className="form-label">Kiadás napja</label>
                <input id="megjelenes" type="date" name="megjelenes" className="form-control" onChange={(e) => setRelease(e.target.valueAsDate != null ? e.target.valueAsDate : release)} />
              </div>
              <div className="col-md-6 d-flex align-items-end">
                <div className="form-check mb-2">
                  <input id="limited" className="form-check-input" type="checkbox" name="limited" onChange={() => setStock(now => !now)} />
                  <label htmlFor="limited" className="form-check-label">Raktáron</label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary px-4">Felvétel</button>
              </div>
            </form>
          </div>
        </section>
    </main>
  )
}

export default App
