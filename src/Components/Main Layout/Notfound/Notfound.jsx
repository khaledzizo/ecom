import React from 'react'

import notFound from '../../../assets/images/NotFound/error.svg'

export default function Notfound() {
  return <>
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <img src={notFound} alt="" />
  </div>
  </>
}
