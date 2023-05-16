import axios from 'axios'
import { useEffect, useState } from 'react';

export const CepForm = () => {

    const [estado, setEstados] = useState([]);
    const [endereco, setEnderecos] = useState({})

    const buscarEstados = () => {
        ('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(function (response) {
                // handle success

                let arrayEstados = response.data.map((estado, index) => (
                    <option key={index} value={estado.sigla}>
                        {estado.nome}
                    </option>));

                setEstados(arrayEstados);

            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
    };

    const buscarPorCep = (e) => {
        let cep = e.target.value
        axios.get(`viacep.com.br/ws/${cep}/json/`)
            .then(function (response) {
                console.log(response.data)
                setEnderecos({...setEnderecos, [e.target.id]: e.target.value})
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    useEffect(() => {
        buscarEstados()
    }, [])

    return (
        <div className='container'>
            <h1>Buscar CEP</h1>
            <hr />

            <form className="row g-3">
                <div className="col-md-3">
                    <label htmlFor="cep" className="form-label">CEP</label>
                    <input type="text" className="form-control" id="cep" onBlur={buscarPorCep} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="endereco" className="form-label">Endereço</label>
                    <input type="text" className="form-control" id="endereco" />
                </div>
                <div className="col-12">
                    <label htmlFor="complemento" className="form-label">Complemento</label>
                    <input type="text" className="form-control" id="complemento" placeholder="Casa, Apt, Comercial..." />
                </div>
                <div className="col-12">
                    <label htmlFor="bairro" className="form-label">Bairro</label>
                    <input type="text" className="form-control" id="bairro" placeholder="Bairro" />
                </div>
                <div className="col-md-4">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select id="estado" className="form-select">
                        <option selected>Selecione...</option>
                        {estado}
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <select id="cidade" className="form-select">
                        <option selected>Selecione...</option>
                        <option>...</option>
                    </select>
                </div>
                <div className="col-12">
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>

    )
}