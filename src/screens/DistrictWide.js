import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
function DistrictWide() {
    const [district, setdistrict] = useState([])
    var dis = {}
    const getDistrictsWise = async () => {
        const data = await fetch('https://data.covid19india.org/csv/latest/district_wise.csv')
            .then(res => res.text())
        const val = Papa.parse(data, {
            header: true,
            delimiter: ',',
            newLine: '\n'
        }).data
        console.log(val)
        val.forEach(item => {
            if (dis[item["State"]] === undefined) {
                dis[item["State"]] = [item]
            } else {
                dis[item["State"]].push(item)
            }
        })
        setdistrict(dis)
        console.log(dis)
    }
    useEffect(() => {
        getDistrictsWise()
    }, [])
    return (
        <div className="container-fluid">
            <div className="accordion" id="accordion">
                {
                    Object.keys(district).map(key => (
                        <div className="accordion-item" key={key}>
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${key}`}>
                                    {key}
                                </button>
                            </h2>
                            <div id={`collapse${key}`} className="accordion-collapse collapse" data-bs-parent="#accordion">
                                <div className="accordion-body table-responsive-sm">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">District</th>
                                                <th scope="col">Confirmed</th>
                                                <th scope="col">Recovered</th>
                                                <th scope="col">Deceased</th>
                                                <th scope="col">Tested</th>
                                                <th scope="col">Other</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                district[key].map(item => (
                                                    <tr key={item.Confirmed}>
                                                        <th scope="row">{item.District}</th>
                                                        <td>{item.Confirmed}</td>
                                                        <td>{item.Recovered}</td>
                                                        <td>{item.Deceased}</td>
                                                        <td>{item.Tested}</td>
                                                        <td>{item.Other}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DistrictWide
